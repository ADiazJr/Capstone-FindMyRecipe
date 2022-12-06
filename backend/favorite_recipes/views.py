from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Favorite_recipes
from .serializers import Favorite_recipesSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def favorite_recipes_control(request):
    if request.method == "GET":
        favorite_recipe = Favorite_recipes.objects.all()
        serializer = Favorite_recipesSerializer(favorite_recipe, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = Favorite_recipesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def favorite_recipe_delete(request, recipe_id):
    if request.method == "DELETE":
        favorite_recipe = get_object_or_404(Favorite_recipes, recipe_id=recipe_id, user=request.user)
        favorite_recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)