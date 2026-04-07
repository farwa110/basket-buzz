// import React from "react";

// const Footer = () => {
//   return (
//     <div className="w-full">
//       <footer className="fixed bottom-0 left-0 w-full text-center text-m text-gray-700 py-4 z-50 bg-white">&copy; {new Date().getFullYear()} BuzzBasket. All rights reserved.</footer>
//     </div>
//   );
// };

// export default Footer;

// import React from "react";

// const Footer = () => {
//   return <footer className="w-full text-center text-m text-gray-700 py-4 bg-white">&copy; {new Date().getFullYear()} BuzzBasket. All rights reserved.</footer>;
// };

// export default Footer;
import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-[#F27F3D] mb-3">BuzzBasket</h3>
            <p className="text-gray-500">Din online shop for kvalitetsprodukter til gode priser.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Shop</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link href="/products" className="hover:text-[#F27F3D]">
                  Alle produkter
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-[#F27F3D]">
                  Favoritter
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-[#F27F3D]">
                  Kurv
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Support</h4>
            <ul className="space-y-2 text-gray-500">
              <li>Kontakt os</li>
              <li>Levering</li>
              <li>Returnering</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Følg os</h4>
            <div className="flex gap-4 text-xl text-gray-500">
              <FaFacebook className="hover:text-[#F27F3D] cursor-pointer transition" />
              <FaInstagram className="hover:text-[#F27F3D] cursor-pointer transition" />
              <FaTwitter className="hover:text-[#F27F3D] cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">© {new Date().getFullYear()} BuzzBasket. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
