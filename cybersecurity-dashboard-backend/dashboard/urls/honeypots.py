from django.urls import path
from dashboard.views import HoneypotListView, HoneypotDetailView

urlpatterns = [
    path('', HoneypotListView.as_view(), name='honeypot_list'),
    path('<str:pk>/', HoneypotDetailView.as_view(), name='honeypot_detail'),
]