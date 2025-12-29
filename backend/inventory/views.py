from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from inventory.models import Product
from inventory.serializers import ProductSerializer
from inventory.utils import apply_search
from inventory.pagination import paginate_queryset



# LIST & CREATE (GET + POST)

@api_view(['GET', 'POST'])
def product_list_create(request):
    search_fields = ['name']

    # GET
    if request.method == 'GET':
        queryset = Product.objects.all().order_by('pk')
        queryset = apply_search(queryset, request, search_fields)
        return paginate_queryset(queryset, request, ProductSerializer)

    # POST
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Product created successfully", 
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )



# RETRIEVE, UPDATE, DELETE (GET + PUT + DELETE)

@api_view(['GET', 'PUT', 'DELETE'])
def product_update_delete(request, pk):
    product = get_object_or_404(Product, pk=pk)

    # GET (Retrieve single product)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # PUT
    if request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Product updated",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )
        return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

    # DELETE 
    if request.method == 'DELETE':
        product.delete()
        return Response(
            {"message": "Product deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
