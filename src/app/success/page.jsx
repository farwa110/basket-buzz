"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const orderNumber = searchParams.get("orderNumber");

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6 sm:px-4 py-8">
      <div className="w-full rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center animate-fade-in-up bg-white shadow-xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-[#F27F3D] text-7xl" />
        </div>

        <p className="text-sm sm:text-base font-semibold text-[#F27F3D] uppercase tracking-wide mb-3">Betaling overført</p>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">Ordre er gennemført</h1>

        <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Tak for din bestilling. Din betaling er gennemført, og vi har sendt en ordrebekræftelse til <span className="font-semibold">{email}</span>.
        </p>

        {orderNumber && <p className="mt-4 text-gray-700 font-medium">Ordrenummer: {orderNumber}</p>}

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5 text-left w-full max-w-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Hvad sker der nu?</h2>

          <div className="space-y-2 text-gray-600">
            <p>• Din ordre er modtaget</p>
            <p>• Betalingen er registreret</p>
            <p>• Vi klargør din bestilling til levering</p>
            <p>• Du modtager din kvittering på email</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="bg-[#F27F3D] text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition">
            Fortsæt shopping
          </Link>

          <Link href="/" className="border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
            Gå til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
}
