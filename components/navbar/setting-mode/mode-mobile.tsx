"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function ModeMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => {setIsOpen(true)}
  const onClose = () => {setIsOpen(false)}
  return (
    <>
    <Button variant="ghost" onClick={onOpen}><AlignJustify /></Button>
    
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent side="left">

        <SheetHeader>
          <SheetTitle>Food Ordering</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <Link href="/setting/profile">
            <Button onClick={onClose} variant="ghost" className="w-full rounded-none flex justify-start">Profile</Button>
          </Link>
          <Link href="/setting/menu">
            <Button onClick={onClose} variant="ghost" className="w-full rounded-none flex justify-start">Menu</Button>
          </Link>
        </div>
        
        
        

      </SheetContent>
    </Sheet>
    </>
  )
}
