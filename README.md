# Employee Management System

## Environment Variables

Create a `.env` file in the backend1 directory with the following variables:

```
# Django settings
SECRET_KEY=your-super-secret-key-here-change-this-in-production
DEBUG=False
ENVIRONMENT=production
ALLOWED_HOSTS=employee-management-full-stack-angular-3eod.onrender.com

# CORS settings - adjust for your domain
CORS_ALLOWED_ORIGINS=https://employee-management-full-stack-angular-q7go.onrender.com

# Database (for production) - uncomment and configure when needed
# DATABASE_URL=postgresql://user:password@localhost:5432/employee_management

# Redis for session storage (optional)
REDIS_URL=redis://localhost:6379/0

# Security settings
SECURE_SSL_REDIRECT=True
SECURE_PROXY_SSL_HEADER=('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_HOST=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

## Project Structure

- `backend1/` - Django REST API backend
- `frontend/` - Angular frontend application

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- PostgreSQL (optional, SQLite is used by default)

## Setup and Installation

### Backend Setup (Django)

The backend API is available at `https://employee-management-full-stack-angular-3eod.onrender.com/api/` for production.

1. Navigate to the backend directory:
   ```bash
   cd backend1/
   ```

2. Create a virtual environment (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your configuration:
   ```env
   SECRET_KEY=your-super-secret-key-here-change-this-in-production
   DEBUG=True
   ENVIRONMENT=development
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:4200,http://127.0.0.1:4200
   # For production, use a proper database URL:
   # DATABASE_URL=postgresql://user:password@localhost:5432/employee_management
   ```

5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

7. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd frontend/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

## Using the Deployment Script

A deployment script is provided to automate the setup and running process:

```bash
# Make the script executable
chmod +x deploy.sh

# Setup the project (install dependencies)
./deploy.sh setup

# Build the frontend for production
./deploy.sh build

# Start development servers
./deploy.sh start-dev

# Start production servers
./deploy.sh start-prod

# Stop all running servers
./deploy.sh stop

# Show help
./deploy.sh help
```

## Environment Configuration

### Backend Environment Variables

- `SECRET_KEY`: Django secret key (required)
- `DEBUG`: Enable/disable debug mode (default: False)
- `ENVIRONMENT`: Set to 'production' for production settings (default: 'development')
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts (default: 'localhost,127.0.0.1')
- `DATABASE_URL`: Database connection string (for production)
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed origins (default: 'http://localhost:4200,http://127.0.0.1:4200')

### Frontend Environment Files

- `src/environments/environment.ts`: Default environment
- `src/environments/environment.development.ts`: Development environment
- `src/environments/environment.prod.ts`: Production environment

## API Endpoints

The backend API is available at `http://localhost:8000/api/` during development.

### Available Endpoints:

- `GET /api/employees/` - List all employees
- `POST /api/add/` - Add a new employee
- `GET /api/details/{id}` - Get employee details
- `PUT /api/update/{id}` - Update employee
- `DELETE /api/delete/{id}` - Delete employee
- `POST /api/signup/` - User signup
- `POST /api/login/` - User login

## Production Deployment

For production deployment:

1. Set `DEBUG=False` and `ENVIRONMENT=production` in your environment
2. Use a production-ready database (PostgreSQL recommended)
3. Configure proper CORS settings
4. Use environment-specific configurations
5. Set up a reverse proxy (nginx/Apache) to serve static files

## Running the Application

### For Production Deployment:

Backend (Django):
```bash
# From the backend1 directory
gunicorn --bind 0.0.0.0:8000 --workers 3 backend1.wsgi:application &
```

Frontend (Angular):
```bash
# From the frontend directory
npx serve -s dist/frontend/browser -l 4200 &
```

For the deployed application:
- Backend: https://employee-management-full-stack-angular-3eod.onrender.com
- Frontend: https://employee-management-full-stack-angular-q7go.onrender.com

### Backend (using Gunicorn)

```bash
cd backend1/
gunicorn --bind 0.0.0.0:8000 --workers 3 backend1.wsgi:application
```

### Frontend (build and serve)

```bash
cd frontend/
ng build --configuration production
```

Then serve the `dist/` folder contents using a web server.

## Database Configuration

By default, the application uses SQLite for development. For production, it's recommended to use PostgreSQL:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/employee_management
ENVIRONMENT=production
```

## Security Considerations

- Never commit your `.env` file to version control
- Use strong, unique values for `SECRET_KEY`
- Set `DEBUG=False` in production
- Configure proper CORS settings for production
- Use HTTPS in production
- Regularly update dependencies

## Troubleshooting

### Common Issues:

1. **Module not found errors**: Make sure you've installed all dependencies with `pip install -r requirements.txt` and `npm install`

2. **Database migration errors**: Run `python manage.py makemigrations` followed by `python manage.py migrate`

3. **CORS errors**: Check that your frontend URL is in the `CORS_ALLOWED_ORIGINS` setting

4. **Environment variables not loading**: Ensure your `.env` file is in the correct location and properly formatted

## Additional Notes

- The application uses JWT for authentication
- Static files are handled by WhiteNoise in production
- The API follows REST principles
- The frontend is built with Angular and Material Design