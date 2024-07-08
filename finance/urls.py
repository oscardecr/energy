from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet, MonthlyIncomeViewSet

router = DefaultRouter()
router.register(r'payments', PaymentViewSet)
router.register(r'monthly-incomes', MonthlyIncomeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
