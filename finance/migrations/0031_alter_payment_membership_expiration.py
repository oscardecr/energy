# Generated by Django 5.0.6 on 2024-08-13 16:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0030_alter_payment_membership_expiration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='membership_expiration',
            field=models.DateField(default=datetime.datetime(2024, 9, 12, 10, 23, 3, 123390)),
        ),
    ]