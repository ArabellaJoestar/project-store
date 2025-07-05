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
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16  font-[family-name:var(--font-geist-sans)] bg-gray-900">
      <h1 className="text-[50px]">Produtos</h1>

      <div className="grid grid-cols-1 grid-flow-row gap-5 md:grid-cols-3">
        {
          products.map((product) => (
            <div key={product.id} className="flex items-center justify-center flex-col rounded-2xl bg-white text-gray-700 p-4 text-center hover-translateY duration-300">
              <img src={product.image} alt={product.title} className="h-36" />

              
              <div className="mt-auto">
                <h3 className="text-xs">{product.title}</h3>
                <p>
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
                              <Link href={`/products/${product.id}`} className="bg-amber-400 mt-5 p-2 w-full text-xl rounded-2xl hover-spacing-shadow-btn duration-300">
                  Ver detalhes</Link>
            </div>
          ))}


      </div>
    </div>
  );
}
