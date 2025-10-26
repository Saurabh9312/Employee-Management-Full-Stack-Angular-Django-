from rest_framework import serializers
from .models import Employee
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class commonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'