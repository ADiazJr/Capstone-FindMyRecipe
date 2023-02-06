from django.urls import path
from meal_planner import views

urlpatterns = [
    path('', views.meal_planner_control),
    path('<int:pk>/', views.update_meal_plan)
]