from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics

from .models import Note
from .serializer import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import serializers


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CreateNoteList(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)
    
    def perform_create(self, serializer : serializers.ModelSerializer):
            serializer.save(author = self.request.user)
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):

    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)

