import Image from "next/image";

export default function Home() {
  return (
    <div>
      hello
      welcome
      <div className="flex justify-center items-center h-screen">
        good evenening
        <Image
          src="/House.jpg"
          alt="House"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
