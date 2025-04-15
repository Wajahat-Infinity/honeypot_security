from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Honeypot, 
    SecurityEvent, 
    Alert, 
    Report, 
    AttackData, 
    SystemMetric
)
from .serializers import (
    HoneypotSerializer,
    SecurityEventSerializer,
    AlertSerializer,
    ReportSerializer,
    AttackDataSerializer,
    SystemMetricSerializer
)
from accounts.permissions import IsCockpitUser, IsOwnerOrAdmin
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .fake_data import FakeDataGenerator
import random

class HoneypotListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Honeypot.objects.all()
    serializer_class = HoneypotSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['type', 'status']
    search_fields = ['name', 'ip_address']
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class HoneypotDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    queryset = Honeypot.objects.all()
    serializer_class = HoneypotSerializer

class SecurityEventListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = SecurityEvent.objects.all().order_by('-timestamp')
    serializer_class = SecurityEventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['event_type', 'severity', 'status']
    search_fields = ['source_ip', 'description']
    
    def perform_create(self, serializer):
        serializer.save(detected_by=self.request.user)

class SecurityEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = SecurityEvent.objects.all()
    serializer_class = SecurityEventSerializer

class AlertListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Alert.objects.all().order_by('-timestamp')
    serializer_class = AlertSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['severity', 'status']
    search_fields = ['title', 'description']
    
    def perform_create(self, serializer):
        alert = serializer.save()
        
        # Send WebSocket notification
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "alerts",
            {
                'type': 'new_alert',
                'alert': {
                    'id': alert.id,
                    'title': alert.title,
                    'severity': alert.severity,
                    'timestamp': alert.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                    'description': alert.description
                }
            }
        )

class AlertDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

class ReportListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReportSerializer
    
    def get_queryset(self):
        if self.request.user.is_superuser or self.request.user.is_cockpit_user():
            return Report.objects.all().order_by('-created_at')
        return Report.objects.filter(created_by=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ReportDetailView(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        total_attacks = SecurityEvent.objects.count()
        active_honeypots = Honeypot.objects.filter(status='active').count()
        critical_alerts = Alert.objects.filter(severity='critical', status='open').count()
        unique_attackers = SecurityEvent.objects.values('source_ip').distinct().count()
        
        data = {
            'totalAttacks': total_attacks,
            'activeHoneypots': active_honeypots,
            'criticalAlerts': critical_alerts,
            'uniqueAttackers': unique_attackers,
            'securityStatus': 'Protected' if critical_alerts < 5 else 'Warning',
            'lastScan': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        return Response(data)

class RecentActivityView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        events = SecurityEvent.objects.all().order_by('-timestamp')[:5]
        alerts = Alert.objects.all().order_by('-timestamp')[:5]
        
        event_serializer = SecurityEventSerializer(events, many=True)
        alert_serializer = AlertSerializer(alerts, many=True)
        
        data = {
            'events': event_serializer.data,
            'alerts': alert_serializer.data
        }
        
        return Response(data)

class AttackDataView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AttackData.objects.all().order_by('date')
    serializer_class = AttackDataSerializer
    
    def get_queryset(self):
        # Get last 30 days data by default
        queryset = super().get_queryset()
        days = self.request.query_params.get('days', 30)
        start_date = timezone.now().date() - timedelta(days=int(days))
        return queryset.filter(date__gte=start_date)

class SystemMetricsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsCockpitUser]
    queryset = SystemMetric.objects.all().order_by('-timestamp')[:100]
    serializer_class = SystemMetricSerializer

fake_data = FakeDataGenerator()

@api_view(['GET'])
def get_dashboard_stats(request):
    return Response(fake_data.generate_dashboard_stats())

@api_view(['GET'])
def get_threats(request):
    count = int(request.GET.get('count', 10))
    threats = [fake_data.generate_threat() for _ in range(count)]
    return Response(threats)

@api_view(['GET'])
def get_vulnerabilities(request):
    count = int(request.GET.get('count', 10))
    vulnerabilities = [fake_data.generate_vulnerability() for _ in range(count)]
    return Response(vulnerabilities)

@api_view(['GET'])
def get_honeypots(request):
    count = int(request.GET.get('count', 5))
    honeypots = [fake_data.generate_honeypot_data() for _ in range(count)]
    return Response(honeypots)

@api_view(['GET'])
def get_alerts(request):
    count = int(request.GET.get('count', 10))
    alerts = [fake_data.generate_alert() for _ in range(count)]
    return Response(alerts)

@api_view(['GET'])
def get_threat_map_data(request):
    threats = [fake_data.generate_threat() for _ in range(20)]
    return Response(threats)

@api_view(['GET'])
def get_vulnerability_map_data(request):
    vulnerabilities = [fake_data.generate_vulnerability() for _ in range(15)]
    return Response(vulnerabilities)