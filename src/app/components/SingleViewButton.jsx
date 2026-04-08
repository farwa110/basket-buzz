"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/app/store/cartStore";

const SingleButton = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);

  if (!product) return null;

  const discountAmount = (product.price * product.discount) / 100;
  const discountedPrice = product.price - discountAmount;

  useEffect(() => {
    const cartItem = cart.find((item) => item.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cart, product]);

  const handleAdd = () => {
    if (quantity > 0) {
      updateQty(product.id, quantity + 1);
    } else {
      addToCart({
        id: product.id,
        title: product.title,
        price: parseFloat(discountedPrice.toFixed(2)),
        quantity: 1,
        discountPercentage: product.discount,
        image: product.thumbnail,
      });
    }
  };

  const handleRemove = () => {
    if (quantity > 1) {
      updateQty(product.id, quantity - 1);
    } else if (quantity === 1) {
      removeFromCart(product.id);
    }
  };

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      addToCart({
        id: product.id,
        title: product.title,
        price: parseFloat(discountedPrice.toFixed(2)),
        quantity: 1,
        discountPercentage: product.discount,
        image: product.thumbnail,
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <button onClick={handleRemove} disabled={quantity === 0} className={`text-xl px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 ${quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
          –
        </button>

        <span className="text-lg font-semibold">{quantity}</span>

        <button onClick={handleAdd} disabled={quantity >= 99} className={`text-xl px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 ${quantity >= 99 ? "opacity-50 cursor-not-allowed" : ""}`}>
          +
        </button>
      </div>

      <button onClick={handleAddToCart} disabled={loading} className="flex items-center justify-center gap-2 bg-[#F27F3D] rounded-lg text-white font-bold py-2 px-6 hover:bg-orange-600 transition duration-300 ease-in-out mt-4 min-w-[180px]">
        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin" /> : "Læg i kurv"}
      </button>
    </div>
  );
};

export default SingleButton;
