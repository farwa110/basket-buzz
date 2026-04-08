"use client";

import { useState } from "react";
import CardBox from "@/app/components/CardBox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";

export default function PaymentPage() {
  const CardImages = [
    { src: "/visacard.png", alt: "Visa", className: "w-16" },
    { src: "/mastercard.png", alt: "Mastercard", className: "w-16" },
    { src: "/mobilepay.webp", alt: "MobilePay", className: "w-24" },
  ];

  const [paying, setPaying] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const isFormValid = formData.fullName.trim() && formData.email.trim() && formData.phone.trim() && formData.address.trim() && formData.city.trim() && formData.postalCode.trim();

  async function handlePayment() {
    if (cart.length === 0) {
      alert("Din kurv er tom.");
      return;
    }

    if (!isFormValid) {
      alert("Udfyld venligst alle felter.");
      return;
    }

    setPaying(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const total = cart.reduce((sum, item) => {
        return sum + (item.price || 0) * (item.quantity || 0);
      }, 0);

      const orderData = {
        customer: formData,
        orderNumber: `BB-${Date.now()}`,
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
      };

      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke sende ordrebekræftelse");
      }

      clearCart();

      router.push(`/success?email=${encodeURIComponent(formData.email)}&orderNumber=${orderData.orderNumber}`);
    } catch (error) {
      console.error(error);
      alert("Noget gik galt. Prøv igen.");
    } finally {
      setPaying(false);
    }
  }

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
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Fulde navn" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Telefonnummer</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefonnummer" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Leveringsadresse</h2>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Adresse</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">By</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="By" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Postnummer</label>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postnummer" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Betaling</h2>

              <div className="flex gap-3 mb-2">
                {CardImages.map((image, index) => (
                  <span key={index} className="w-28 h-20 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                    <Image src={image.src} alt={image.alt} width={80} height={40} className={`h-auto object-contain ${image.className}`} />
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">*This checkout flow is a visual prototype created for portfolio purposes. No real payment is processed.</p>

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

            {/* <button onClick={handlePayment} disabled={paying || cart.length === 0 || !isFormValid} className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed">
              Betal nu
            </button> */}
            <button onClick={handlePayment} disabled={paying || cart.length === 0 || !isFormValid} className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]">
              {paying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Behandler...
                </>
              ) : (
                "Betal nu"
              )}
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
