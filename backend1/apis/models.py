from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator

class Employee(models.Model):
    class Status(models.TextChoices):
        Active = 'Active', 'Active'
        Inactive = 'Inactive', 'Inactive'

    class Designation(models.TextChoices):
        Manager = 'Manager', 'Manager'
        Developer = 'Developer', 'Developer'
        Tester = 'Tester', 'Tester'

    class Department(models.TextChoices):
        MS = 'MS', 'MS'
        NonMS = 'NonMS', 'NonMS'

    fullname = models.CharField(
        max_length=255,
        help_text="Enter the employee's full name."
    )
    email = models.EmailField(
        max_length=255,
        unique=True,
        help_text="Enter a valid and unique email address."
    )
    phone = models.CharField(
        max_length=15,
        help_text="Enter the employee's phone number."
    )
    designation = models.CharField(
        max_length=20,
        choices=Designation.choices,
        default=Designation.Developer,
        help_text="Select the employee's job title."
    )
    department = models.CharField(
        max_length=20,
        choices=Department.choices,
        default=Department.NonMS,
        help_text="Select the employee's department."
    )
    salary = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="Enter the employee's salary. Must be a non-negative number."
    )
    dateofjoining = models.DateField(
        help_text="Enter the date the employee joined."
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.Active,
        help_text="Select the employee's status."
    )
    address = models.TextField(
        help_text="Enter the employee's full address."
    )

    def __str__(self):
        return self.fullname

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('subadmin', 'Sub Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='subadmin')
    
    # Override the groups and user_permissions fields to avoid conflicts
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Add unique related_name
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Add unique related_name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )