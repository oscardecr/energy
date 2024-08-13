from django.db import models
from django.utils import timezone
from users.models import User
from datetime import datetime, timedelta

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, default='SINPE')  # New field with default value
    timestamp = models.DateTimeField(auto_now_add=True)
    membership_expiration = models.DateField(default=datetime.today() + timedelta(days=30))

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_monthly_income()

    def update_monthly_income(self):
        month = self.timestamp.strftime('%B')
        year = self.timestamp.year
        income, created = MonthlyIncome.objects.get_or_create(month=month, year=year)
        income.total_income += self.amount
        income.save()

class MonthlyIncome(models.Model):
    month = models.CharField(max_length=20)
    year = models.IntegerField()
    total_income = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        unique_together = ('month', 'year')

    def __str__(self):
        return f'{self.month} {self.year} - {self.total_income}'
