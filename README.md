# 🛍️ Product Showcase Explorer

A **responsive web application** built with React (Vite) that fetches products from the [DummyJSON API](https://dummyjson.com/products), and lets users browse, filter, sort, and view detailed product information. Smooth animations are implemented using **Framer Motion**.

---
## 🔗 Live Demo

👉 [View Live Demo](https://product-view-hcry.vercel.app/) 

---

## ✨ Features

- **Fetch & Display Products**  
  - Products loaded from [DummyJSON Products API](https://dummyjson.com/products).  
  - Responsive grid of product cards showing image, title, and price.  
  - Pagination support with `limit` and `skip`.

- **Product Detail View**  
  - Click on a product to see details in a modal.  
  - Shows description, rating, stock, brand, category, and multiple images.  

- **Filtering**  
  - Fetch categories from API and filter products by category.  

- **Sorting**  
  - Sort products by **price (Low → High / High → Low)** and **title (A–Z / Z–A)**.  

- **Animations (Framer Motion)**  
  - Smooth fade/slide-in animation for product cards.  
  - Transition when opening/closing product details.  
  - Micro-interactions like hover effects on cards.  

- **User Experience**  
  - Loading spinners while fetching data.  
  - Error handling with friendly messages.  
  - Fully responsive (mobile, tablet, desktop).  

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite  
- **Language:** JavaScript / JSX  
- **Styling:** Tailwind CSS (custom CSS optional)  
- **Animations:** Framer Motion  
- **API Calls:** Fetch API / Axios  
- **Deployment:** Vercel  

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/product-showcase-explorer.git
   cd product-showcase-explorer
## 2.Install dependencies

npm install


## 3.Run locally

npm run dev


## 4.Build for production

npm run build


## 5.Preview production build

npm run preview

---
📂 Project Structure
Frontend/
├── src/
│   ├── components/
│   │   ├── Pagination.jsx
│   │   └── Card.jsx
│   ├── pages/
│   │   └── Product.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── README.md

---
## 🚀 Deployment

This project is optimized for Vercel deployment.
Just push your code to GitHub and import the repo into Vercel.
