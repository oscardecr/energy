from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet, MonthlyIncomeViewSet, monthly_incomes_by_payment_method, incomes_by_user

router = DefaultRouter()
router.register(r'payments', PaymentViewSet)
router.register(r'monthly-incomes', MonthlyIncomeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('monthly-incomes-by-payment-method/', monthly_incomes_by_payment_method, name='monthly-incomes-by-payment-method'),
    path('incomes-by-user/', incomes_by_user, name='incomes-by-user'),
]
