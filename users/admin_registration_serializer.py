from rest_framework import serializers
from datetime import datetime, timedelta
from .models import User

class AdminRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'national_id', 'password', 'plan_type']

    def create(self, validated_data):
        user = User.objects.create_superuser(
            national_id=validated_data['national_id'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            membership_expiration=(datetime.now() + timedelta(days=365)).date(),  # Default to one year from now
            plan_type=validated_data.get('plan_type', 'Admin')  # Default to 'Admin' if not provided
        )
        return user
