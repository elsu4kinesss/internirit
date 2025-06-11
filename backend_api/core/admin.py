from django.contrib import admin
from .models import Internship, Article, CustomUser, InternshipView
from django.contrib.auth.admin import UserAdmin
    
@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'date', 'external_url')
    search_fields = ('title', 'company')
    ordering = ('title',)

@admin.register(InternshipView)
class InternshipViewAdmin(admin.ModelAdmin):
    list_display = ('user', 'internship', 'viewed', 'viewed_at')
    list_filter = ('viewed',)
    search_fields = ('user__email', 'internship__title')
    list_select_related = ('user', 'internship')

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