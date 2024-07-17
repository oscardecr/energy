import requests
from django.conf import settings

def send_receipt_via_whatsapp(user, plan, amount, expiration_date):
    whatsapp_api_url = 'https://graph.facebook.com/v13.0/your-whatsapp-business-account-id/messages'
    headers = {
        'Authorization': f'Bearer {settings.WHATSAPP_API_TOKEN}',
        'Content-Type': 'application/json'
    }
    message = {
        'messaging_product': 'whatsapp',
        'to': user.phone_number,
        'type': 'text',
        'text': {
            'body': f"Hola {user.first_name} {user.last_name},\n\n"
                    f"Su pago ha sido registrado exitosamente.\n"
                    f"Plan: {plan}\n"
                    f"Monto: ₡{amount}\n"
                    f"Expiración: {expiration_date}\n\n"
                    f"Gracias por ser parte de Energy Training Center."
        }
    }

    response = requests.post(whatsapp_api_url, headers=headers, json=message)
    if response.status_code != 200:
        print(f"Error sending WhatsApp message: {response.text}")
