from django.urls import path
from inventory import views


urlpatterns = [
    path(
        'products/', 
         views.ProductListCreateAPIView.as_view(),
         name="product_list_create"
         ),

    path(
        "products/<int:pk>/",
        views.ProductRetrieveUpdateDeleteAPIView.as_view(),
        name="product_update_delete"
    )

]
