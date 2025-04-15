from django.urls import path
from dashboard.views import (
    DashboardSummaryView, 
    RecentActivityView, 
    AttackDataView, 
    SystemMetricsView,
    get_dashboard_stats,
    get_threats,
    get_vulnerabilities,
    get_honeypots,
    get_alerts,
    get_threat_map_data,
    get_vulnerability_map_data
)

urlpatterns = [
    path('summary/', DashboardSummaryView.as_view(), name='dashboard_summary'),
    path('activity/', RecentActivityView.as_view(), name='recent_activity'),
    path('stats/attacks/', AttackDataView.as_view(), name='attack_data'),
    path('stats/metrics/', SystemMetricsView.as_view(), name='system_metrics'),
    path('stats/', get_dashboard_stats, name='dashboard_stats'),
    path('threats/', get_threats, name='threats'),
    path('vulnerabilities/', get_vulnerabilities, name='vulnerabilities'),
    path('honeypots/', get_honeypots, name='honeypots'),
    path('alerts/', get_alerts, name='alerts'),
    path('threat-map/', get_threat_map_data, name='threat_map'),
    path('vulnerability-map/', get_vulnerability_map_data, name='vulnerability_map'),
]