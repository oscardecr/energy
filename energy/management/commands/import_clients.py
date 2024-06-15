import pandas as pd
from django.core.management.base import BaseCommand
from users.models import User
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Imports clients from an Excel file'

    def handle(self, *args, **kwargs):
        file_path = 'energy/management/commands/Lista de Clientes.xlsx'
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

            # Handle date parsing with error handling
            try:
                date_born = pd.to_datetime(row['Fecha de Nacimiento'], errors='raise').date()
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"Skipping row {index} due to invalid date: {row['Fecha de Nacimiento']}"))
                continue

            emergency_contact = row['Contacto Emergencia']
            
            user, created = User.objects.get_or_create(
                national_id=national_id,
                defaults={
                    'first_name': first_name,
                    'last_name': last_name,
                    'date_born': date_born,
                    'emergency_contact': emergency_contact,
                    'password': 'defaultpassword123',  # You may want to set a proper password
                    'membership_expiration': datetime.now().date() + timedelta(days=365)
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'User {first_name} {last_name} created'))
            else:
                self.stdout.write(self.style.WARNING(f'User {first_name} {last_name} already exists'))

        self.stdout.write(self.style.SUCCESS('Import completed successfully'))
