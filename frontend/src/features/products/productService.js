import api from "../../services/api";

const productAPI = {

  // List products (pagination, filters)
  list: async (params = {}) => {
    const response = await api.get("/products/", { params });
    return response.data;
  },

  // Get single product
  get: async (id) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  // Create product
  create: async (data) => {
    const response = await api.post("/products/", data);
    return response.data;
  },

  // Update product
  update: async (id, data) => {
    const response = await api.put(`/products/${id}/`, data);
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await api.delete(`/products/${id}/`);
    return response.data;
  },

  // Search products
  search: async (searchText, params = {}) => {
    const response = await api.get("/products/", {
      params: {
        search: searchText,
      },
    });
    return response.data;
  },
};

export default productAPI;
