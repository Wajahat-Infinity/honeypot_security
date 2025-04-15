from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from datetime import timedelta
from django.utils import timezone
from dashboard.models import SecurityEvent, Honeypot

class AttackTrendsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Last 30 days attack trends
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=30)
        
        # Generate date range
        date_range = []
        current_date = start_date
        while current_date <= end_date:
            date_range.append(current_date)
            current_date += timedelta(days=1)
        
        # Get attack counts per day
        attack_counts = SecurityEvent.objects.filter(
            timestamp__date__gte=start_date,
            timestamp__date__lte=end_date
        ).extra({'date': "date(timestamp)"}).values('date').annotate(count=Count('id'))
        
        # Create a dictionary for quick lookup
        attack_dict = {item['date'].strftime('%Y-%m-%d'): item['count'] for item in attack_counts}
        
        # Prepare response data
        data = {
            'labels': [date.strftime('%Y-%m-%d') for date in date_range],
            'datasets': [{
                'label': 'Attacks',
                'data': [attack_dict.get(date.strftime('%Y-%m-%d'), 0) for date in date_range],
                'borderColor': '#f87979',
                'fill': False
            }]
        }
        
        return Response(data)

class AttackDistributionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Attack distribution by type
        distribution = SecurityEvent.objects.values('event_type').annotate(
            count=Count('id')
        ).order_by('-count')[:10]
        
        data = {
            'labels': [item['event_type'] for item in distribution],
            'datasets': [{
                'label': 'Attack Distribution',
                'data': [item['count'] for item in distribution],
                'backgroundColor': [
                    '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', 
                    '#9966ff', '#ff9f40', '#8ac249', '#d9e3f0',
                    '#f67019', '#f53794'
                ]
            }]
        }
        
        return Response(data)

class TopAttackersView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Top attackers by IP
        top_attackers = SecurityEvent.objects.values('source_ip').annotate(
            count=Count('id')
        ).order_by('-count')[:10]
        
        data = {
            'labels': [item['source_ip'] for item in top_attackers],
            'datasets': [{
                'label': 'Attack Count',
                'data': [item['count'] for item in top_attackers],
                'backgroundColor': '#36a2eb'
            }]
        }
        
        return Response(data)

class HoneypotStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Honeypot statistics
        honeypots = Honeypot.objects.all()
        total_honeypots = honeypots.count()
        active_honeypots = honeypots.filter(status='active').count()
        warning_honeypots = honeypots.filter(status='warning').count()
        inactive_honeypots = honeypots.filter(status='inactive').count()
        
        # Top honeypots by attacks
        top_honeypots = honeypots.order_by('-attacks')[:5]
        
        data = {
            'totalHoneypots': total_honeypots,
            'activeHoneypots': active_honeypots,
            'warningHoneypots': warning_honeypots,
            'inactiveHoneypots': inactive_honeypots,
            'topHoneypots': [
                {
                    'name': hp.name,
                    'type': hp.type,
                    'attacks': hp.attacks
                } for hp in top_honeypots
            ]
        }
        
        return Response(data)