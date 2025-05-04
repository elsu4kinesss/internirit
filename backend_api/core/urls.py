from django.urls import include, path
from django.shortcuts import redirect
from . import views
from .views import internship_list, ArticleViewSet, InternshipListAPIView, MarkInternshipViewedAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)

urlpatterns = [
    path('', lambda request: redirect('main')),
    path('main/', views.main_page, name='main'),
    path('main/articles/', views.articles_page, name='articles'),
    path('api/internships/', internship_list, name='internship_list'),
    path('api/', include(router.urls)),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('internships/', InternshipListAPIView.as_view(), name='internship-list'),
    path('api/internships/mark_viewed/', MarkInternshipViewedAPIView.as_view(), name='mark_internship_viewed'),
    ]