from django.urls import path
from shopping_list import views

urlpatterns = [
    path('', views.shopping_list_control)
]