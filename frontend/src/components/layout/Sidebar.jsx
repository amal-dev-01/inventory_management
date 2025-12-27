import { useState, useEffect } from "react";
import { Nav, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import "../../assets/styles/global.css";
import "../../assets/styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Persist sidebar open/collapse state
  const [isOpen, setIsOpen] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarOpen")) ?? true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const menuItems = [
    {
      path: "/",
      label: "Products",
      icon: LayoutDashboard,
      activePaths: ["/"], 
    },
  ];

  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  const handleNavigation = (path, submenu) => {
    if (submenu) return;
    navigate(path);
    if (window.innerWidth < 992) setIsOpen(false);
  };

  const isMenuItemActive = (item) => {
    return (
      item.activePaths?.some((p) => location.pathname.startsWith(p)) ||
      location.pathname === item.path
    );
  };

  return (
    <div
      className={`sidebar d-flex flex-column ${isOpen ? "open" : "collapsed"}`}
      style={{
        background: "linear-gradient(180deg, #d90429 0%, #ef233c 100%)",
        color: "#fff",
        minHeight: "100vh",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Header */}
      <div className="sidebar-header d-flex align-items-center justify-content-between px-3 py-3 border-bottom border-danger-subtle">
        {isOpen && (
          <div className="d-flex align-items-center">
            <div
              className="logo-circle me-2 d-flex align-items-center justify-content-center"
              style={{
                background: "rgba(255,255,255,0.2)",
                width: 35,
                height: 35,
                borderRadius: "50%",
                fontWeight: "bold",
              }}
            >
              A
            </div>
            <div>
              <h5 className="m-0 fw-bold text-white">Admin Panel</h5>
              <small className="text-light opacity-75">v1.1.0</small>
            </div>
          </div>
        )}
        <Button
          variant="light"
          className="toggle-btn border-0 rounded-circle"
          style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      {/* Menu */}
      <Nav className="flex-column flex-grow-1 px-2 mt-2">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = isMenuItemActive(item);
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const showSub = hasSubmenu && activeSubmenu === idx;

          return (
            <div key={item.path} className="sidebar-item">
              <OverlayTrigger
                placement="right"
                overlay={!isOpen ? renderTooltip(item.label) : <></>}
              >
                <div
                  className={`nav-link d-flex align-items-center rounded px-3 py-2 mb-1 ${
                    isActive ? "bg-white text-danger" : "text-white"
                  }`}
                  style={{
                    cursor: "pointer",
                    transition: "background 0.3s, color 0.3s",
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                  onClick={() => {
                    if (hasSubmenu) setActiveSubmenu(showSub ? null : idx);
                    else handleNavigation(item.path);
                  }}
                >
                  <Icon size={20} className={isActive ? "text-danger" : "text-white"} />
                  {isOpen && <span className="ms-3 flex-grow-1">{item.label}</span>}
                  {item.badge && isOpen && (
                    <Badge bg="light" text="danger" className="ms-auto">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </OverlayTrigger>

              {isOpen && hasSubmenu && showSub && (
                <div className="submenu ms-4 mb-2">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className={`submenu-link d-block px-3 py-2 rounded ${
                        location.pathname === sub.path ? "bg-white text-danger" : "text-white-75"
                      }`}
                      style={{ textDecoration: "none", transition: "0.2s" }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
