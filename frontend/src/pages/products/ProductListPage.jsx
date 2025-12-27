import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  setSearch,
  setPage,
} from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Form,
  InputGroup,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";
import PaginationComponent from "../../components/project/Pagination";
import ConfirmDeleteModal from "../../components/project/ConfirmDeleteModal";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, count, loading, params } = useSelector(
    (state) => state.products
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts(params));
  }, [dispatch, params.page, params.search]);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(setPage(1));
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(selectedId));
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-danger">📦 Product Inventory</h3>

        <OverlayTrigger placement="left" overlay={<Tooltip>Add Product</Tooltip>}>
          <PlusCircle
            size={32}
            className="text-danger cursor-pointer"
            onClick={() => navigate("/products/new")}
          />
        </OverlayTrigger>
      </div>

      {/* Search */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <Search size={18} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search products..."
                  value={params.search}
                  onChange={handleSearch}
                  className="border-start-0"
                />
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5 text-muted">
              Loading products...
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover borderless className="align-middle">
                <thead className="bg-danger text-white">
                  <tr>
                    <th className="ps-4">Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th className="text-center pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    items.map((product) => (
                      <tr key={product.id} className="border-bottom">
                        <td className="ps-4 fw-semibold">
                          {product.name}
                        </td>
                        <td>₹{product.price}</td>
                        <td>{product.stock}</td>
                        <td className="text-center pe-4">
                          <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                            <Pencil
                              size={20}
                              className="text-primary mx-2 cursor-pointer"
                              onClick={() =>
                                navigate(`/products/${product.id}/edit`)
                              }
                            />
                          </OverlayTrigger>

                          <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                            <Trash2
                              size={20}
                              className="text-danger mx-2 cursor-pointer"
                              onClick={() => {
                                setSelectedId(product.id);
                                setShowModal(true);
                              }}
                            />
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Pagination */}
      <PaginationComponent
        count={count}
        page={params.page}
        pageSize={params.page_size}
        onPageChange={(p) => dispatch(setPage(p))}
      />

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductListPage;
