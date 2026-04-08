"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

import { useFavoritesStore } from "@/app/store/favoritesStore";
import { useCartStore } from "@/app/store/cartStore";

const renderStars = (rating) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i + 1 <= rating) {
      stars.push(<FaStar key={i} className="text-[#F27F3D] h-6 w-6" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-[#F27F3D] h-6 w-6" />);
    }
  }

  return stars;
};

const ProductCard = (props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favorites.some((item) => item.id === props.id);

  const discountAmount = (props.price * props.discount) / 100;
  const discountedPrice = props.price - discountAmount;
  const [isAdding, setIsAdding] = useState(false);
  return (
    <li className="bg-gray-100 shadow-2xl rounded-2xl flex flex-col h-full overflow-hidden">
      <Link href={`/products/${props.id}`} className="flex flex-col flex-1">
        <div className="relative w-full h-50 bg-white">
          <Image src={props.img} alt={props.title} width={500} height={300} className="w-full h-50 object-cover" />

          <span className="absolute top-2 left-2 inline-block bg-red-100 text-red-900 text-xs font-semibold px-2 py-1 rounded-full">{`${props.discount} % off`}</span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite({
                id: props.id,
                title: props.title,
                price: props.price,
                image: props.img,
              });
            }}
            className="absolute top-2 right-2 z-20 text-xl bg-white p-2 rounded-full shadow hover:scale-110 transition"
          >
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          {/* Title area */}
          <div className="h-16">
            <h1 className="text-gray-600 font-semibold font-poppins line-clamp-2 text-[20px] leading-tight">{props.title}</h1>
          </div>

          {/* Badge row: always same height, but no huge gap */}
          <div className="h-8 mt-1">
            {props.rating >= 4 ? (
              <span className="inline-flex items-center gap-1 bg-[#F27F3D] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Highly Rated <FaStar className="text-white h-3 w-3" />
              </span>
            ) : (
              <span className="invisible inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full">Placeholder</span>
            )}
          </div>

          {/* Price */}
          <div className="mt-3 flex flex-col">
            <span className="text-sm line-through text-gray-500 font-poppins font-semibold">{`$${props.price}`}</span>
            <span className="font-semibold text-[#F27F3D] font-poppins text-[22px] leading-tight">{`$${discountedPrice.toFixed(2)}`}</span>
          </div>

          {/* Stars */}
          <h3 className="flex mt-5">{renderStars(props.rating)}</h3>
        </div>
      </Link>

      {/* Button always stays aligned at bottom */}

      <div className="p-4 pt-0">
        <button
          onClick={() => {
            setIsAdding(true);

            setTimeout(() => {
              addToCart({
                id: props.id,
                title: props.title,
                price: parseFloat(discountedPrice.toFixed(2)),
                quantity: 1,
                discountPercentage: props.discount,
                image: props.img,
              });

              setIsAdding(false);
            }, 600); // fake delay for UX
          }}
          disabled={isAdding}
          className="bg-[#F27F3D] rounded-lg text-white font-bold py-2 px-4 hover:bg-orange-600 transition duration-300 ease-in-out w-full flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isAdding ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Tilføjer...
            </>
          ) : (
            "Læg i kurv"
          )}
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
