import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
from .models import Alert, SystemMetric

class AlertConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("alerts", self.channel_name)
        
        # Send initial alerts
        alerts = await self.get_recent_alerts()
        await self.send(text_data=json.dumps({
            'type': 'initial_alerts',
            'alerts': alerts
        }))
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("alerts", self.channel_name)
    
    async def receive(self, text_data):
        pass  # Not expecting any input from client
    
    async def new_alert(self, event):
        await self.send(text_data=json.dumps(event))
    
    @database_sync_to_async
    def get_recent_alerts(self):
        alerts = Alert.objects.order_by('-timestamp')[:5]
        return [{
            'id': alert.id,
            'title': alert.title,
            'severity': alert.severity,
            'timestamp': alert.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'description': alert.description
        } for alert in alerts]

class MetricConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("metrics", self.channel_name)
        
        # Send initial metrics
        metrics = await self.get_recent_metrics()
        await self.send(text_data=json.dumps({
            'type': 'initial_metrics',
            'metrics': metrics
        }))
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("metrics", self.channel_name)
    
    async def receive(self, text_data):
        pass  # Not expecting any input from client
    
    async def new_metric(self, event):
        await self.send(text_data=json.dumps(event))
    
    @database_sync_to_async
    def get_recent_metrics(self):
        metrics = SystemMetric.objects.order_by('-timestamp')[:1]
        if metrics:
            metric = metrics[0]
            return {
                'cpu_usage': metric.cpu_usage,
                'memory_usage': metric.memory_usage,
                'network_load': metric.network_load,
                'disk_io': metric.disk_io,
                'timestamp': metric.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            }
        return None