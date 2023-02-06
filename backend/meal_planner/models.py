from django.db import models
from authentication.models import User
# Create your models here.

class Meal_planner(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    breakfast_id = models.CharField(max_length=255, null=True) 
    lunch_id = models.CharField(max_length=255, null=True)
    dinner_id = models.CharField(max_length=255, null=True)