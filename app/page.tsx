import Header from "@/components/header";
import HomeMenu from "@/components/home-menu";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className=" max-w-4xl p-3 mx-auto">
      <div className="flex flex-col gap-8">
        <Navbar />

        <Header />

        <HomeMenu />

      </div>
      
      
    </div>
  )
}
