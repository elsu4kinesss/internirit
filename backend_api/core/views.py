from django.shortcuts import render
from .models import Internship, Article, InternshipView
from django.http import JsonResponse
from .serializers import InternshipSerializer, ArticleSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def internship_list(request):
    internships = Internship.objects.all()
    serializer = InternshipSerializer(
        internships, 
        many=True,
        context={'request': request}
    )
    return JsonResponse(serializer.data, safe=False)

class InternshipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def mark_as_viewed(self, request, pk=None):
        internship = self.get_object()
        InternshipView.objects.update_or_create(
            user=request.user,
            internship=internship,
            defaults={'viewed': True}
        )
        return Response({'status': 'marked as viewed'})

def main_page(request):
    return render(request, 'main.html')

def articles_page(request):
    return render(request, 'articles.html')

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all().order_by('-date')
    serializer_class = ArticleSerializer