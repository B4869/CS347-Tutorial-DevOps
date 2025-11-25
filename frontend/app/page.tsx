import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* Create Decorator For Website by using css tailwind */}
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Welcome to Our Website!</h1>
      <p className="text-lg mb-12 text-gray-600">Building beautiful web experiences with Next.js and Tailwind CSS.</p>
      <Image
        src="/images/decorator.png"
        alt="Website Decorator"
        width={400}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
    </>
  );
}
