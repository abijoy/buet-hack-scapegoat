from rest_framework import serializers

from .models import Note

class NoteSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'title', 'description'
        ]