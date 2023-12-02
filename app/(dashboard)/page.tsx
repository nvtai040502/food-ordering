import HomeMenu from "@/components/home-page/home-menu";
import HomeHeader from "@/components/home-page/header";
import HomeAboutUs from "@/components/home-page/about-us";
import HoneContactUs from "@/components/home-page/contact-us";

export default function Home() {
  return (
    <div className="">

      <div className="flex flex-col gap-8">
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
