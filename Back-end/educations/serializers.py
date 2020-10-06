from rest_framework import serializers
from .models import Poomsae


class PoomsaeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poomsae
        fields = ('id', 'name', 'description', 'url')
