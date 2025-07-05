import { Product } from "@/types";
import Link from "next/link";
import homeIcon from '../../../../public/casa.png'
import Image from 'next/image';

interface ProductsDetailsPageProps {
    params: { id: string }


}

async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    return data
}


export default async function ProductDetailPage({ params }: ProductsDetailsPageProps) {

    const product = await getProduct(params.id)

    return (
        <main className="w-full h-[calc(100vh)] md:h-[calc(100vh-72px)] flex items-center flex-col md:flex-row justify-center">
            <div key={product.id} className="flex items-center justify-around text-center rounded-2xl bg-white text-gray-700 p-4 hover-translateY duration-300  w-[20rem] md:w-[60rem] h-[20rem auto] md:h-[40rem] -mt-30 md:mt-0">
                <div className="h-full flex flex-col items-center w-[50%]">
                    <img src={product.image} alt={product.title} className="h-[90%]" />

                    <h3 className="text-s font-bold md:text-xl mt-5">{product.title}</h3>

                </div>



                <div className="flex flex-col h-full w-80 justify-center md:w-80 ml-5 md:ml-0">
                    <div className="flex flex-col items-center h-[10rem auto]">
                        <h1 className="text-2xl md:text-2xl">Description</h1>
                        <p className="text-justify text-xs ">
                            {product.description}
                        </p>
                    </div>


                    <div className="justify-self-center mt-auto md:mt-5">
                        <p className="font-bold line-through text-2xl md:text-3xl text-red-600">
                            {(product.price + 5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="font-bold text-2xl md:text-3xl">
                            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <button className="bg-amber-400 mt-2 p-3 md:p-3 w-full text-lg md:text-3xl rounded-2xl hover-spacing-color-btn duration-300">Comprar produto</button>
                    </div>



                </div>

            </div>

        </main>
    )
}