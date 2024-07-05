from rest_framework import serializers
from .models import Payment, MonthlyIncome

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['user', 'plan', 'amount', 'timestamp', 'membership_expiration']

class MonthlyIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyIncome
        fields = ['month', 'year', 'total_income']
