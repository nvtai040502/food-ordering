import SectionHeader from "./section-header";

const HoneContactUs = () => {
  return ( 
    <div className="flex flex-col gap-4">
      <SectionHeader
        subHeader={'Don\'t hesitate'}
        mainHeader={'Contact us'}
      />
      <a className="text-2xl underline" href="tel:+46738123123">
        +46 738 123 123
      </a>
    </div>
   );
}
 
export default HoneContactUs;