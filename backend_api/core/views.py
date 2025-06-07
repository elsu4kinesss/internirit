from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Internship, Article
from .serializers import InternshipSerializer, ArticleSerializer

class InternshipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Internship.objects.all().order_by('-date')
    serializer_class = InternshipSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all().order_by('-date')
    serializer_class = ArticleSerializer

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_favorite(request, internship_id):
    try:
        internship = Internship.objects.get(pk=internship_id)
    except Internship.DoesNotExist:
        return Response({'error': 'Стажировка не найдена'}, status=404)

    user = request.user
    if internship in user.favorites.all():
        user.favorites.remove(internship)
        return Response({'status': 'removed'})
    else:
        user.favorites.add(internship)
        return Response({'status': 'added'})

def main_page(request):
    return render(request, 'main.html')

def articles_page(request):
    return render(request, 'articles.html')