import SectionHeader from "./section-header";

const HomeAboutUs = () => {
  return ( 
    <div className="flex flex-col gap-4">
      <SectionHeader
        subHeader={'Our story'}
        mainHeader={'About us'}
      />

      <div className="max-w-md flex flex-col gap-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
        </p>
        <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
        <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
      </div>
    </div>
   );
}
 
export default HomeAboutUs;