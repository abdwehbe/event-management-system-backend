# Event Management System Backend
A simple Node.js backend for an Event Management System with JWT authentication and MySQL database.

## START

1. Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

2. Installation
### Clone and navigate to project
```
git clone <repository-url>
cd event-management-system-backend
```

### Install dependencies
`npm install`

3. Database Setup
```
-- Login to MySQL
mysql -u root -p

-- Create database and user
CREATE DATABASE event_management;
CREATE USER 'event_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON event_management.* TO 'event_user'@'localhost';
FLUSH PRIVILEGES;
USE event_management;

-- Create tables (copy from db.sql)
```

4. Configuration
```
Create .env file in root directory:

PORT=3000
DB_HOST=localhost
DB_USER=event_user
DB_PASSWORD=your_password
DB_NAME=event_management
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRES_IN=7d
```

5. Start the Server
```
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

Authentication
POST /api/auth/register - Register new user

POST /api/auth/login - Login user

Events (Require Authentication)
POST /api/events - Create event

GET /api/events - Get all user's events

GET /api/events/:id - Get single event

PUT /api/events/:id - Update event

DELETE /api/events/:id - Delete event



