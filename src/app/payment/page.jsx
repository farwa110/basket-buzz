"use client";
import { useState } from "react";
import CardBox from "@/app/components/CardBox";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const CardImages = [
    { src: "/visacard.png", alt: "Visa" },
    { src: "/mastercard.png", alt: "Mastercard" },
    { src: "/mobilepay.webp", alt: "MobilePay" },
  ];

  const [paying, setPaying] = useState(false);
  const router = useRouter();
  const handlePayment = () => {
    setPaying(true);

    setTimeout(() => {
      setPaying(false);
      // later you can redirect to success page here
      router.push("/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Betaling</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Kontaktoplysninger</h2>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Fulde navn</label>
                <input type="text" placeholder="Fulde navn" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Telefonnummer</label>
                <input type="tel" placeholder="Telefonnummer" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Leveringsadresse</h2>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Adresse</label>
                <input type="text" placeholder="Adresse" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">By</label>
                  <input type="text" placeholder="By" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Postnummer</label>
                  <input type="text" placeholder="Postnummer" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Betaling</h2>

              <div className="flex gap-3 mb-2">
                {CardImages.map((image, index) => (
                  <span key={index} className="px-3 py-2 bg-gray-100 rounded-md border border-gray-200">
                    <Image src={image.src} alt={image.alt} width={36} height={24} />
                  </span>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Kortnummer</label>
                <input type="text" placeholder="Kortnummer" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">MM/YY</label>
                  <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">CVV</label>
                  <input type="text" placeholder="CVV" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>
              </div>
            </div>
            <button onClick={handlePayment} disabled={paying} className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center gap-2 w-full disabled:opacity-70">
              {paying ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Betal nu"}
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CardBox variant="payment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
