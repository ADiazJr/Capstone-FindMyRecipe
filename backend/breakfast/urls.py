from django.urls import path
from breakfast import views

urlpatterns = [
    path('', views.breakfast_control)
]