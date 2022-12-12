from rest_framework import serializers
from .models import Shopping_list

class Shopping_listSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shopping_list
        fields = ["user_id", "ingredient", "id"]