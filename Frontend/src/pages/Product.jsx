import React, { useEffect, useState, useMemo } from "react";
import "../styles/Product.css";
import Pagination from "../components/Pagination";
import ProductDetail from "../components/ProductDetail";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";

const PRODUCTS_API = "https://dummyjson.com/products";
const CATEGORIES_API = "https://dummyjson.com/products/categories";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const Product = () => {
  const [products, setProducts] = useState([]); // master list
  const [filtered, setFiltered] = useState([]); // filtered + sorted
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState(""); // asc/desc/title-az/title-za
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // detail modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // get a reasonably large list (dummyjson default 30; we ask up to 100)
        const res = await fetch(`${PRODUCTS_API}?limit=100`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
        setFiltered(data.products || []);

        // categories
        const catRes = await fetch(CATEGORIES_API);
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        const catData = await catRes.json();
        setCategories(["all", ...catData]);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // compute filtered list whenever dependencies change
  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // sorting
    if (selectedSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "title-az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "title-za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, selectedCategory, selectedSort, products]);

  // pagination slices
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.max(1, Math.ceil(filtered.length / productsPerPage));

  // handlers
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedSort("");
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading products…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search products, brand or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters-row">
          <select 
  value={selectedCategory} 
  onChange={handleCategoryChange} 
  className="select"
>
  <option key="all" value="all">
    All Categories
  </option>
  {categories.map((c, index) => (
  <option key={`${c.slug}-${index}`} value={c.slug}>
    {c.name}
  </option>
))}

</select>


          <select value={selectedSort} onChange={handleSortChange} className="select">
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title-az">Title: A → Z</option>
            <option value="title-za">Title: Z → A</option>
          </select>

          <button className="clear-btn" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>

      <section className="products-area">
        {filtered.length === 0 ? (
          <div className="no-results">No products match your search/filters.</div>
        ) : (
          <motion.div
            className="products-container"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                >
                  <Card
                    data={product}
                    onOpen={() => setSelectedProduct(product.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            id={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Product;
