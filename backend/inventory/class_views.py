from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from inventory.mixins import SearchMixin
from inventory.models import Product
from inventory.serializers import ProductSerializer


# Product CRUD
class ProductListCreateAPIView(APIView, SearchMixin):
    """
    Handles:
    - GET: Retrieve all products
    - POST: Create product
    """

    search_fields = ['name','price', 'stock']

    def get_queryset(self):
        return Product.objects.all()

    # GET
    def get(self, request):
        try:
            queryset = self.get_queryset()
            queryset = self.apply_search(queryset, request)
            return self.paginate(queryset, request, ProductSerializer)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    # POST
    def post(self, request):
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



class ProductRetrieveUpdateDeleteAPIView(APIView):

    """
    Handles:
    - GET: Retrieve product
    - PUT: Update product
    - DELETE: Delete product
    """

    def get_object(self, pk):
        return get_object_or_404(Product, pk=pk)
    
    # GET
    def get(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # PUT
    def put(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Product updated", 
                    "data": serializer.data
                }
            )
        return Response(
            {"errors": serializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    # DELETE
    def delete(self, request, pk):
        product = self.get_object(pk)
        product.delete()
        return Response(
            {"detail": "Product deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )

