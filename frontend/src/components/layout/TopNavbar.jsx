import { Navbar, Button } from "react-bootstrap";
import { Menu } from "lucide-react";

const TopNavbar = ({ toggleSidebar }) => (
  <Navbar
    bg="white"
    className="shadow-sm px-3 py-2 border-bottom sticky-top d-flex justify-content-between align-items-center"
  >
    <Button
      variant="outline-danger"
      className="d-lg-none me-2 border-0 bg-danger bg-opacity-10 rounded-circle"
      onClick={toggleSidebar}
    >
      <Menu size={20} />
    </Button>

    <Navbar.Brand className="fw-semibold text-danger fs-5 mb-0">
      Product Inventory
    </Navbar.Brand>
  </Navbar>
);

export default TopNavbar;
