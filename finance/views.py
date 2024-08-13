from rest_framework import viewsets
from .models import Payment, MonthlyIncome
from .serializer import PaymentSerializer, MonthlyIncomeSerializer
from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.decorators import api_view

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class MonthlyIncomeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MonthlyIncome.objects.all()
    serializer_class = MonthlyIncomeSerializer


@api_view(['GET'])
def monthly_incomes_by_payment_method(request):
    incomes = Payment.objects.values('timestamp__year', 'timestamp__month', 'payment_method').annotate(
        total_income=Sum('amount')
    ).order_by('timestamp__year', 'timestamp__month', 'payment_method')

    result = {}
    for income in incomes:
        year = income['timestamp__year']
        month = income['timestamp__month']
        payment_method = income['payment_method']
        total_income = income['total_income']

        if year not in result:
            result[year] = {}
        if month not in result[year]:
            result[year][month] = {}
        
        result[year][month][payment_method] = total_income
    
    return Response(result)

@api_view(['GET'])
def incomes_by_user(request):
    incomes = Payment.objects.values('user__id', 'user__first_name', 'user__last_name', 'payment_method', 'timestamp').annotate(
        total_income=Sum('amount')
    ).order_by('user__first_name', 'user__last_name', 'payment_method')

    result = {}
    for income in incomes:
        user_name = f"{income['user__first_name']} {income['user__last_name']}"
        payment_method = income['payment_method']
        payment_date = income['timestamp'].strftime('%Y-%m-%d')
        total_income = income['total_income']

        if user_name not in result:
            result[user_name] = []
        result[user_name].append({
            'payment_method': payment_method,
            'total_income': total_income,
            'payment_date': payment_date
        })

    return Response(result)


