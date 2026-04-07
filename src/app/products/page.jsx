import Products from "../components/Products";

export default async function Page({ searchParams }) {
  const { category } = await searchParams;

  const datacat = await fetch("https://dummyjson.com/products/categories");
  const categories = await datacat.json();

  const data = category ? await fetch(`https://dummyjson.com/products/category/${category}?limit=50`) : await fetch("https://dummyjson.com/products?limit=50");

  const products = await data.json();

  return (
    <main>
      <Products datacat={categories} dataprod={products} activeCat={category} />
    </main>
  );
}
