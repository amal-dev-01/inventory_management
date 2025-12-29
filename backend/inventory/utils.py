from django.db.models import Q


# Applies search filtering to a queryset based on ?search= query param
def apply_search(queryset, request, search_fields=None):
    search = request.query_params.get('search')
    if search and search_fields:
        q_obj = Q()
        for field in search_fields:
            q_obj |= Q(**{f"{field}__icontains": search})
        queryset = queryset.filter(q_obj)
    return queryset

