import React from "react";
import "../styles/Card.css";
import { motion } from "framer-motion";

const Card = ({ data, onOpen }) => {
  // pick primary image (dummyjson uses thumbnails and images array)
  const image = data.thumbnail || (data.images && data.images[0]) || "";

  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onOpen(); }}
    >
      <div className="card-media">
        <img src={image} alt={data.title} loading="lazy" />
      </div>
      <div className="card-body">
        <h4 className="card-title">{data.title}</h4>
        <p className="card-price">₹{data.price}</p>
      </div>
    </motion.div>
  );
};

export default Card;
