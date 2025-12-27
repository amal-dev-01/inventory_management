from rest_framework import serializers
from inventory.models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"

    def validate_price(self, value):
        if value is None:
            raise serializers.ValidationError("Price is required.")

        if value < 0:
            raise serializers.ValidationError("Price must be zero or greater.")

        return value 