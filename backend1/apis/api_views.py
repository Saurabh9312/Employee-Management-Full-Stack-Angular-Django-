from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .models import Employee, CustomUser
from rest_framework import serializers
from .serializers import commonSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class List(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = commonSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = commonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListDetail(APIView):
    def get(self, request, pk):
        employee = Employee.objects.get(pk=pk)
        serializer = commonSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def put(self, request, pk):
        employee = Employee.objects.get(pk=pk)
        serializer = commonSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        employee = Employee.objects.get(pk=pk)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk):
        employee = Employee.objects.get(pk=pk)
        serializer = commonSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access to signup
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access to login
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Use Django's authenticate method for secure authentication
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': getattr(user, 'role', 'user'),  # assuming role is an attribute of the user
                'username': user.username
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['role'] = user.profile.role  # assuming role is stored in user.profile.role
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'role': user.profile.role
    }

# Health check endpoint to keep the backend alive
from rest_framework.decorators import api_view
from rest_framework.response import Response
import datetime

@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint to keep the backend alive
    """
    return Response({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'message': 'Backend is running'
    })
