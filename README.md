# 📦 Product Inventory Management System

A full-stack product inventory management application built with **React**, **Redux**, **React-Bootstrap**, and **Django REST Framework**. This app allows users to **create, update, delete, and list products** with details like name, price, and stock.  
---

## ✨ Features

- ➕ **Product Management** - Create, read, update, and delete products
- 📋 **Paginated List View** - Browse products efficiently with pagination
- ✅ **Form Validation** - Real-time input validation with error messages
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔄 **State Management** - Centralized state with Redux Toolkit
- 🚀 **RESTful API** - Clean and scalable Django REST Framework backend

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Redux Toolkit** - State management
- **React Router DOM v6** - Client-side routing
- **React-Bootstrap** - UI components
- **React Icons** - Icon library
- **Vite** - Fast build tool

### Backend
- **Django 4+** - Python web framework
- **Django REST Framework** - API toolkit
- **SQLite** - Default database (can be replaced with PostgreSQL)
- **django-cors-headers** - CORS handling

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **npm** or **yarn**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inventory-management.git
   cd inventory-management/backend
   ```

2. **Create a virtual environment**
   ```bash
   # Linux/macOS
   python -m venv venv
   source venv/bin/activate

   # Windows
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (optional)
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Frontend will be available at `http://localhost:5173`

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products/` | GET | List all products (supports pagination & search) |
| `/api/products/` | POST | Create a new product |
| `/api/products/:id/` | GET | Retrieve a single product |
| `/api/products/:id/` | PUT | Update a product |
| `/api/products/:id/` | DELETE | Delete a product |

### Example Request

**Create a product:**
```bash
curl -X POST http://localhost:8000/api/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "stock": 50
   }'
```
---

📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ✨ Author

**Amal Dev MP**

- 📧 Email: devmpamal@gmail.com
- 🌐 GitHub: [@amal-dev-01](https://github.com/amal-dev-01)
---
