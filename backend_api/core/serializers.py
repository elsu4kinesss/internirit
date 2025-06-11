from rest_framework import serializers
from .models import Internship, Article, CustomUser, InternshipView, FavoriteInternship
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer

class InternshipSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()
    viewed = serializers.SerializerMethodField()

    class Meta:
        model = Internship
        fields = '__all__'

    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return FavoriteInternship.objects.filter(
                user=request.user, internship=obj, favorited=True
            ).exists()
        return False

    def get_viewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return InternshipView.objects.filter(
                user=request.user, internship=obj, viewed=True
            ).exists()
        return False

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        
class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'name', 'password')

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'name')
