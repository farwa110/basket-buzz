export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 sm:px-4 py-8">
      <div className="space-y-1">
        <h1 className="text-5xl font-bold text-[#F27F3D] ">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Siden findes ikke</h2>
        <p className="text-gray-500">Den side du leder efter eksisterer ikke eller er blevet flyttet.</p>
      </div>
    </main>
  );
}
