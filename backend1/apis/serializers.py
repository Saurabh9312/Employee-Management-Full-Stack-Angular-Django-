from rest_framework import serializers
from .models import Employee
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'role', 'first_name', 'last_name')
    
    def create(self, validated_data):
        # Hash the password before saving
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # This properly hashes the password
        user.save()
        return user

class commonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'