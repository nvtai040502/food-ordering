import HomeMenu from "@/components/home-page/home-menu";
import HomeHeader from "@/components/home-page/header";
import Navbar from "@/components/navbar";
import HomeAboutUs from "@/components/home-page/about-us";
import HoneContactUs from "@/components/home-page/contact-us";

export default function Home() {
  return (
    <div className=" max-w-4xl p-3 mx-auto">

      <div className="flex flex-col gap-8">
        
        <Navbar />
        <HomeHeader />

        <div className="flex flex-col gap-8 items-center justify-center">

          <HomeMenu />
          <HomeAboutUs />
          <HoneContactUs />

        </div>
      </div>
    </div>
  )
}
