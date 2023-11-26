import MenuCard from "../menu-card";
import SectionHeader from "./section-header";

const HomeMenu = () => {
  return ( 
    <div className="flex flex-col gap-4 w-full">
      
      <div className="flex flex-col justify-center items-center">
        <SectionHeader
          subHeader="Check out" 
          mainHeader="Our Best Seller"
        />
      </div>

      <div className=" grid grid-cols-3 gap-x-4 w-full">
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </div>

    </div>
   );
}
 
export default HomeMenu;