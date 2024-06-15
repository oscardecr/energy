from rest_framework import serializers
from .models import User, Visit, Payment
from collections import defaultdict


class UserSerializer(serializers.ModelSerializer):
    visits_per_month = serializers.SerializerMethodField()
    payments = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'national_id', 'date_born', 'emergency_contact', 'active', 'class_assigned', 'membership_expiration', 'password', 'visits_per_month', 'payments']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hashing the password
        user.save()
        return user
    
    def get_visits_per_month(self, obj):
        visits = Visit.objects.filter(user=obj)
        visits_per_month = defaultdict(int)
        for visit in visits:
            month = visit.timestamp.strftime("%B %Y")
            visits_per_month[month] += 1
        return visits_per_month
    
    def get_payments(self, obj):
        payments = Payment.objects.filter(user=obj).order_by('-timestamp')
        return PaymentSerializer(payments, many=True).data

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['timestamp', 'plan', 'amount']
    
