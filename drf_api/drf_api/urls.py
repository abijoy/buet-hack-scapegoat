from django.contrib import admin
from django.urls import path, include
from notes.views import GetNoteView, CreateNoteView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('all-notes/', GetNoteView.as_view(), name='get'),
    path('create-note/', CreateNoteView.as_view(), name='post'),
    path('api/token/', obtain_auth_token, name='obetain-token'),
]
