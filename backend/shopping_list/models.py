from django.db import models
from authentication.models import User
# Create your models here.

class Shopping_list(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredient = models.CharField(max_length=255)