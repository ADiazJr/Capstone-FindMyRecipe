from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Shopping_list
from .serializers import Shopping_listSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status

@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def shopping_list_control(request):
    if request.method == "GET":
        shopping_list = Shopping_list.objects.all()
        serializer = Shopping_listSerializer(shopping_list)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = Shopping_listSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.data)
        return Response(serializer.data)

    elif request.method == 'PUT':
        shopping_list = get_object_or_404(Shopping_list)
        serializer = Shopping_listSerializer(shopping_list, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)

    elif request.method == "DELETE":
        shopping_list = get_object_or_404(Shopping_list)
        shopping_list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
