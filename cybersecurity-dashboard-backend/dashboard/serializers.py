from rest_framework import serializers
from .models import (
    Honeypot, 
    SecurityEvent, 
    Alert, 
    Report, 
    AttackData, 
    SystemMetric
)
from accounts.serializers import UserSerializer

class HoneypotSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    last_attack = serializers.SerializerMethodField()
    
    class Meta:
        model = Honeypot
        fields = '__all__'
    
    def get_last_attack(self, obj):
        if obj.last_attack:
            return obj.last_attack.strftime('%Y-%m-%d %H:%M:%S')
        return None

class SecurityEventSerializer(serializers.ModelSerializer):
    honeypot = HoneypotSerializer(read_only=True)
    detected_by = UserSerializer(read_only=True)
    timestamp = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    
    class Meta:
        model = SecurityEvent
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    related_event = SecurityEventSerializer(read_only=True)
    timestamp = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    
    class Meta:
        model = Alert
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    date = serializers.DateField(format='%Y-%m-%d')
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    
    class Meta:
        model = Report
        fields = '__all__'

class AttackDataSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format='%Y-%m-%d')
    
    class Meta:
        model = AttackData
        fields = '__all__'

class SystemMetricSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    
    class Meta:
        model = SystemMetric
        fields = '__all__'