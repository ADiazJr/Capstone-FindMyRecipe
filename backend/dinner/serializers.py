from rest_framework import serializers
from .models import Dinner

class DinnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dinner
        fields = ["user", "dinner_name", "dinner_id"]