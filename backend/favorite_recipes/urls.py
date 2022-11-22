from django.urls import path
from favorite_recipes import views

urlpatterns = [
    path('', views.favorite_recipes_control)
]