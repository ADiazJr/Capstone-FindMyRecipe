from django.urls import path
from lunch import views

urlpatterns = [
    path('', views.lunch_control)
]