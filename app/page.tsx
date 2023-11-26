import Header from "@/components/header";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className=" max-w-4xl p-4 mx-auto">
      <div className="flex flex-col gap-4">
        <Navbar />

        <Header />
      </div>
      
      
    </div>
  )
}
