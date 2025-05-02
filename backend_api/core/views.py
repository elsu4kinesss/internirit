from django.shortcuts import render
from .models import Internship, Article
from django.http import JsonResponse
from .serializers import InternshipSerializer, ArticleSerializer
from rest_framework import viewsets

def internship_list(request):
    internships = Internship.objects.all()
    serializer = InternshipSerializer(internships, many=True)
    return JsonResponse(serializer.data, safe=False)

def main_page(request):
    return render(request, 'main.html')

def articles_page(request):
    return render(request, 'articles.html')

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all().order_by('-date')
    serializer_class = ArticleSerializer