from models import User

# Create a superuser
User.objects.create_superuser(
    national_id='test',
    first_name='test',
    last_name='test',
    password='test',
    membership_expiration='2030-01-01',  # Set a future expiration date
    date_born='1990-01-01',
    emergency_contact='test'
)

# Verify the user
user_exists = User.objects.filter(national_id='123456789').exists()
print('Admin user created:', user_exists)
