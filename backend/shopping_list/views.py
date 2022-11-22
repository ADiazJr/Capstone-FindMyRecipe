from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Shopping_list
from .serializers import Shopping_listSerializer
from django.shortcuts import get_object_or_404

@api_view(["GET, PUT, DELETE"])
@permission_classes([IsAuthenticated])
def shopping_list_control(request):
    if request.method == "GET":
        shopping_list = Shopping_list.objects.all()
        serializer = Shopping_listSerializer(shopping_list)
        return Response(serializer.data)

    elif request.method == 'PUT':
        shopping_list = get_object_or_404(Shopping_list)
        serializer = Shopping_listSerializer(shopping_list, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
