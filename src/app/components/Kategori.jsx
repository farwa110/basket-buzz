// "use client";
// import { useRouter } from "next/navigation";

// const Kategori = ({ data }) => {
//   const router = useRouter();

//   function changeFilter(e) {
//     router.push(`/products?category=${e.target.value}`);
//   }
//   return (
//     <form className="w-full max-w-xs sm:max-w-sm md:max-w-md" action="/products">
//       <select className=" w-full min-w-[140px] flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-[#F27F3D] font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 transition" onChange={changeFilter} name="category" id="category-select">
//         <option value="">All Categories</option>
//         {data.map((cat) => {
//           return (
//             <option key={cat.slug} value={cat.slug}>
//               {cat.name}
//             </option>
//           );
//         })}
//       </select>
//     </form>
//   );
// };

// export default Kategori;

"use client";

import { useRouter } from "next/navigation";

const Kategori = ({ data }) => {
  const router = useRouter();

  function changeFilter(e) {
    router.push(`/products?category=${e.target.value}`);
  }

  return (
    <div className="w-full lg:w-[320px]">
      <select onChange={changeFilter} name="category" id="category-select" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[#F27F3D] font-semibold shadow-sm focus:outline-none hover:bg-gray-100 transition">
        <option value="">All Categories</option>
        {data.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Kategori;
