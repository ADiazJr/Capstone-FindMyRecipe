from django.db import models
from authentication.models import User
# Create your models here.

class Dinner(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dinner_name = models.CharField(max_length=255)
    dinner_id = models.CharField(max_length=255)        