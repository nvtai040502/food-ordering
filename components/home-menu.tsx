import MenuCard from "./menu-card";

const HomeMenu = () => {
  return ( 
    <div className="flex flex-col gap-4">
      
      <div className="flex flex-col justify-center items-center">
        <h3 className="uppercase font-semibold leading-4">
          check out
        </h3>
        <h2 className="text-primary font-bold text-4xl italic">
          Our Best Seller
        </h2>
      </div>

      <div className=" grid grid-cols-3 gap-x-4">
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </div>

      <div>
        Hello
      </div>

    </div>
   );
}
 
export default HomeMenu;