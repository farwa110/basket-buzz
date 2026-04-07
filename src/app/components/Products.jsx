"use client";

import Kategori from "./Kategori";
import ProductsMain from "./ProductsMain";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSlidersH } from "react-icons/fa";

const Products = ({ datacat, dataprod, activeCat }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "relevant";

  const [list, setList] = useState([]);
  const [sortOption, setSortOption] = useState(currentSort);

  function getSortedList(products, value) {
    const sortedList = [...products];

    switch (value) {
      case "price-low":
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedList.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedList.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        sortedList.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case "relevant":
      default:
        sortedList.sort((a, b) => a.id - b.id);
        break;
    }

    return sortedList;
  }

  useEffect(() => {
    setSortOption(currentSort);
    setList(getSortedList(dataprod.products, currentSort));
  }, [dataprod.products, currentSort]);

  function handleSort(value) {
    setSortOption(value);
    setList(getSortedList(dataprod.products, value));

    const params = new URLSearchParams(searchParams.toString());

    if (activeCat) {
      params.set("category", activeCat);
    }

    if (value === "relevant") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.replace(`?${params.toString()}`);
  }

  return (
    <div>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Kategori data={datacat} />

        <div className="w-full lg:w-auto">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaSlidersH className="text-[#F27F3D]" />
            Sort by
          </label>

          <select value={sortOption} onChange={(e) => handleSort(e.target.value)} className="w-full lg:w-[240px] rounded-md border border-gray-300 bg-white px-4 py-3 text-[#F27F3D] font-semibold shadow-sm outline-none cursor-pointer">
            <option value="relevant">Relevant</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <ProductsMain list={list} />
    </div>
  );
};

export default Products;
