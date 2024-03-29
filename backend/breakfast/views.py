from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Breakfast
from .serializers import BreakfastSerializer
from django.shortcuts import get_object_or_404

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def breakfast_control(request):
    breakfast = Breakfast.objects.all()
    serializer = BreakfastSerializer(breakfast)
    return Response(serializer.data)