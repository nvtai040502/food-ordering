import Image from "next/image";

const ImageSetup = ({imageUrl}: {imageUrl: string}) => {
  return ( 
    <div className="flex justify-center">
      <Image src={imageUrl} alt="User Image" width={120} height={120} />
    </div>
   );
}
 
export default ImageSetup;