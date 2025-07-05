"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import Link from "next/link";

async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) throw new Error("Falha na busca de produtos");
  return await response.json();
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
      setCategories(new Set(data.map((p) => p.category)));
    }

    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-900">
      <div className="flex items-center justify-around h-40 flex-col bg-blue-600 p-4 rounded-2xl">
        <h2 className="text-4xl">Filter Category</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-blue-950 border-none outline-none p-2 text-xl rounded-2xl text-center"
        >
          <option value="All">All</option>
          {Array.from(categories).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-[50px]">Products</h1>

      <div className="grid grid-cols-1 grid-flow-row gap-5 md:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-center flex-col rounded-2xl bg-white text-gray-700 p-4 text-center hover-translateY duration-300"
          >
            <img src={product.image} alt={product.title} className="h-36" />
            <div className="mt-auto">
              <h3 className="text-xs">{product.title}</h3>
              <p>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <Link
              href={`/products/${product.id}`}
              className="bg-amber-400 mt-5 p-2 w-full text-xl rounded-2xl hover-spacing-shadow-btn duration-300"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
