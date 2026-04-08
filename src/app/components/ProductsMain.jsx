"use client";

import ProductsList from "./ProductsList";
import MiniCart from "./MiniCart";

const ProductsMain = ({ list }) => {
  return (
    // <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 [@media(min-width:1000px)]:grid-cols-4 gap-4">
    //   <div className="col-span-1 sm:col-span-2 md:col-span-3 [@media(min-width:1100px)]:col-span-3">
    //     <ProductsList list={list} />
    //   </div>

    //   <div className="hidden pt-20 [@media(min-width:1100px)]:block">
    //     <MiniCart />
    //   </div>
    // </div> one grid on monile, two on tablet, three on desktop, four on wide desktop
    /* two columns on mobile, four on wide desktop */
    <div className="grid grid-cols-1 [@media(min-width:1100px)]:grid-cols-4 gap-4">
      <div className="[@media(min-width:1100px)]:col-span-3">
        <ProductsList list={list} />
      </div>

      <div className="hidden pt-20 [@media(min-width:1100px)]:block">
        <MiniCart />
      </div>
    </div>
  );
};

export default ProductsMain;
