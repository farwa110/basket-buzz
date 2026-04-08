"use client";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const ProductsList = ({ list, loading }) => {
  return (
    <div className=" mt-20">
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{loading ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />) : list.map((item) => <ProductCard key={item.id} id={item.id} title={item.title} rating={item.rating} price={item.price} discount={item.discountPercentage} img={item.images[0]} />)}</ul>
    </div>
  );
};

export default ProductsList;

// // "use client";
// // import Link from "next/link";
// // import { IoCartOutline } from "react-icons/io5";
// // import ProductCard from "./ProductCard";
// // import { useState } from "react";

// // const ProductsList = ({ data, list, setList }) => {
// //   function sortPrice() {
// //     setList((prev) => prev.toSorted((b, a) => a["price"] - b["price"]));
// //   }

// //   return (
// //     <div className="col-span-2 md:col-span-3 mt-20">
// //       <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {data.map((item) => {
// //           return <ProductCard key={item.id} id={item.id} title={item.title} rating={item.rating} price={item.price} discount={item.discountPercentage} img={item.images[0]} />;
// //         })}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default ProductsList;

// "use client";

// import ProductCard from "./ProductCard";

// const ProductsList = ({ list }) => {
//   return (
//     <div className="col-span-2 md:col-span-3 mt-20">
//       {/* one columns on mobile, four on wide desktop */}
//       {/* <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
//       {/* two columns on mobile, four on wide desktop below */}
//       <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {list.map((item) => {
//           return <ProductCard key={item.id} id={item.id} title={item.title} rating={item.rating} price={item.price} discount={item.discountPercentage} img={item.images[0]} />;
//         })}
//       </ul>
//     </div>
//   );
// };

// export default ProductsList;
