from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Poomsae
from .serializers import PoomsaeSerializer
# Create your views here.


@api_view(['GET'])
def poomsae_list(request):
    print("poomsae")
    poomsae_list = Poomsae.objects.all()
    serializer = PoomsaeSerializer(poomsae_list, many=True)
    return Response({"status": "OK", "data": serializer.data})
