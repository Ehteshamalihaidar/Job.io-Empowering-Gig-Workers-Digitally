# Job.io — Empowering Gig Workers Digitally

A lightweight job-tracking web application designed for gig and unorganized workers like carpenters, plumbers, painters, electricians, and other daily-wage or contract-based professionals. Job.io helps manage job applications, track work statuses, and maintain a simple professional profile—putting everything they need right in their hands, making their work life easier and more organized.

## Features

- 🔐 User registration and login with JWT authentication
- 📝 Create, update, and delete job applications
- 🔍 Search, filter, and sort jobs by status and type
- 👤 View and edit user profile
- 📊 Simple dashboard with statistics
- 🎯 Role-based access (worker/employer)

## Tech Stack

**Frontend:**
- React (create-react-app)
- Axios for HTTP requests
- Context API for state management

**Backend:**
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication

## Repository Structure

```
job.io/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API integration (api.js)
│   │   └── context/     # Auth context
│   └── package.json
│
├── server/              # Express backend
│   ├── routes/          # API route definitions
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose schemas
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Entry point
│   ├── db.js            # Database connection
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (16+ recommended)
- MongoDB (local installation or cloud instance like MongoDB Atlas)
- npm or yarn

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/job.io.git
cd job.io
```

**2. Install server dependencies**

```bash
cd server
npm install
```

**3. Install client dependencies**

```bash
cd ../client
npm install
```

**4. Configure environment variables**

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobio
JWT_SECRET=your_jwt_secret_key_here
JWT_LIFETIME=30d
NODE_ENV=development
```

**5. Start MongoDB**

Ensure MongoDB is running on your system or use a cloud MongoDB URI.

**6. Run the application**

Open two terminal windows:

**Terminal 1 - Server:**
```bash
cd server
npm start
```

**Terminal 2 - Client:**
```bash
cd client
npm start
```

The client will run on `http://localhost:3000` and the server on `http://localhost:5000`.

## API Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Jobs (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List user's jobs (supports query params: `search`, `status`, `jobType`, `sort`) |
| POST | `/api/jobs` | Create a new job |
| PATCH | `/api/jobs/:id` | Update a job |
| DELETE | `/api/jobs/:id` | Delete a job |
| PATCH | `/api/jobs/:id/status` | Update job status |

### User (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get current user profile |
| PATCH | `/api/users/profile` | Update user profile |

**Note:** Protected endpoints require the `Authorization: Bearer <token>` header.

## Data Models

### User
- `name` - User's full name
- `email` - User's email (unique)
- `password` - Hashed password
- `role` - Either `worker` or `employer`
- Profile fields: `gender`, `age`, `profession`, `experience`, `location`, `bio`

### Job
- `position` - Job title/position
- `company` - Company name
- `location` - Job location
- `status` - One of: `pending`, `interview`, `declined`
- `jobType` - One of: `full-time`, `part-time`, `contract`
- `createdBy` - Reference to User model

## Frontend Pages

- **Landing** - Home page with app introduction
- **Login** - User login page
- **Register** - New user registration
- **Dashboard** - Overview with statistics
- **AddJob** - Form to create new job
- **AllJobs** - List and manage all jobs
- **Profile** - View and edit user profile

## Authentication Flow

1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Server returns user object and JWT token
3. Frontend stores token in `localStorage`
4. Auth state is managed via `AuthContext`
5. Protected routes use `ProtectedRoute` component to verify authentication
6. API requests automatically include JWT via `api.js` interceptor

## Development Tips

- Keep MongoDB running during development
- If encountering CORS issues, ensure the server allows requests from `http://localhost:3000`
- Use Postman or similar tools to test API endpoints independently
- Check browser console and server logs for debugging

## Testing

**Frontend:**
```bash
cd client
npm test
```

**Backend:**
Add your own test files as needed using Jest or Mocha.

## Deployment

### Frontend
Build the production bundle:
```bash
cd client
npm run build
```

Deploy the `build` folder to:
- Netlify
- Vercel
- GitHub Pages
- Or serve from Express server

### Backend
Deploy to:
- Heroku
- Railway
- Azure
- Google Cloud Platform
- DigitalOcean

**Important:** Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) in your hosting platform.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please keep changes focused and include tests where appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions, suggestions, or issues, please open an issue in this repository.

---

**Built with ❤️ for gig workers everywhere**
