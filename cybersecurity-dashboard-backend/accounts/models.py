from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class UserRole(models.TextChoices):
    DASHBOARD = 'dashboard', _('Dashboard User')
    COCKPIT = 'cockpit', _('Cockpit User')

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(_('name'), max_length=255)
    role = models.CharField(
        _('role'), 
        max_length=20, 
        choices=UserRole.choices, 
        default=UserRole.DASHBOARD
    )
    avatar = models.ImageField(
        _('avatar'), 
        upload_to='avatars/', 
        null=True, 
        blank=True
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username']
    
    def __str__(self):
        return self.email
    
    def is_dashboard_user(self):
        return self.role == UserRole.DASHBOARD
    
    def is_cockpit_user(self):
        return self.role == UserRole.COCKPIT