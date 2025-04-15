"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import (
    LoginView, 
    LogoutView, 
    RegisterView, 
    UserProfileView,
    UserListView,
    UserDetailView,
    ChangePasswordView
)
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Cybersecurity Dashboard API",
      default_version='v1',
      description="API for Cybersecurity Dashboard",
      terms_of_service="https://www.example.com/terms/",
      contact=openapi.Contact(email="contact@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/user/', UserProfileView.as_view(), name='user_profile'),
    path('api/auth/change-password/', ChangePasswordView.as_view(), name='change_password'),
    
    # Users
    path('api/users/', UserListView.as_view(), name='user_list'),
    path('api/users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    
    # Dashboard
    path('api/dashboard/', include('dashboard.urls.dashboard')),
    path('api/honeypots/', include('dashboard.urls.honeypots')),
    path('api/events/', include('dashboard.urls.events')),
    path('api/alerts/', include('dashboard.urls.alerts')),
    path('api/reports/', include('dashboard.urls.reports')),
    
    # Analytics
    path('api/analytics/', include('analytics.urls')),
    
    # Documentation URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Include websocket routing if needed
# from channels.routing import ProtocolTypeRouter, URLRouter
# application = ProtocolTypeRouter({
#     "websocket": URLRouter([
#         # Your websocket routes here
#     ]),
# })