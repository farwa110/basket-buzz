// components/ProductSkeleton.jsx
const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded-lg"></div>
    </div>
  );
};

export default ProductSkeleton;
