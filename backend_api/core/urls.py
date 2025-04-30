from django.urls import path
from django.shortcuts import redirect
from . import views
from .views import internship_list

urlpatterns = [
    path('', lambda request: redirect('main')),
    path('main/', views.main_page, name='main'),
    path('main/articles/', views.articles_page, name='articles'),
    path('api/internships/', internship_list, name='internship_list'),
]