# Generated by Django 5.0.6 on 2024-07-17 20:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0010_alter_payment_membership_expiration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='membership_expiration',
            field=models.DateField(default=datetime.datetime(2024, 8, 16, 14, 11, 30, 418225)),
        ),
    ]