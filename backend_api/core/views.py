from django.shortcuts import render
from django.http import JsonResponse
from .models import Internship, Article, ViewedInternship
from .serializers import InternshipSerializer, ArticleSerializer, ViewedInternshipSerializer
from rest_framework import viewsets
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

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

class InternshipListAPIView(generics.ListAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class MarkInternshipViewedAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ViewedInternshipSerializer(data=request.data)
        if serializer.is_valid():
            internship = serializer.validated_data['internship']
            ViewedInternship.objects.get_or_create(user=request.user, internship=internship)
            return Response({"status": "viewed marked"})
        return Response(serializer.errors, status=400)
