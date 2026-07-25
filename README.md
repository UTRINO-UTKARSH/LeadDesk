# LeadDesk

A modern lead management application with a sleek admin dashboard for tracking, organizing, and managing customer leads. Built with React, Node.js, Express, and MongoDB.

## 📋 Features

- **Lead Management Dashboard**: View, filter, and manage all submitted leads in real-time
- **Search & Filter**: Search leads by name or email, filter by status (New, Contacted, Closed)
- **Status Tracking**: Update lead status with three predefined categories
- **Admin Authentication**: Secure login system for admin access
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Session Management**: Persistent login with secure cookie-based authentication
- **Real-time Updates**: Refresh leads and see changes immediately

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **JavaScript (ES6+)**

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT/Cookies** - Authentication

## 📁 Project Structure

```
LeadDesk/
├── LeadDesk_client/              # Frontend application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── common/          # Navbar, etc.
│   │   │   ├── hero/            # Hero section components
│   │   │   ├── footer/          # Footer
│   │   │   └── second/          # Secondary components
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Home page
│   │   │   ├── Admin.jsx        # Admin dashboard
│   │   │   └── Login.jsx        # Login page
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
├── backend/                      # Backend application
│   ├── Controllers/             # Request handlers
│   │   ├── leadController.js    # Lead management logic
│   │   └── useController.js     # User management logic
│   ├── models/                  # Database schemas
│   │   ├── leadModel.js         # Lead schema
│   │   ├── userModel.js         # User schema
│   │   └── Admin.js             # Admin schema
│   ├── routes/                  # API endpoints
│   │   ├── lead.route.js        # Lead routes
│   │   └── user.route.js        # User routes
│   ├── middleware/              # Custom middleware
│   │   └── auth.middleware.js   # Authentication
│   ├── lib/
│   │   ├── db.js               # Database connection
│   │   └── utils.js            # Utility functions
│   ├── index.js                # Server entry point
│   └── package.json
│
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection string)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd LeadDesk_client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_BASE=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

### Leads
- `GET /api/leads` - Fetch all leads (with optional search and status filters)
- `GET /api/leads/:id` - Fetch a specific lead
- `POST /api/leads` - Create a new lead
- `PATCH /api/leads/:id` - Update a lead's status
- `DELETE /api/leads/:id` - Delete a lead

### Users
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user
- `PATCH /api/users/:id` - Update user information

## 🔐 Authentication

The application uses secure cookie-based authentication:
- Admin credentials are validated against the database
- JWT tokens are stored in secure HTTP-only cookies
- All protected routes require valid authentication
- Session persistence across browser sessions

## 🎨 Styling

The UI uses Tailwind CSS with a custom dark theme featuring:
- Dark background (`#0B0D14`)
- Accent color: Orange (`#E8722C`)
- Status colors:
  - New: Orange (`#E8722C`)
  - Contacted: Blue (`#2C6FE8`)
  - Closed: Gray (`#3A3F52`)

## 🔄 Workflow

1. **Submit Lead**: Users fill out the form with their details
2. **Admin Login**: Admin logs in to the dashboard
3. **View Leads**: Admin sees all submitted leads in the table
4. **Search & Filter**: Admin can search by name/email or filter by status
5. **Update Status**: Admin changes lead status as needed
6. **Track Progress**: All changes are saved to MongoDB in real-time

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leaddesk
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE=http://localhost:5000
VITE_APP_NAME=LeadDesk
```

## 🛡️ Security Features

- Secure password hashing
- HTTP-only cookies for session storage
- CORS configuration for frontend access
- Input validation and sanitization
- Protected API routes with authentication middleware

## 📦 Scripts

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (auto-reload)
npm run test       # Run tests (if configured)
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For support, email support@leaddesk.com or open an issue in the repository.

---

**Built with ❤️ by the LeadDesk Team**
