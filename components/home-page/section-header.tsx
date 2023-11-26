export default function SectionHeader({subHeader,mainHeader}:{subHeader:string, mainHeader: string}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="uppercase font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">
        {mainHeader}
      </h2>
    </div>
  );
}