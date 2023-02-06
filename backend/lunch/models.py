from django.db import models
from authentication.models import User
# Create your models here.

class Lunch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lunch_name = models.CharField(max_length=255)
    lunch_id = models.CharField(max_length=255)        