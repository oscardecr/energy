from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Class
from .serializer import ClassSerializer
from datetime import datetime

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

    def list(self, request, *args, **kwargs):
        date = request.query_params.get('date')
        if date:
            try:
                date = datetime.strptime(date, '%Y-%m-%d').date()
                self.queryset = self.queryset.filter(day=date)
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
