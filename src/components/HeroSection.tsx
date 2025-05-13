import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mb-10">
      <Image
        src={
          "https://images.unsplash.com/photo-1498671546682-94a232c26d17?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        } //
        alt="Growshop Hero"
        fill
        className="object-cover blur-xs brightness-75"
        priority
      />
      <div className="relative z-10 bg-black/50 p-6 rounded-lg">
        <h1 className="text-4xl md:text-6xl text-white font-bold text-center">
          GSHOP
        </h1>
      </div>
    </section>
  );
}
