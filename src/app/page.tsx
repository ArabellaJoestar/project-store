import { Product } from "@/types"
import Link from "next/link"
async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://fakestoreapi.com/products')

  const resposta = !response.ok ? (() => { throw new Error("Falha na busca de produtos") })() : await response.json()

  return await resposta
}

export default async function Home() {
  const products = await getProducts()
  console.log(products)

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-[50px]">Produtos</h1>

    <div className="grid grid-cols-3 grid-flow-row gap-5">
      {
        products.map((product) => (
          <div key={product.id} className="flex items-center justify-center flex-col border-4 border-black rounded-2xl bg-gray-800 text-gray-600 p-4 text-center">
            <img src={product.image} alt={product.title} className="h-36"/>
            <h3>{product.title}</h3>
            <p>
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>

            <Link href={`/products/${product.id}`} className="text-white">
              Ver detalhes</Link>
          </div>
        ))}


    </div>
  </div>
  );
}
