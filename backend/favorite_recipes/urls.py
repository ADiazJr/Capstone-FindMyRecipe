from django.urls import path
from favorite_recipes import views

urlpatterns = [
    path('', views.favorite_recipes_control),
    path('<int:recipe_id>/', views.favorite_recipe_delete),
]