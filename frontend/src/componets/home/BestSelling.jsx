import React from 'react'
// import ProductData from '../datas/productData'
// import { motion } from "framer-motion";
// import { Link } from 'react-router-dom';
// import ProductCarousel from './carousel/Carousel';
import Carousel from './Carousel';

function BestSelling() {
    return (
        <section className='w-full bg-light py-8'>
            <Carousel />
        </section>
    )
    // const products = ProductData.map((items) => (
    //     <div key={items.id} className=' bg-gray-bk w-full flex flex-col justify-center items-center gap-6' >
    //       <ProductCarousel 
    //         title={items.title}
    //         image={items.image}
    //         description={items.description}
    //         price={items.price}
    //       className=" container w-full m-3 flex overflow-x-scroll gap-2 mx-auto justify-center items-center"/>
    //     </div>
    //   ))

    //   return (
    //     <div  >
    //         <ProductCarousel products = {products} className=' bg-gray-bk w-full flex justify-center items-center ' />
    //     </div>
    //   )
}

export default BestSelling