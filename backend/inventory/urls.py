from django.urls import path
from inventory import views


urlpatterns = [

    path(
        'products/', 
         views.product_list_create,
         name='product_list_create'
         ),
    path(
        'products/<int:pk>/',
        views.product_update_delete,
        name='product_update_delete'
        )
        
]
