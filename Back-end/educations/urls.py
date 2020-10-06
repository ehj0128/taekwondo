from django.urls import path
from . import views

urlpatterns = [
    path('poomsae/', views.poomsae_list),
]
