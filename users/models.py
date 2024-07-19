from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from datetime import datetime, timedelta
from django.conf import settings
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, national_id, first_name, last_name, emergency_contact, membership_expiration, plan_type, password=None):
        if not national_id:
            raise ValueError('Users must have a national ID')
        user = self.model(
            national_id=national_id,
            first_name=first_name,
            last_name=last_name,
            emergency_contact=emergency_contact,
            membership_expiration=membership_expiration,
            plan_type=plan_type
        )
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()  # Set unusable password if none is provided
        user.save(using=self._db)
        return user
    
    def create_superuser(self, national_id, first_name, last_name, password=None, membership_expiration=None, emergency_contact=None, plan_type=None):
        user = self.create_user(
            national_id=national_id,
            first_name=first_name,
            last_name=last_name,
            password=password,
            membership_expiration=membership_expiration,
            emergency_contact=emergency_contact,
            plan_type=plan_type or 'Admin'  # Default to 'Admin' or another suitable default value
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    national_id = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    emergency_contact = models.CharField(max_length=50, null=True, blank=True)
    active = models.BooleanField(default=True)
    class_assigned = models.ManyToManyField('classes.Class', blank=True)
    membership_expiration = models.DateField()
    password = models.CharField(max_length=128, null=True, blank=True)  # Make password optional
    phone_number = models.CharField(max_length=15, null=True, blank=True)  # New field for phone number
    plan_type = models.CharField(max_length=50, null=True, blank=True)  # New field for plan type

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'national_id'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'emergency_contact']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
    

class Visit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
