from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Lunch
from .serializers import LunchSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def lunch_control(request):
    lunch = Lunch.objects.all()
    serializer = LunchSerializer(lunch)
    return Response(serializer.data)