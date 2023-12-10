import NavbarSettingMode from "./setting-mode";
import NavbarShoppingMode from "./shopping-mode";

interface NavBarProps {
  mode: "shopping" | "setting"
}
const NavBar = ({
  mode
}: NavBarProps
) => {
  return ( 
    <div className="fixed top-0 left-0 right-0 items-center flex border-b justify-between px-8 py-4 bg-background z-10">
      {mode === "shopping" && <NavbarShoppingMode />}
      {mode === "setting" && <NavbarSettingMode />}
    </div>
   );
}
 
export default NavBar;