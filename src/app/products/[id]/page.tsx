import { Product } from "@/types";
import Link from "next/link";

interface ProductsDetailsPageProps {
    params: { id: string }


}

async function gerProduct(id: number): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)

    const resposta = !response.ok ? (() => { throw new Error("Falha na busca de produtos") })() : await response.json()

    return await resposta
}


export default async function ProductDetailPage({ params }: ProductsDetailsPageProps) {
    return (
        <div>
            <Link href='/'>Back to Home</Link>
        </div>
    )
}