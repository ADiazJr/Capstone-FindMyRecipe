from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Meal_planner
from .serializers import Meal_plannerSerializer
from django.shortcuts import get_object_or_404

@api_view(["GET, POST"])
@permission_classes([IsAuthenticated])
def meal_planner_control(request):
    if request.method == "GET":
        meal_planner = Meal_planner.objects.all()
        serializer = Meal_plannerSerializer(meal_planner)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = Meal_plannerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)