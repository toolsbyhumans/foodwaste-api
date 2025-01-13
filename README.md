# 🍎 **Food-Waste-API**  
The backend API for **FoodShare**, designed to connect food suppliers with charities to reduce food waste and tackle food insecurity. Built using **NestJS**, **TypeORM**, and **PostgreSQL**, this API provides robust, scalable endpoints for managing the application's core functionalities.

---

## 🛠️ **Tech Stack**
- **Framework**: [NestJS](https://nestjs.com/)  
- **Database**: [PostgreSQL](https://www.postgresql.org/)  
- **ORM**: [TypeORM](https://typeorm.io/)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Testing**: [Jest](https://jestjs.io/)

---

## 📋 **Overview of the API**

The **Food-Waste-API** supports the following key features:

### ✅ Core Functionalities:
1. **Supplier Management**:
   - Register and manage food suppliers.
   - List surplus food items.
   - Track requests from charities.

2. **Charity Management**:
   - Register and manage charity organizations.
   - Browse and request available surplus food.
   - Track the status of requests.

3. **Admin Capabilities**:
   - Manage users (suppliers and charities).
   - Monitor food requests and deliveries.
   - Oversee system health and resolve disputes.

4. **Matching System**:
   - Automatically match food suppliers with nearby charities based on proximity and needs.

5. **Delivery Tracking**:
   - Enable real-time tracking of deliveries for transparency.

---

## 📦 **Entities and Relationships**

The API consists of the following primary entities:

### **1. User**
- Represents both suppliers and charity users.
- **Attributes**:
  - `id`: Unique identifier.
  - `name`: Full name of the user.
  - `email`: Contact email.
  - `password`: Hashed password.
  - `role`: Supplier or Charity.
  - `created_at`: Timestamp.
  - `updated_at`: Timestamp.

### **2. Supplier**
- Extends the `User` entity for food suppliers.
- **Attributes**:
  - `organization_name`: Name of the supplier’s organization.
  - `address`: Location details.
  - `phone`: Contact number.
  - `available_items`: Relation to surplus food items.

### **3. Charity**
- Extends the `User` entity for charity users.
- **Attributes**:
  - `organization_name`: Name of the charity organization.
  - `address`: Location details.
  - `phone`: Contact number.
  - `requested_items`: Relation to food requests.

### **4. FoodItem**
- Represents surplus food listed by suppliers.
- **Attributes**:
  - `id`: Unique identifier.
  - `name`: Name of the food item.
  - `quantity`: Available quantity.
  - `expiry_date`: Expiration date of the food.
  - `supplier_id`: Reference to the supplier.

### **5. FoodRequest**
- Represents a request made by a charity for specific food items.
- **Attributes**:
  - `id`: Unique identifier.
  - `charity_id`: Reference to the charity.
  - `food_item_id`: Reference to the requested food item.
  - `quantity_requested`: Amount requested by the charity.
  - `status`: Pending, Approved, or Delivered.

### **6. Delivery**
- Tracks the delivery process for approved requests.
- **Attributes**:
  - `id`: Unique identifier.
  - `food_request_id`: Reference to the food request.
  - `status`: In Progress, Completed, Failed.
  - `delivery_date`: Date of delivery.

---

## 🚀 **Getting Started**

### Prerequisites:
- Install [Node.js](https://nodejs.org/).
- Install [PostgreSQL](https://www.postgresql.org/).
- Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

### Clone the Repository:
```bash
git clone https://github.com/your-username/food-waste-api.git
cd food-waste-api
```

### Install the required dependencies
```bash
npm install
```

### Setup Environment Variables
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=food_waste_db
JWT_SECRET=your_jwt_secret
PORT=3000
```
