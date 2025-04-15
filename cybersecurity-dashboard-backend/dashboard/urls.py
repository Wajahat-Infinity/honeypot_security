from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/stats/', views.get_dashboard_stats, name='dashboard-stats'),
    path('threats/', views.get_threats, name='threats'),
    path('vulnerabilities/', views.get_vulnerabilities, name='vulnerabilities'),
    path('honeypots/', views.get_honeypots, name='honeypots'),
    path('alerts/', views.get_alerts, name='alerts'),
    path('threat-map-data/', views.get_threat_map_data, name='threat-map-data'),
    path('vulnerability-map-data/', views.get_vulnerability_map_data, name='vulnerability-map-data'),
    # ... existing code ...
] 