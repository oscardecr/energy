from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializer import UserSerializer
from .admin_registration_serializer import AdminRegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .models import Visit
from datetime import datetime, timedelta
from django.utils.timezone import now
from finance.models import Payment
from .utils import send_receipt_via_whatsapp

@api_view(['POST'])
def register_user(request):
    data = request.data.copy()  # Make a copy of the data
    if not data.get('password'):
        data['password'] = None  # Set password to None if not provided

    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)  # Log errors for debugging
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_admin(request):
    serializer = AdminRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        admin_user = serializer.save()
        return Response(UserSerializer(admin_user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register_visit(request):
    national_id = request.data.get('national_id')
    if not national_id:
        return Response({'error': 'Se requiere la cédula de identidad.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(national_id=national_id)
        if user.membership_expiration < datetime.today().date():
            return Response({'error': 'La membresía ha expirado. Por favor renueve su membresía.'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    visit = Visit.objects.create(user=user)
    return Response({'message': f'Visita registrada exitosamente. Bienvenido(a): {user.first_name}'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def expired_memberships(request):
    expired_users = User.objects.filter(membership_expiration__lt=now())
    serializer = UserSerializer(expired_users, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def recent_visits(request):
    time_threshold = now() - timedelta(hours=1, minutes=15)
    recent_visits = Visit.objects.filter(timestamp__gte=time_threshold)
    users = User.objects.filter(id__in=recent_visits.values_list('user_id', flat=True))
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def register_payment(request):
    user_id = request.data.get('user_id')
    plan = request.data.get('plan')
    amount = request.data.get('amount')
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    today = datetime.today().date()
    if plan in ['Regular', 'Familiar', 'Colegial', 'Cortesía']:
        new_expiration = today + timedelta(days=31)
    elif plan == 'Quincena':
        new_expiration = today + timedelta(days=15)
    elif plan == 'Semanal':
        new_expiration = today + timedelta(days=8)
    elif plan == 'Sesion':
        new_expiration = today + timedelta(days=1)
    else:
        return Response({'error': 'El plan no es válido.'}, status=status.HTTP_400_BAD_REQUEST)
    
    payment = Payment.objects.create(user=user, plan=plan, amount=amount, membership_expiration=new_expiration)
    user.membership_expiration = new_expiration
    user.plan_type = plan
    user.save()

    # Send receipt via WhatsApp
    send_receipt_via_whatsapp(user, plan, amount, new_expiration)
    
    return Response({'message': 'Pago registrado exitosamente.', 'new_expiration': new_expiration}, status=status.HTTP_200_OK)