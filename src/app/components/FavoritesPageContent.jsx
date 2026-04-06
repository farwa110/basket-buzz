"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useFavoritesStore } from "@/app/store/favoritesStore";
import { useCartStore } from "@/app/store/cartStore";

const FavoritesPageContent = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-700">Mine favoritter</h1>
        <p className="text-gray-500 mt-2">Her kan du se dine gemte produkter.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700">Du har ingen favoritter endnu</h2>
          <p className="text-gray-500 mt-3">Gem produkter som favoritter, så dukker de op her.</p>

          <Link href="/products" className="inline-block mt-6 bg-[#F27F3D] text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition">
            Gå til produkter
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-gray-100 shadow-2xl rounded-2xl flex flex-col overflow-hidden">
              <div className="relative w-full h-56 bg-white">
                <Image src={item.image} alt={item.title} fill className="object-contain p-4" />

                <button onClick={() => removeFavorite(item.id)} className="absolute top-3 right-3 bg-white p-3 rounded-full shadow hover:scale-110 transition">
                  <FaHeart className="text-red-500 text-lg" />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="h-14">
                  <h2 className="text-xl font-semibold text-gray-700 line-clamp-2">{item.title}</h2>
                </div>

                <div className="mt-4">
                  <span className="text-2xl font-bold text-[#F27F3D]">${Number(item.price).toFixed(2)}</span>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: Number(item.price),
                        quantity: 1,
                        image: item.image,
                      })
                    }
                    className="w-full bg-[#F27F3D] text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition"
                  >
                    Læg i kurv
                  </button>

                  <button onClick={() => removeFavorite(item.id)} className="w-full border border-red-300 text-red-500 font-semibold py-3 px-4 rounded-lg hover:bg-red-50 transition">
                    Fjern favorit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesPageContent;
