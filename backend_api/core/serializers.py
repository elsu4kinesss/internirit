from rest_framework import serializers
from .models import Internship, Article, CustomUser , InternshipView
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer

class InternshipSerializer(serializers.ModelSerializer):
    viewed = serializers.SerializerMethodField()

    class Meta:
        model = Internship
        fields = '__all__'

    def get_viewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            view = InternshipView.objects.filter(
                user=request.user, 
                internship=obj
            ).first()
            return view.viewed if view else False
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
