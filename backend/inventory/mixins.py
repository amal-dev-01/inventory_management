from django.db.models import Q
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class SearchMixin:
    """
    mixin for search and pagination in APIView.
    """
    search_fields = []
    pagination_class = StandardResultsSetPagination


    def apply_search(self, queryset, request):
        search = request.query_params.get('search')
        if search and self.search_fields:
            q_obj = Q()
            for field in self.search_fields:
                q_obj |= Q(**{f"{field}__icontains": search})
            queryset = queryset.filter(q_obj)
        return queryset


    def paginate(self, queryset, request, serializer_class):
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)