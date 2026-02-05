#!/bin/bash

# Employee Management System - Deployment Script
# This script builds and runs the full-stack application

set -e  # Exit on any error

echo "==================================="
echo "Employee Management System Deployment"
echo "==================================="

# Function to setup backend
setup_backend() {
    echo "Setting up backend..."
    cd backend1
    
    # Install Python dependencies
    if [ -f "requirements.txt" ]; then
        echo "Installing Python dependencies..."
        pip3 install -r requirements.txt
    else
        echo "No requirements.txt found in backend"
    fi
    
    # Run Django migrations
    echo "Running Django migrations..."
    python3 manage.py makemigrations
    python3 manage.py migrate
    
    # Collect static files
    echo "Collecting static files..."
    python3 manage.py collectstatic --noinput
    
    echo "Backend setup complete!"
    cd ..
}

# Function to setup frontend
setup_frontend() {
    echo "Setting up frontend..."
    cd frontend
    
    # Install Node.js dependencies
    if [ -f "package.json" ]; then
        echo "Installing Node.js dependencies..."
        npm install --legacy-peer-deps
    else
        echo "No package.json found in frontend"
    fi
    
    echo "Frontend setup complete!"
    cd ..
}

# Function to build frontend for production
build_frontend() {
    echo "Building frontend for production..."
    cd frontend
    
    # Build the Angular application
    npx ng build --configuration production
    
    echo "Frontend build complete!"
    cd ..
}

# Function to start backend server
start_backend() {
    echo "Starting backend server..."
    cd backend1
    
    # Start Django server in background
    python3 manage.py runserver 0.0.0.0:8000 &
    BACKEND_PID=$!
    echo "Backend server started with PID: $BACKEND_PID"
    
    cd ..
    
    # Store backend PID for cleanup
    echo $BACKEND_PID > backend.pid
}

# Function to start frontend server
start_frontend() {
    echo "Starting frontend server..."
    cd frontend
    
    # Start Angular development server in background
    npx ng serve --host 0.0.0.0 --port 4200 --disable-host-check &
    FRONTEND_PID=$!
    echo "Frontend server started with PID: $FRONTEND_PID"
    
    cd ..
    
    # Store frontend PID for cleanup
    echo $FRONTEND_PID > frontend.pid
}

# Function to start production servers
start_production() {
    echo "Starting production servers..."
    
    # Start backend
    cd backend1
    gunicorn --bind 0.0.0.0:8000 --workers 3 backend1.wsgi:application &
    BACKEND_PID=$!
    echo "Production backend started with PID: $BACKEND_PID"
    cd ..
    
    # Store backend PID
    echo $BACKEND_PID > backend.pid
    
    # For production, frontend should be served from a web server or built and served separately
    echo "Frontend is built and should be served from a web server (nginx, Apache, etc.)"
}

# Function to stop all servers
stop_servers() {
    echo "Stopping all servers..."
    
    # Stop backend server
    if [ -f "backend.pid" ]; then
        BACKEND_PID=$(cat backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID
            echo "Backend server stopped (PID: $BACKEND_PID)"
        fi
        rm backend.pid
    fi
    
    # Stop frontend server
    if [ -f "frontend.pid" ]; then
        FRONTEND_PID=$(cat frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID
            echo "Frontend server stopped (PID: $FRONTEND_PID)"
        fi
        rm frontend.pid
    fi
    
    echo "All servers stopped."
}

# Function to show help
show_help() {
    echo "Usage: $0 [setup|build|start-dev|start-prod|stop|help]"
    echo ""
    echo "Commands:"
    echo "  setup      - Setup both backend and frontend dependencies"
    echo "  build      - Build frontend for production"
    echo "  start-dev  - Start development servers for both backend and frontend"
    echo "  start-prod - Start production servers (backend with gunicorn, frontend built)"
    echo "  stop       - Stop all running servers"
    echo "  help       - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup      # Setup the project"
    echo "  $0 build      # Build for production"
    echo "  $0 start-dev  # Start development mode"
}

# Main execution
case "$1" in
    setup)
        setup_backend
        setup_frontend
        ;;
    build)
        build_frontend
        ;;
    start-dev)
        setup_backend
        start_backend
        start_frontend
        echo ""
        echo "==================================="
        echo "Development servers started!"
        echo "Backend: http://localhost:8000"
        echo "Frontend: http://localhost:4200"
        echo "Press Ctrl+C to stop"
        echo "==================================="
        # Keep script running to maintain servers
        sleep infinity &
        wait $!
        ;;
    start-prod)
        start_production
        echo ""
        echo "==================================="
        echo "Production servers started!"
        echo "Backend: http://localhost:8000"
        echo "Frontend: Built and ready to be served"
        echo "==================================="
        ;;
    stop)
        stop_servers
        ;;
    help|"")
        show_help
        ;;
    *)
        echo "Unknown command: $1"
        show_help
        exit 1
        ;;
esac