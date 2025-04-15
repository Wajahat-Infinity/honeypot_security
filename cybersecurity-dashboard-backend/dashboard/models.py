from django.db import models
from django.utils import timezone
from accounts.models import User

class HoneypotType(models.TextChoices):
    HTTP = 'http', 'HTTP'
    FTP = 'ftp', 'FTP'
    SSH = 'ssh', 'SSH'
    SMTP = 'smtp', 'SMTP'
    TELNET = 'telnet', 'Telnet'
    MYSQL = 'mysql', 'MySQL'
    MSSQL = 'mssql', 'MS SQL'
    RDP = 'rdp', 'RDP'
    VNC = 'vnc', 'VNC'
    ELASTICSEARCH = 'elasticsearch', 'Elasticsearch'
    REDIS = 'redis', 'Redis'
    MEMCACHED = 'memcached', 'Memcached'
    MONGODB = 'mongodb', 'MongoDB'
    CUSTOM = 'custom', 'Custom'

class HoneypotStatus(models.TextChoices):
    ACTIVE = 'active', 'Active'
    WARNING = 'warning', 'Warning'
    INACTIVE = 'inactive', 'Inactive'

class Honeypot(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=HoneypotType.choices)
    status = models.CharField(max_length=20, choices=HoneypotStatus.choices, default=HoneypotStatus.ACTIVE)
    attacks = models.PositiveIntegerField(default=0)
    last_attack = models.DateTimeField(null=True, blank=True)
    ip_address = models.GenericIPAddressField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='honeypots')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.type})"
    
    def update_attack_count(self):
        self.attacks += 1
        self.last_attack = timezone.now()
        self.save()

class EventSeverity(models.TextChoices):
    LOW = 'low', 'Low'
    MEDIUM = 'medium', 'Medium'
    HIGH = 'high', 'High'
    CRITICAL = 'critical', 'Critical'

class EventStatus(models.TextChoices):
    OPEN = 'open', 'Open'
    INVESTIGATING = 'investigating', 'Investigating'
    RESOLVED = 'resolved', 'Resolved'

class SecurityEvent(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    event_type = models.CharField(max_length=100)
    source_ip = models.GenericIPAddressField()
    severity = models.CharField(max_length=20, choices=EventSeverity.choices)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=EventStatus.choices, default=EventStatus.OPEN)
    honeypot = models.ForeignKey(Honeypot, on_delete=models.SET_NULL, null=True, blank=True)
    detected_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f"{self.event_type} - {self.source_ip}"

class Alert(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=200)
    source = models.CharField(max_length=100)
    severity = models.CharField(max_length=20, choices=EventSeverity.choices)
    status = models.CharField(max_length=20, choices=EventStatus.choices, default=EventStatus.OPEN)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    related_event = models.ForeignKey(SecurityEvent, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.title

class ReportType(models.TextChoices):
    DAILY = 'daily', 'Daily'
    WEEKLY = 'weekly', 'Weekly'
    MONTHLY = 'monthly', 'Monthly'
    QUARTERLY = 'quarterly', 'Quarterly'
    YEARLY = 'yearly', 'Yearly'
    CUSTOM = 'custom', 'Custom'

class ReportFormat(models.TextChoices):
    PDF = 'pdf', 'PDF'
    CSV = 'csv', 'CSV'
    JSON = 'json', 'JSON'
    HTML = 'html', 'HTML'

class Report(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=ReportType.choices)
    date = models.DateField()
    format = models.CharField(max_length=20, choices=ReportFormat.choices)
    size = models.CharField(max_length=20)
    content = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class AttackData(models.Model):
    date = models.DateField(unique=True)
    attacks = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.date}: {self.attacks} attacks"

class SystemMetric(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    cpu_usage = models.FloatField()
    memory_usage = models.FloatField()
    network_load = models.FloatField()
    disk_io = models.FloatField()
    
    def __str__(self):
        return f"Metrics at {self.timestamp}"