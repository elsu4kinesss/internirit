from django.contrib import admin
from .models import Internship
    
@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'date', 'viewed')
    list_filter = ('viewed',)
    search_fields = ('title', 'company')
    ordering = ('title',)