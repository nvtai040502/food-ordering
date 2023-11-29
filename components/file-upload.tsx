import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface FileUploadProps {
  endpoint: "uploadImage"
  value: string
  onChange: (url?: string) => void
}
export const FileUpload = ({
  endpoint,
  value,
  onChange,
}: FileUploadProps) => {

  const fileType = value?.split(".").pop()
  if (value && fileType !== "pdf") {
    return (
      <div className="relative justify-center flex">
      <Image
        height={200}
        width={200}
        src={value}
        alt="Upload"
      />
      <Button
          onClick={() => onChange("")}
          className=" rounded-none absolute top-0 right-0 "
          variant="destructive"
          size="sm"
        >
          <X className="h-3 w-3" />
      </Button>
    </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  )
}