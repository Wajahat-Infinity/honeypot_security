from django.urls import path
from dashboard.views import AlertListView, AlertDetailView

urlpatterns = [
    path('', AlertListView.as_view(), name='alert_list'),
    path('<str:pk>/', AlertDetailView.as_view(), name='alert_detail'),
]