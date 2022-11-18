from django.db import models
from authentication.models import User
# Create your models here.

class Shopping_list(models.Model):
    ingredients = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)