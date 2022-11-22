from rest_framework import serializers
from .models import Meal_planner

class Meal_plannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal_planner
        fields = ["user", "breakfast_id", "lunch_id", "dinner_id"]