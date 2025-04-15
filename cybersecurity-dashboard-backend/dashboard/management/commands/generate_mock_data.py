from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
import random
from faker import Faker
from accounts.models import User
from dashboard.models import (
    Honeypot, 
    SecurityEvent, 
    Alert, 
    Report, 
    AttackData, 
    SystemMetric
)

fake = Faker()

class Command(BaseCommand):
    help = 'Generates mock data for the cybersecurity dashboard'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--users',
            type=int,
            default=5,
            help='Number of users to create'
        )
        parser.add_argument(
            '--honeypots',
            type=int,
            default=10,
            help='Number of honeypots to create'
        )
        parser.add_argument(
            '--events',
            type=int,
            default=100,
            help='Number of security events to create'
        )
        parser.add_argument(
            '--days',
            type=int,
            default=30,
            help='Number of days to generate data for'
        )
    
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating mock data...'))
        
        # Create admin user if not exists
        if not User.objects.filter(email='admin@example.com').exists():
            admin = User.objects.create_superuser(
                email='admin@example.com',
                name='Admin User',
                role='cockpit',
                username='admin',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS(f'Created admin user: {admin.email}'))
        
        # Create regular users
        num_users = options['users']
        for i in range(num_users):
            role = random.choice(['dashboard', 'cockpit'])
            email = f'user{i}@example.com'
            if not User.objects.filter(email=email).exists():
                user = User.objects.create_user(
                    email=email,
                    name=fake.name(),
                    role=role,
                    username=f'user{i}',
                    password='password123'
                )
                self.stdout.write(self.style.SUCCESS(f'Created user: {user.email} (role: {user.role})'))
        
        # Get all users
        users = User.objects.all()
        
        # Create honeypots
        honeypot_types = [choice[0] for choice in Honeypot.HoneypotType.choices]
        statuses = [choice[0] for choice in Honeypot.HoneypotStatus.choices]
        
        num_honeypots = options['honeypots']
        for i in range(num_honeypots):
            honeypot = Honeypot.objects.create(
                id=f'hp-{i}',
                name=f'{fake.word().capitalize()} {random.choice(["Server", "Node", "Trap", "Decoy"])}',
                type=random.choice(honeypot_types),
                status=random.choice(statuses),
                attacks=random.randint(0, 500),
                ip_address=fake.ipv4(),
                created_by=random.choice(users)
            )
            self.stdout.write(self.style.SUCCESS(f'Created honeypot: {honeypot.name}'))
        
        # Get all honeypots
        honeypots = Honeypot.objects.all()
        
        # Create security events and alerts
        event_types = [
            'Brute Force Attack', 'SQL Injection', 'XSS Attempt', 
            'DDoS Attack', 'Port Scan', 'Malware Upload',
            'Credential Stuffing', 'Phishing Attempt', 'RCE Attempt'
        ]
        severities = [choice[0] for choice in SecurityEvent.EventSeverity.choices]
        statuses = [choice[0] for choice in SecurityEvent.EventStatus.choices]
        
        num_events = options['events']
        for i in range(num_events):
            days_ago = random.randint(0, options['days'])
            timestamp = timezone.now() - timedelta(days=days_ago)
            
            event = SecurityEvent.objects.create(
                id=f'ev-{i}',
                timestamp=timestamp,
                event_type=random.choice(event_types),
                source_ip=fake.ipv4(),
                severity=random.choices(
                    severities,
                    weights=[0.3, 0.4, 0.2, 0.1]  # More medium, fewer critical
                )[0],
                description=fake.text(),
                status=random.choice(statuses),
                honeypot=random.choice(honeypots) if random.random() > 0.3 else None,
                detected_by=random.choice(users)
            )
            
            # Create alert for some events
            if random.random() > 0.5:
                Alert.objects.create(
                    id=f'al-{i}',
                    title=f'{event.event_type} detected',
                    source=event.honeypot.name if event.honeypot else 'System',
                    severity=event.severity,
                    status=event.status,
                    timestamp=event.timestamp,
                    description=event.description,
                    related_event=event
                )
            
            self.stdout.write(self.style.SUCCESS(f'Created security event: {event.event_type}'))
        
        # Create attack data for last N days
        for day in range(options['days']):
            date = timezone.now().date() - timedelta(days=day)
            attacks = random.randint(0, 50)
            AttackData.objects.create(
                date=date,
                attacks=attacks
            )
            self.stdout.write(self.style.SUCCESS(f'Created attack data for {date}: {attacks} attacks'))
        
        # Create system metrics (last 24 hours)
        for hour in range(24):
            timestamp = timezone.now() - timedelta(hours=hour)
            SystemMetric.objects.create(
                timestamp=timestamp,
                cpu_usage=random.uniform(5, 95),
                memory_usage=random.uniform(10, 90),
                network_load=random.uniform(1, 100),
                disk_io=random.uniform(5, 80)
            )
            self.stdout.write(self.style.SUCCESS(f'Created system metric for {timestamp}'))
        
        # Create some reports
        report_types = [choice[0] for choice in Report.ReportType.choices]
        report_formats = [choice[0] for choice in Report.ReportFormat.choices]
        
        for i in range(5):
            report = Report.objects.create(
                id=f'rep-{i}',
                name=f'{random.choice(["Daily", "Weekly", "Monthly"])} Security Report',
                type=random.choice(report_types),
                date=timezone.now().date() - timedelta(days=random.randint(0, 30)),
                format=random.choice(report_formats),
                size=f'{random.randint(1, 10)}MB',
                content=fake.json(),
                created_by=random.choice(users)
            )
            self.stdout.write(self.style.SUCCESS(f'Created report: {report.name}'))
        
        self.stdout.write(self.style.SUCCESS('Successfully generated mock data!'))