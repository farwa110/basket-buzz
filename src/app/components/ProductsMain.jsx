// import MiniCart from "./MiniCart";
import ProductsList from "./ProductsList";
import MiniCart from "./MiniCart";

const ProductsMain = ({ data, list, setList }) => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 [@media(min-width:1000px)]:grid-cols-4 gap-4">
      <div className="col-span-1 sm:col-span-2 md:col-span-3 [@media(min-width:1100px)]:col-span-3">
        <ProductsList data={data} list={list} setList={setList} />
      </div>

      {/* <div className=" px-5 hidden pt-0 [@media(min-width:1100px)]:block">
        <CardBox />
      </div> */}
      <div className=" hidden pt-0 [@media(min-width:1100px)]:block">
        <MiniCart />
      </div>
    </div>
  );
};

export default ProductsMain;
