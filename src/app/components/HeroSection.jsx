import Image from "next/image";
import React from "react";

import image from "../assets/heropic.png";
import Button from "./Button";

const HeroSection = () => {
  return (
    // <section className="fullbleed">
    <section className="fullbleed">
      {/* Background Image */}
      <Image src={image} alt="Hero" fill className="object-cover block" priority />

      {/* Content on top */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white ">
        <div className="max-w-3xl px-4 text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold pb-15 opacity-0 translate-y-10 animate-fadeInUp font-lexend">Basket Buzz</h1>

          <h2 className="text-xl font-semibold text-gray-100  animate-fadeInUp font-lexend ">
            Fill your <span className="line-through text-gray-500">life</span> basket with our buzz items
          </h2>
          <Button className="mt-6" link="/products" />
        </div>
      </div>
    </section>
    // <section className="fullbleed min-h-[calc(100vh-80px)] relative ">
    //   <Image src={image} alt="Hero" fill className="object-cover" priority />

    //   <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white">
    //     <div className="max-w-3xl px-4 text-center">
    //       <h1 className="text-5xl sm:text-7xl font-extrabold pb-10">Buzz Basket</h1>

    //       <h2 className="text-xl font-semibold text-gray-100">
    //         Fill your <span className="line-through text-gray-500">life</span> basket with our buzz items
    //       </h2>

    //       <Button className="mt-6" link="/products" />
    //     </div>
    //   </div>
    // </section>
  );
};

export default HeroSection;
