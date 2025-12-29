from django.contrib import admin
from django.urls import path, include
from . import api_views

urlpatterns = [
   path('employees/', api_views.List.as_view()),
   path('add/', api_views.List.as_view()),
   path('details/<int:pk>', api_views.ListDetail.as_view()),
   path('update/<int:pk>', api_views.ListDetail.as_view()),
   path('delete/<int:pk>', api_views.ListDetail.as_view()),

   path('signup/', api_views.SignupView.as_view(), name='signup'),
   path('login/', api_views.LoginView.as_view(), name='login'),
   
   # Health check endpoint to keep backend alive
   path('health-check/', api_views.health_check, name='health_check'),
]