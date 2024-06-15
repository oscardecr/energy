from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Visit

class UserAdmin(BaseUserAdmin):
    list_display = ('national_id', 'first_name', 'last_name', 'is_admin', 'is_active')
    search_fields = ('national_id', 'first_name', 'last_name')
    ordering = ('national_id',)
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(User, UserAdmin)
admin.site.register(Visit)