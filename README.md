# MyRouteMap - Complete Travel Website

A comprehensive MERN stack travel website with modern features, CI/CD pipeline, and production-ready infrastructure.

**Created and Owned by: Ayush Kumar Rai**
- Email: ayush@myroutemap.com
- Website: https://myroutemap.com
- GitHub: @ayushkumarrai

## 🚀 Features

### Frontend Features
- **Modern React Application** with TypeScript
- **Responsive Design** with Tailwind CSS
- **Interactive Maps** with Leaflet integration
- **Tour Booking System** with date selection
- **User Authentication** and profile management
- **Admin Dashboard** for content management
- **Blog System** with rich content
- **Review and Rating System**
- **Real-time Notifications** with React Hot Toast
- **Smooth Animations** with Framer Motion

### Backend Features
- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** with role-based access
- **File Upload** with Cloudinary integration
- **Email Notifications** with Nodemailer
- **Rate Limiting** and security middleware
- **Comprehensive Error Handling**
- **API Documentation** with Swagger

### DevOps & Infrastructure
- **Docker Containerization** for all services
- **Kubernetes Deployment** with auto-scaling
- **CI/CD Pipeline** with Jenkins
- **Monitoring Stack** (Prometheus, Grafana, ELK)
- **Load Balancing** with Nginx
- **SSL/TLS Termination**
- **Database Backup** and recovery
- **Log Aggregation** and analysis

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Leaflet for maps
- Framer Motion for animations
- Axios for API calls
- React Hook Form for forms

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Nodemailer for emails
- Redis for caching

### DevOps
- Docker & Docker Compose
- Kubernetes
- Jenkins for CI/CD
- Prometheus & Grafana for monitoring
- ELK Stack for logging
- Nginx for load balancing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB (or use Docker)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushkumarrai/myroutemap.git
   cd myroutemap
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp server/.env.example server/.env
   
   # Update environment variables
   # Edit .env and server/.env with your configuration
   ```

4. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

5. **Or start manually**
   ```bash
   # Start backend
   cd server
   npm run dev
   
   # Start frontend (in another terminal)
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

### Production Deployment

1. **Build Docker images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f k8s/
   ```

3. **Monitor deployment**
   ```bash
   kubectl get pods -n myroutemap
   kubectl logs -f deployment/backend-deployment -n myroutemap
   ```

## 📁 Project Structure

```
myroutemap/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   ├── pages/                   # Page components
│   ├── contexts/                # React contexts
│   ├── hooks/                   # Custom hooks
│   └── utils/                   # Utility functions
├── server/                      # Backend source code
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── middleware/              # Express middleware
│   ├── controllers/             # Route controllers
│   └── utils/                   # Backend utilities
├── k8s/                         # Kubernetes manifests
├── monitoring/                  # Monitoring configuration
├── docker-compose.yml           # Development compose file
├── docker-compose.prod.yml      # Production compose file
├── Dockerfile                   # Frontend Dockerfile
├── Jenkinsfile                  # CI/CD pipeline
├── LICENSE                      # MIT License
├── COPYRIGHT                    # Copyright notice
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPBOX_TOKEN=your_mapbox_token
```

#### Backend (server/.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myroutemap
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🧪 Testing

### Frontend Tests
```bash
npm run test
npm run test:coverage
```

### Backend Tests
```bash
cd server
npm run test
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## 📊 Monitoring

### Prometheus Metrics
- Application metrics: http://localhost:9090
- Custom business metrics
- Infrastructure monitoring

### Grafana Dashboards
- Application dashboard: http://localhost:3001
- Infrastructure dashboard
- Business metrics dashboard

### Log Analysis
- Kibana: http://localhost:5601
- Centralized logging
- Error tracking and alerting

## 🔒 Security

### Implemented Security Measures
- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js security headers
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### Security Scanning
- Dependency vulnerability scanning
- Container image scanning with Trivy
- SAST with SemGrep
- Regular security audits

## 🚀 CI/CD Pipeline

### Jenkins Pipeline Stages
1. **Checkout** - Get source code
2. **Install Dependencies** - Frontend & Backend
3. **Code Quality** - Linting & SonarQube
4. **Testing** - Unit & Integration tests
5. **Security Scan** - Dependency & SAST scanning
6. **Build** - Create Docker images
7. **Container Security** - Image vulnerability scanning
8. **Deploy Staging** - Automated staging deployment
9. **Integration Tests** - End-to-end testing
10. **Deploy Production** - Manual approval required

### Deployment Strategies
- **Blue-Green Deployment** for zero-downtime
- **Rolling Updates** for gradual rollouts
- **Canary Releases** for risk mitigation
- **Automatic Rollback** on failure detection

## 📈 Performance

### Optimization Techniques
- **Code Splitting** with React.lazy
- **Image Optimization** with Cloudinary
- **Caching Strategy** with Redis
- **Database Indexing** for query optimization
- **CDN Integration** for static assets
- **Gzip Compression** for reduced payload
- **Lazy Loading** for images and components

### Performance Monitoring
- **Core Web Vitals** tracking
- **API Response Time** monitoring
- **Database Query** performance
- **Memory Usage** tracking
- **Error Rate** monitoring

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow conventional commit messages
- Ensure CI/CD pipeline passes

## 📄 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/updateMe` - Update user profile

### Tour Endpoints
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get tour by ID
- `POST /api/tours` - Create new tour (Admin)
- `PATCH /api/tours/:id` - Update tour (Admin)
- `DELETE /api/tours/:id` - Delete tour (Admin)

### Booking Endpoints
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   docker ps | grep mongo
   
   # Check connection string
   echo $MONGODB_URI
   ```

2. **Frontend Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Docker Issues**
   ```bash
   # Clean Docker system
   docker system prune -a
   
   # Rebuild containers
   docker-compose down
   docker-compose up --build
   ```

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: ayush@myroutemap.com
- Website: https://myroutemap.com

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- Docker team for containerization
- Kubernetes community for orchestration
- All open-source contributors

## 👨‍💻 About the Creator

**Ayush Kumar Rai** is a full-stack developer passionate about creating innovative travel solutions. MyRouteMap represents his vision of making travel planning and booking accessible to everyone.

Connect with Ayush:
- Email: ayush@myroutemap.com
- LinkedIn: https://linkedin.com/in/ayushkumarrai
- GitHub: https://github.com/ayushkumarrai

---

**MyRouteMap** - Discover Your Next Adventure! 🌍✈️

*Created with ❤️ by Ayush Kumar Rai*