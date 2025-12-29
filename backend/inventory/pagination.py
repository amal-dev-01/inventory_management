from rest_framework.pagination import PageNumberPagination


# Paginates the queryset and returns a paginated response
def paginate_queryset(queryset, request, serializer_class):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginator.page_size_query_param = 'page_size'
    paginator.max_page_size = 100

    result_page = paginator.paginate_queryset(queryset, request)
    serializer = serializer_class(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
