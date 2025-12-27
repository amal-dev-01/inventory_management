import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProduct,
  updateProduct,
  clearSelected,
} from "../../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { FaSave, FaArrowLeft, FaEdit } from "react-icons/fa";

const ProductFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selected, loading } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);

  useEffect(() => {
    if (id) dispatch(getProduct(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  useEffect(() => {
    if (selected && id) {
      setFormData({
        name: selected.name,
        price: selected.price,
        stock: selected.stock,
      });
    }
  }, [selected, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    try {
      if (id) {
        await dispatch(updateProduct({ id, data: formData })).unwrap();
      } else {
        await dispatch(createProduct(formData)).unwrap();
      }
      navigate("/");
    } 
    // catch (err) {
    //   setErrors(err || {});
    //   setGeneralError("Failed to save product.");
    // }
    catch (err) {
      if (err && typeof err === "object" && err.errors) {
        setErrors(err.errors); 
      } else {
        setGeneralError("Failed to save product.");
      }
    }

  };

  return (
    <div className="d-flex justify-content-center py-4">
      <Card className="shadow-lg border-0 w-50">
        <Card.Header className="bg-danger text-white text-center fw-bold">
          {id ? (
            <>
              <FaEdit className="me-2" /> Edit Product
            </>
          ) : (
            <>
              <FaSave className="me-2" /> Add Product
            </>
          )}
        </Card.Header>

        <Card.Body>
          {generalError && <Alert variant="danger">{generalError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <small className="text-danger">{errors.name[0]}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              {errors.price && (
                <small className="text-danger">{errors.price[0]}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
              {errors.stock && (
                <small className="text-danger">{errors.stock[0]}</small>
              )}
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/")}
              >
                <FaArrowLeft className="me-2" />
                Back
              </Button>

              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" /> Save
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductFormPage;
