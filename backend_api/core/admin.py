from django.contrib import admin
from .models import Internship, Article
    
@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'date', 'viewed')
    list_filter = ('viewed',)
    search_fields = ('title', 'company')
    ordering = ('title',)

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "date")
    search_fields = ("title", "category")
    list_filter = ("category", "date")