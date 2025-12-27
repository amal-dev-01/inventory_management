from django.contrib import admin
from inventory.models import Product

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'price', 'stock')
    search_fields = ( 'name', 'price', 'stock')
    list_filter = ( 'name', 'price', 'stock')
