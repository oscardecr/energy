# Generated by Django 5.0.6 on 2024-07-17 04:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0008_alter_payment_membership_expiration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='membership_expiration',
            field=models.DateField(default=datetime.datetime(2024, 8, 15, 22, 3, 7, 976316)),
        ),
    ]
