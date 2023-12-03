"use client"

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";

interface SearchComponentProps {
  placeholder: string
}
const SearchComponent = ({
  placeholder
}: SearchComponentProps
) => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        name: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, router, pathname])
  return ( 
    <div>
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
   );
}
 
export default SearchComponent;