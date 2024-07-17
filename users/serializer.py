from rest_framework import serializers
from .models import User, Visit
from collections import defaultdict

class UserSerializer(serializers.ModelSerializer):
    visits_per_month = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'national_id', 'date_born',
            'emergency_contact', 'phone_number', 'active', 'class_assigned', 'membership_expiration',
            'password', 'visits_per_month', 'plan_type'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}  # Make password optional
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)  # Hashing the password if provided
        else:
            user.set_unusable_password()  # Set an unusable password if not provided
        user.save()
        return user

    def get_visits_per_month(self, obj):
        visits = Visit.objects.filter(user=obj)
        visits_per_month = defaultdict(int)
        for visit in visits:
            month = visit.timestamp.strftime("%B %Y")
            visits_per_month[month] += 1
        return visits_per_month
