import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/ProductDetail.css";

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalPanel = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

export default function ProductDetail({ id, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        if (mounted) {
          setProduct(data);
          setImgIndex(0);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    return () => (mounted = false);
  }, [id]);

  if (!id) return null;

  return (
    <motion.div
      className="backdrop"
      variants={modalBackdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="modal"
        variants={modalPanel}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {loading ? (
          <div className="detail-loading">Loading...</div>
        ) : error ? (
          <div className="detail-error">Error: {error}</div>
        ) : product ? (
          <div className="detail-grid">
            <div className="gallery">
              {product.images && product.images.length > 0 ? (
                <>
                  <div className="main-image">
                    <img src={product.images[imgIndex]} alt={product.title} />
                  </div>
                  <div className="thumbs">
                    {product.images.map((src, i) => (
                      <button
                        key={i}
                        className={`thumb ${i === imgIndex ? "active-thumb" : ""}`}
                        onClick={() => setImgIndex(i)}
                      >
                        <img src={src} alt={`thumb-${i}`} />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-image">No image</div>
              )}
            </div>

            <div className="meta">
              <h2>{product.title}</h2>
              <p className="brand">Brand: {product.brand}</p>
              <p className="category">Category: {product.category}</p>
              <p className="price">₹{product.price}</p>
              <p className="rating">Rating: {product.rating} / 5</p>
              <p className="stock">Stock: {product.stock}</p>

              <h4>Description</h4>
              <p className="description">{product.description}</p>
            </div>
          </div>
        ) : (
          <div>No product data</div>
        )}
      </motion.div>
    </motion.div>
  );
}
