from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AdminUserViewSet, register_user, register_admin, user_list, LoginView, register_visit, register_payment, expired_memberships, update_user, delete_user, recent_visits

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'admin/users', AdminUserViewSet, basename='admin-user')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register_user'),
    path('register/admin/', register_admin, name='register_admin'),
    path('api/users/', user_list, name='user_list'),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('register-visit/', register_visit, name='register-visit'),
    path('api/register-payment/', register_payment, name='register-payment'),
    path('api/expired-memberships/', expired_memberships, name='expired-memberships'),
    path('api/users/<int:pk>/', update_user, name='user-update'),
    path('api/users/delete/<int:pk>/', delete_user, name='user-delete'),
    path('api/recent-visits/', recent_visits, name='recent-visits'),
]