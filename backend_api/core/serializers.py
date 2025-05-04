from rest_framework import serializers
from .models import Internship, Article, CustomUser, ViewedInternship
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer


class InternshipSerializer(serializers.ModelSerializer):
    viewed = serializers.SerializerMethodField()

    class Meta:
        model = Internship
        fields = '__all__'

    def get_viewed(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return ViewedInternship.objects.filter(user=user, internship=obj).exists()
        return False

class ViewedInternshipSerializer(serializers.ModelSerializer):
    internship = serializers.PrimaryKeyRelatedField(queryset=Internship.objects.all())
    class Meta:
        model = ViewedInternship
        fields = ['internship']

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
