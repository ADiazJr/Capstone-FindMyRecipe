from django.urls import path
from dinner import views

urlpatterns = [
    path('', views.dinner_control)
]