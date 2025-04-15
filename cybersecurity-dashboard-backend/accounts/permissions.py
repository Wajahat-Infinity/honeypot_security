from rest_framework import permissions

class IsCockpitUser(permissions.BasePermission):
    message = 'Only cockpit users can access this resource.'
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'cockpit'

class IsDashboardUser(permissions.BasePermission):
    message = 'Only dashboard users can access this resource.'
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'dashboard'

class IsOwnerOrAdmin(permissions.BasePermission):
    message = 'Only the owner or admin can access this resource.'
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        
        if hasattr(obj, 'created_by'):
            return obj.created_by == request.user
        
        if hasattr(obj, 'user'):
            return obj.user == request.user
        
        return False