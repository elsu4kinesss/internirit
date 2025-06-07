from django.urls import include, path
from django.shortcuts import redirect
from rest_framework.routers import DefaultRouter
from .views import (
    main_page,
    articles_page,
    toggle_favorite,
    InternshipViewSet,
    ArticleViewSet,
)

router = DefaultRouter()
router.register(r'internships', InternshipViewSet, basename='internships')
router.register(r'articles', ArticleViewSet, basename='articles')

urlpatterns = [
    path('', lambda request: redirect('main')),
    
    path('main/', main_page, name='main'),
    path('main/articles/', articles_page, name='articles'),

    path('api/', include(router.urls)),
    path('api/favorites/<int:internship_id>/', toggle_favorite, name='toggle_favorite'),

    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
]