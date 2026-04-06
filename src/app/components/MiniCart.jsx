"use client";

import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";

const MiniCart = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart
    .reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="sticky top-28">
      <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-gray-600 text-center mb-6">Kurv</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Kurven er tom.</p>
        ) : (
          <>
            <div className="space-y-4 text-center">
              <p className="text-lg font-medium text-gray-700">{totalItems} varer</p>

              <p className="text-2xl font-bold text-black">Total: {totalPrice} kr</p>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/payment" className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out">
                Gå til betaling
              </Link>
            </div>
            <button onClick={clearCart} className="mt-4 text-sm text-gray-500 hover:text-red-500 transition">
              Tøm kurv
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
