"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";

const MiniCart = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleGoToPayment = () => {
    setIsLoading(true);

    setTimeout(() => {
      router.push("/payment");
    }, 500);
  };

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
              <button onClick={handleGoToPayment} disabled={isLoading} className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center gap-2 disabled:opacity-70 min-w-[180px]">
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Indlæser...
                  </>
                ) : (
                  "Gå til betaling"
                )}
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500 transition">
                Tøm kurv
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniCart;

// "use client";

// import Link from "next/link";
// import { useCartStore } from "@/app/store/cartStore";
// // import { useRouter } from "next/navigation";
// // import { useState } from "react";

// // const router = useRouter();
// // const [isLoading, setIsLoading] = useState(false);

// const MiniCart = () => {
//   const cart = useCartStore((state) => state.cart);
//   const clearCart = useCartStore((state) => state.clearCart);

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   const totalPrice = cart
//     .reduce((sum, item) => {
//       return sum + item.price * item.quantity;
//     }, 0)
//     .toFixed(2);

//   return (
//     <div className="sticky top-28">
//       <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
//         <h2 className="text-3xl font-semibold text-gray-600 text-center mb-6">Kurv</h2>

//         {cart.length === 0 ? (
//           <p className="text-center text-gray-500">Kurven er tom.</p>
//         ) : (
//           <>
//             <div className="space-y-4 text-center">
//               <p className="text-lg font-medium text-gray-700">{totalItems} varer</p>

//               <p className="text-2xl font-bold text-black">Total: {totalPrice} kr</p>
//             </div>

//             <div className="mt-8 flex justify-center">
//               <Link href="/payment" className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out">
//                 Gå til betaling
//               </Link>
//             </div>
//             {/* <div className="mt-8 flex justify-center">
//               <button
//                 onClick={() => {
//                   setIsLoading(true);

//                   setTimeout(() => {
//                     router.push("/payment");
//                   }, 600); // small UX delay
//                 }}
//                 disabled={isLoading}
//                 className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center gap-2 disabled:opacity-70"
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                     Loader...
//                   </>
//                 ) : (
//                   "Gå til betaling"
//                 )}
//               </button>
//             </div> */}
//             <button onClick={clearCart} className="mt-4 text-sm text-gray-500 hover:text-red-500 transition">
//               Tøm kurv
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MiniCart;
