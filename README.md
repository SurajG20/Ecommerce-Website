# Ecommerce Website

A modern, full-stack ecommerce platform built with React and Node.js, featuring secure payment processing with Stripe, user authentication, and a responsive design.

## 🚀 Features

- **User Authentication & Authorization**
  - Secure login and registration
  - JWT-based authentication
  - Role-based access control

- **Product Management**
  - Product catalog with categories
  - Detailed product views
  - Search and filtering capabilities

- **Shopping Experience**
  - Shopping cart functionality
  - Secure checkout process
  - Order history and tracking

- **Payment Processing**
  - Stripe integration for secure payments
  - Customer creation and management
  - Order confirmation and email notifications
  - Payment failure handling and logging

- **Admin Dashboard**
  - Product management
  - Order management
  - User management

## 🛠️ Technologies Used

### Frontend
- React.js with Vite
- Redux Toolkit for state management
- React Router for navigation
- TailwindCSS for styling
- Radix UI components
- Stripe.js for payment integration
- Firebase for additional features

### Backend
- Node.js with Express
- PostgreSQL with Sequelize ORM
- JWT for authentication
- Stripe API integration
- Winston for logging
- Express rate limiting and security features
- Joi for validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Stripe account and API keys

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Ecommerce-Website
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:
   - Create `.env` files in both backend and frontend directories
   - Add necessary environment variables (see `.env.example` files)

5. Set up the database:
```bash
cd backend
npm run seed
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.