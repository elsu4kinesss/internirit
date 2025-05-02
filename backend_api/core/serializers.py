from rest_framework import serializers
from .models import Internship, Article

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = ['id', 'company', 'title', 'description', 'date', 'viewed']

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'