from rest_framework import viewsets
from .models import Payment, MonthlyIncome
from .serializer import PaymentSerializer, MonthlyIncomeSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class MonthlyIncomeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MonthlyIncome.objects.all()
    serializer_class = MonthlyIncomeSerializer
