import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/AdminLayout";

/* PRODUCTS */
import ProductListPage from "../pages/products/ProductListPage";
import ProductFormPage from "../pages/products/ProductFormPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>

      <Route
        path="/"
        element={
            <DashboardLayout>
              <ProductListPage />
            </DashboardLayout>
            }
      />
      <Route
        path="/products/new"
        element={
            <DashboardLayout>
              <ProductFormPage />
            </DashboardLayout>
            }
      />

      <Route
        path="/products/:id/edit"
        element={
            <DashboardLayout>
              <ProductFormPage />
            </DashboardLayout>
            }
      />

      <Route path="*" element={<div>404 | Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
