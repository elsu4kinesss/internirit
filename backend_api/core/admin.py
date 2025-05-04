from django.contrib import admin
from .models import Internship, Article, ViewedInternship, CustomUser
from django.contrib.auth.admin import UserAdmin
    
@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'date', 'external_url')
    search_fields = ('title', 'company')
    ordering = ('title',)

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "date")
    search_fields = ("title",)
    list_filter = ("date",)
    
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    ordering = ('email',)
    search_fields = ('email', 'name')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Личная информация', {'fields': ('name',)}),
        ('Права доступа', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Даты', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

@admin.register(ViewedInternship)
class ViewedInternshipAdmin(admin.ModelAdmin):
    list_display = ('user', 'internship', 'viewed_at')