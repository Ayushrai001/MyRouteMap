pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'myroutemap'
        DOCKER_CREDENTIALS = credentials('docker-registry-credentials')
        KUBECONFIG = credentials('kubernetes-config')
        SONAR_TOKEN = credentials('sonar-token')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    env.BUILD_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        sh 'npm ci'
                    }
                }
                stage('Backend Dependencies') {
                    steps {
                        dir('server') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }
        
        stage('Code Quality') {
            parallel {
                stage('Lint Frontend') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Lint Backend') {
                    steps {
                        dir('server') {
                            sh 'npm run lint'
                        }
                    }
                }
                stage('SonarQube Analysis') {
                    steps {
                        withSonarQubeEnv('SonarQube') {
                            sh '''
                                sonar-scanner \
                                -Dsonar.projectKey=myroutemap \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=$SONAR_HOST_URL \
                                -Dsonar.login=$SONAR_TOKEN
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        sh 'npm run test:ci'
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'test-results.xml'
                            publishCoverage adapters: [
                                istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')
                            ]
                        }
                    }
                }
                stage('Backend Tests') {
                    steps {
                        dir('server') {
                            sh 'npm run test:ci'
                        }
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'server/test-results.xml'
                        }
                    }
                }
            }
        }
        
        stage('Security Scan') {
            parallel {
                stage('Dependency Check') {
                    steps {
                        sh 'npm audit --audit-level moderate'
                        dir('server') {
                            sh 'npm audit --audit-level moderate'
                        }
                    }
                }
                stage('SAST Scan') {
                    steps {
                        sh 'semgrep --config=auto --json --output=sast-results.json .'
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'sast-results.json', allowEmptyArchive: true
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        sh 'npm run build'
                        archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
                    }
                }
                stage('Build Docker Images') {
                    steps {
                        script {
                            // Build frontend image
                            def frontendImage = docker.build(
                                "${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:${BUILD_TAG}",
                                "."
                            )
                            
                            // Build backend image
                            def backendImage = docker.build(
                                "${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:${BUILD_TAG}",
                                "./server"
                            )
                            
                            // Store images for later use
                            env.FRONTEND_IMAGE = frontendImage.id
                            env.BACKEND_IMAGE = backendImage.id
                        }
                    }
                }
            }
        }
        
        stage('Container Security Scan') {
            steps {
                script {
                    // Scan frontend image
                    sh "trivy image --format json --output frontend-scan.json ${env.FRONTEND_IMAGE}"
                    
                    // Scan backend image
                    sh "trivy image --format json --output backend-scan.json ${env.BACKEND_IMAGE}"
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: '*-scan.json', allowEmptyArchive: true
                }
            }
        }
        
        stage('Push Images') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-credentials') {
                        // Push frontend image
                        sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:${BUILD_TAG}"
                        sh "docker tag ${env.FRONTEND_IMAGE} ${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:latest"
                        sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:latest"
                        
                        // Push backend image
                        sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:${BUILD_TAG}"
                        sh "docker tag ${env.BACKEND_IMAGE} ${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:latest"
                        sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:latest"
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Update Kubernetes manifests with new image tags
                    sh """
                        sed -i 's|image: .*frontend:.*|image: ${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:${BUILD_TAG}|g\' k8s/staging/frontend-deployment.yaml
                        sed -i 's|image: .*backend:.*|image: ${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:${BUILD_TAG}|g\' k8s/staging/backend-deployment.yaml
                    """
                    
                    // Deploy to staging
                    sh 'kubectl apply -f k8s/staging/ --kubeconfig=$KUBECONFIG'
                    
                    // Wait for deployment to complete
                    sh 'kubectl rollout status deployment/frontend-staging --kubeconfig=$KUBECONFIG'
                    sh 'kubectl rollout status deployment/backend-staging --kubeconfig=$KUBECONFIG'
                }
            }
        }
        
        stage('Integration Tests') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Run integration tests against staging environment
                    sh 'npm run test:integration'
                }
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'integration-test-results.xml'
                }
            }
        }
        
        stage('Performance Tests') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Run performance tests
                    sh 'k6 run --out json=performance-results.json performance-tests/load-test.js'
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'performance-results.json', allowEmptyArchive: true
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Manual approval for production deployment
                    input message: 'Deploy to production?', ok: 'Deploy',
                          submitterParameter: 'DEPLOYER'
                    
                    // Update production manifests
                    sh """
                        sed -i 's|image: .*frontend:.*|image: ${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:${BUILD_TAG}|g\' k8s/production/frontend-deployment.yaml
                        sed -i 's|image: .*backend:.*|image: ${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:${BUILD_TAG}|g\' k8s/production/backend-deployment.yaml
                    """
                    
                    // Deploy to production with blue-green strategy
                    sh 'kubectl apply -f k8s/production/ --kubeconfig=$KUBECONFIG'
                    
                    // Wait for deployment
                    sh 'kubectl rollout status deployment/frontend-production --kubeconfig=$KUBECONFIG'
                    sh 'kubectl rollout status deployment/backend-production --kubeconfig=$KUBECONFIG'
                }
            }
        }
        
        stage('Post-Deploy Verification') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    // Health checks
                    sh 'curl -f http://staging.myroutemap.com/health || exit 1'
                    
                    if (env.BRANCH_NAME == 'main') {
                        sh 'curl -f http://myroutemap.com/health || exit 1'
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images
            sh 'docker system prune -f'
            
            // Archive logs
            archiveArtifacts artifacts: 'logs/**/*', allowEmptyArchive: true
        }
        
        success {
            // Notify team of successful deployment
            slackSend(
                channel: '#deployments',
                color: 'good',
                message: "✅ MyRouteMap ${env.BRANCH_NAME} deployment successful! Build: ${env.BUILD_TAG}"
            )
        }
        
        failure {
            // Notify team of failed deployment
            slackSend(
                channel: '#deployments',
                color: 'danger',
                message: "❌ MyRouteMap ${env.BRANCH_NAME} deployment failed! Build: ${env.BUILD_TAG}"
            )
        }
        
        unstable {
            // Notify team of unstable build
            slackSend(
                channel: '#deployments',
                color: 'warning',
                message: "⚠️ MyRouteMap ${env.BRANCH_NAME} deployment unstable! Build: ${env.BUILD_TAG}"
            )
        }
    }
}