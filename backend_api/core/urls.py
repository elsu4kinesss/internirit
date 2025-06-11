from django.urls import include, path
from django.shortcuts import redirect
from . import views
from .views import ArticleViewSet, InternshipViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'internships', InternshipViewSet)

urlpatterns = [
    path('', lambda request: redirect('main')),
    path('main/', views.main_page, name='main'),
    path('main/articles/', views.articles_page, name='articles'),
    path('api/', include(router.urls)),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
]