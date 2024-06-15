from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializer import UserSerializer, PaymentSerializer
from .registration_serializer import UserRegistrationSerializer
from .admin_registration_serializer import AdminRegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .models import Visit
from rest_framework.decorators import action
from datetime import datetime, timedelta

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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
        return Response({'error': 'National ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(national_id=national_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    visit = Visit.objects.create(user=user)
    return Response({'message': 'Visit registered successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def register_payment(request):
    user_id = request.data.get('user_id')
    plan = request.data.get('plan')
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    today = datetime.today().date()
    if plan in ['mes', 'familiar', 'colegial']:
        new_expiration = today + timedelta(days=30)
    elif plan == 'quincena':
        new_expiration = today + timedelta(days=15)
    elif plan == 'semanal':
        new_expiration = today + timedelta(days=8)
    elif plan == 'sesion':
        new_expiration = today + timedelta(days=1)
    else:
        return Response({'error': 'Invalid plan'}, status=status.HTTP_400_BAD_REQUEST)
    
    user.membership_expiration = new_expiration
    user.save()
    
    return Response({'message': 'Payment registered successfully', 'new_expiration': new_expiration}, status=status.HTTP_200_OK)