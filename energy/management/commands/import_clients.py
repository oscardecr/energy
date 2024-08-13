import pandas as pd
from django.core.management.base import BaseCommand
from users.models import User
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Imports clients from an Excel file'

    def handle(self, *args, **kwargs):
        file_path = 'energy/management/commands/users_178.xlsx'
        df = pd.read_excel(file_path)

        for index, row in df.iterrows():
            nombre = row['Nombre']
            parts = nombre.split(' ', 1)
            if len(parts) == 2:
                first_name, last_name = parts
            else:
                first_name = parts[0]
                last_name = ''

            national_id = row['Cedula']

            emergency_contact = row['Contacto Emergencia']

            phone_number = row['Telefono']

            membership_expiration = row['Vencimiento de Membresia']

            plan_type = row['Tipo de Plan']
            
            user, created = User.objects.get_or_create(
                national_id=national_id,
                defaults={
                    'first_name': first_name,
                    'last_name': last_name,
                    'emergency_contact': emergency_contact,
                    'password': 'defaultpassword123',  # You may want to set a proper password
                    'membership_expiration': membership_expiration,
                    'plan_type': plan_type,
                    'phone_number': phone_number
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'User {first_name} {last_name} created'))
            else:
                self.stdout.write(self.style.WARNING(f'User {first_name} {last_name} already exists'))

        self.stdout.write(self.style.SUCCESS('Import completed successfully'))