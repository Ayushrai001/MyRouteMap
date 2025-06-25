# Contributing to MyRouteMap

Thank you for your interest in contributing to MyRouteMap! This document provides guidelines for contributing to this travel booking platform.

## Project Owner

**Ayush Kumar Rai** - Creator and Owner of MyRouteMap
- Email: ayush@myroutemap.com
- GitHub: @ayushkumarrai

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

1. **Be Respectful**: Treat all contributors with respect and kindness
2. **Be Collaborative**: Work together to improve the platform
3. **Be Professional**: Maintain professional communication at all times
4. **Be Inclusive**: Welcome contributors from all backgrounds and skill levels

## How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/ayushkumarrai/myroutemap.git
cd myroutemap
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new functionality
- Update documentation as needed

### 4. Test Your Changes

```bash
# Frontend tests
npm test

# Backend tests
cd server && npm test

# Integration tests
npm run test:integration
```

### 5. Submit a Pull Request

1. Push your changes to your fork
2. Create a pull request with a clear description
3. Reference any related issues
4. Wait for review from the maintainers

## Development Guidelines

### Frontend (React/TypeScript)

- Use TypeScript for all new components
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement responsive design for all components
- Add proper error handling and loading states

### Backend (Node.js/Express)

- Follow RESTful API conventions
- Use proper HTTP status codes
- Implement comprehensive error handling
- Add input validation for all endpoints
- Write unit tests for all new functions

### Database (MongoDB)

- Use Mongoose for data modeling
- Implement proper indexing for performance
- Add data validation at the schema level
- Follow MongoDB best practices

### DevOps

- Update Docker configurations when needed
- Maintain Kubernetes manifests
- Update CI/CD pipeline configurations
- Add monitoring and logging for new features

## Coding Standards

### JavaScript/TypeScript

```typescript
// Use descriptive variable names
const userBookingData = await fetchUserBookings(userId);

// Add proper type annotations
interface TourBooking {
  id: string;
  userId: string;
  tourId: string;
  bookingDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Use async/await instead of promises
const createBooking = async (bookingData: TourBooking): Promise<Booking> => {
  try {
    const booking = await Booking.create(bookingData);
    return booking;
  } catch (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }
};
```

### CSS/Tailwind

```tsx
// Use semantic class names and proper spacing
<div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Details</h2>
  <p className="text-gray-600 leading-relaxed">Tour description...</p>
</div>
```

## Issue Reporting

When reporting issues, please include:

1. **Clear Description**: What happened and what you expected
2. **Steps to Reproduce**: Detailed steps to recreate the issue
3. **Environment**: Browser, OS, Node.js version, etc.
4. **Screenshots**: If applicable, add screenshots
5. **Error Messages**: Include any error messages or logs

## Feature Requests

For new features:

1. **Use Case**: Explain why this feature would be valuable
2. **Detailed Description**: Provide a clear description of the feature
3. **Mockups**: Include wireframes or mockups if possible
4. **Technical Considerations**: Any technical requirements or constraints

## Security

If you discover a security vulnerability, please:

1. **Do NOT** create a public issue
2. Email directly to: security@myroutemap.com
3. Include detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Recognition

Contributors will be recognized in the following ways:

- Listed in the project's contributors section
- Mentioned in release notes for significant contributions
- Invited to join the core contributor team for exceptional contributions

## Questions?

If you have questions about contributing, please:

1. Check the existing documentation
2. Search through existing issues
3. Contact the project owner: ayush@myroutemap.com

## License

By contributing to MyRouteMap, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to MyRouteMap!**

*Created and maintained by Ayush Kumar Rai*