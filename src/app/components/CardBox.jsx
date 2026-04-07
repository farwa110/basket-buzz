"use client";

import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { IoTrashOutline } from "react-icons/io5";

const CardBox = ({ variant = "sidebar" }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [paying, setPaying] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQty = useCartStore((state) => state.updateQty);

  const totalPrice = cart
    .reduce((sum, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return sum + itemTotal;
    }, 0)
    .toFixed(2);

  const handleAdd = (item) => {
    setLoadingId(item.id);

    setTimeout(() => {
      addToCart({
        ...item,
        quantity: 1,
      });
      setLoadingId(null);
    }, 400);
  };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      window.location.href = "/payment";
    }, 700);
  };

  const isSidebar = variant === "sidebar";
  const isPayment = variant === "payment";

  return (
    <div className={isSidebar ? "sticky top-28 flex justify-center" : "mt-10 flex justify-center px-4"}>
      <div className={isSidebar ? "border-2 border-gray-300 rounded-2xl p-6 bg-white shadow-2xl w-full max-w-sm" : "border-2 border-gray-300 rounded-2xl p-6 sm:p-8 md:p-10 bg-white shadow-2xl w-full max-w-4xl"}>
        <h1 className={isSidebar ? "text-3xl font-semibold text-gray-600 mb-8 text-center" : "text-4xl font-semibold text-gray-600 mb-8 text-center"}>Betaling</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Kurven er tom.</p>
        ) : (
          <>
            <ul className="text-gray-800 divide-y divide-gray-300">
              {cart.map((item) => (
                <li key={item.id} className="py-5">
                  <div className="flex gap-4 items-start">
                    <img src={item.image} alt={item.title} className={isSidebar ? "w-20 h-20 object-contain rounded-lg bg-gray-100 p-2 border" : "w-24 h-24 object-contain rounded-lg bg-gray-100 p-2 border"} />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-medium text-lg leading-snug break-words">{item.title}</h2>

                        <div className="font-semibold text-lg whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} kr</div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center border-2 border-yellow-400 rounded-full px-4 py-1 gap-4 w-fit justify-center">
                          {item.quantity > 1 ? (
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="text-xl text-gray-700 font-bold">
                              -
                            </button>
                          ) : (
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                              <IoTrashOutline size={20} />
                            </button>
                          )}

                          <span className="text-lg font-semibold">{item.quantity}</span>

                          <button onClick={() => handleAdd(item)} className="text-xl text-gray-700 font-bold" disabled={loadingId === item.id}>
                            {loadingId === item.id ? <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" /> : "+"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={isSidebar ? "mt-8 font-bold text-center text-2xl" : "mt-8 font-bold text-right text-2xl"}>Total: {totalPrice} kr</div>
            {/* 
            <div className={isSidebar ? "mt-10 flex justify-center" : "mt-10 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-6"}>
              <button onClick={handlePay} disabled={paying} className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center gap-2">
                {paying ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Betal nu"}
              </button>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default CardBox;
