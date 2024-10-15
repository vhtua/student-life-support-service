# Changelog

## [1.0.0] - 2024-10-09

### Added
- **Authentication & Authorization**: 
  - Implemented JWT-based authentication system with access and refresh tokens.
  - Role-based access control with dynamic role assignment (student, staff, admin).
  - Integrated Google reCAPTCHA for profile updates and password changes.

- **Real-Time Messaging**: 
  - WebSocket-based messaging system using Socket.IO for real-time communication.
  - Ability to join conversations, send messages, and receive real-time updates.

- **API Documentation**: 
  - Complete API documentation using Swagger UI, based on OpenAPI 3.0 specification.
  - Includes Message, Notification, Role, Log, Announcement, Feedback, and Report APIs.

- **User Management**:
  - CRUD functionality for user profiles.
  - Real-time updates and notifications for profile changes and new messages.

- **Database Integration**:
  - PostgreSQL for data persistence, handling user accounts, messages, tickets, etc.
  - Redis for session management and caching refresh tokens.

- **Security Enhancements**:
  - Google reCAPTCHA integrated for "Edit Profile" and "Change Password" to prevent automated attacks.
  - Secured endpoints using role-based permissions.

### Fixed
- **Performance**: 
  - Optimized API performance with Redis caching for reduced database load.
  - Improved the system’s response time during peak user activities.

- **Bug Fixes**: 
  - Resolved bugs related to message synchronization in real-time chats.
  - Fixed token expiration issues with JWT handling.

### Known Issues
- Scalability: Current system needs further improvements to handle large-scale simultaneous requests.
- Dynamic Role Management: Future work includes adding more granular role and permission management.
