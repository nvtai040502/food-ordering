import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import Link from "next/link"

export function ModeMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost"><AlignJustify /></Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Food Ordering</SheetTitle>
            
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Link href="/">
            Home
          </Link>
          <Link href="/menu">
            Menu
          </Link>
          <Link href="/about">
            About
          </Link>
          <Link href="/contact">
            Contact
          </Link>
        </div>
        

      </SheetContent>
    </Sheet>
  )
}
