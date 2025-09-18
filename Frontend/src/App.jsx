import React from "react";
import Product from "./pages/Product";
import "./App.css";

export default function App() {
  return (
    <div>
      <header className="app-header">
        <h1>Product Showcase Explorer</h1>
      </header>
      <main>
        <Product />
      </main>
    </div>
  );
}
