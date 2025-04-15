from django.urls import path
from analytics.views import (
    AttackTrendsView,
    AttackDistributionView,
    TopAttackersView,
    HoneypotStatsView
)

urlpatterns = [
    path('attacks/', AttackTrendsView.as_view(), name='attack_trends'),
    path('distribution/', AttackDistributionView.as_view(), name='attack_distribution'),
    path('attackers/', TopAttackersView.as_view(), name='top_attackers'),
    path('honeypot-stats/', HoneypotStatsView.as_view(), name='honeypot_stats'),
]