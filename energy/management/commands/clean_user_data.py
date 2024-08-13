from django.core.management.base import BaseCommand
from users.models import User

class Command(BaseCommand):
    help = 'Clean up User data to remove .0 from national_id and emergency_contact'

    def handle(self, *args, **kwargs):
        users = User.objects.all()
        for user in users:
            cleaned_national_id = user.national_id.replace('.0', '') if user.national_id else user.national_id
            cleaned_emergency_contact = user.emergency_contact.replace('.0', '') if user.emergency_contact else user.emergency_contact
            
            if user.national_id != cleaned_national_id or user.emergency_contact != cleaned_emergency_contact:
                user.national_id = cleaned_national_id
                user.emergency_contact = cleaned_emergency_contact
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Updated User {user.id}: national_id={cleaned_national_id}, emergency_contact={cleaned_emergency_contact}'))
            else:
                self.stdout.write(f'User {user.id} is already clean.')

        self.stdout.write(self.style.SUCCESS('Data cleaning complete.'))
