from django.db import models
from authentication.models import User

# Create your models here.

class Favorite_recipes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe_id = models.CharField(max_length=255)