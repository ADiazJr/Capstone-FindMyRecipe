from rest_framework import serializers
from .models import Breakfast

class BreakfastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breakfast
        fields = ["user", "breakfast_name", "breakfast_id"]