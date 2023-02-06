from django.db import models
from authentication.models import User

# Create your models here.

class Breakfast(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    breakfast_name = models.CharField(max_length=255)
    breakfast_id = models.CharField(max_length=255)                             