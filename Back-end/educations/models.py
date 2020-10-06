from django.db import models

# Create your models here.


class Poomsae(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    url = models.TextField()
