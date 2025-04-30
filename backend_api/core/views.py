from django.shortcuts import render
from .models import Internship
from django.http import JsonResponse
from .serializers import InternshipSerializer 

def internship_list(request):
    internships = Internship.objects.all()
    serializer = InternshipSerializer(internships, many=True)
    return JsonResponse(serializer.data, safe=False)

def main_page(request):
    return render(request, 'main.html')

def articles_page(request):
    return render(request, 'articles.html')