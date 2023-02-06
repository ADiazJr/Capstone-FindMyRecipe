from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Dinner
from .serializers import DinnerSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dinner_control(request):
    dinner = Dinner.objects.all()
    serializer = DinnerSerializer(dinner)
    return Response(serializer.data)