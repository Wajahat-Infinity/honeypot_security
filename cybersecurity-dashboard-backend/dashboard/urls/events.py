from django.urls import path
from dashboard.views import SecurityEventListView, SecurityEventDetailView

urlpatterns = [
    path('', SecurityEventListView.as_view(), name='security_event_list'),
    path('<str:pk>/', SecurityEventDetailView.as_view(), name='security_event_detail'),
]