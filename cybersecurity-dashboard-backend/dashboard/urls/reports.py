from django.urls import path
from dashboard.views import ReportListView, ReportDetailView

urlpatterns = [
    path('', ReportListView.as_view(), name='report_list'),
    path('<str:pk>/', ReportDetailView.as_view(), name='report_detail'),
]