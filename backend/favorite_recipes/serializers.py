from .models import Favorite_recipes
from rest_framework import serializers

class Favorite_recipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite_recipes
        fields = ["user", "recipe_id"]