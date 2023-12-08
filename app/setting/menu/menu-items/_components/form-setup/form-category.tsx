"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Category, MenuItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const formScheme = z.object({
  categoryId: z.string()
})

interface FormCategoryProps{
  categories: Category[],
  category: Category
  menuItem: MenuItem
}
const FormCategory = ({
  menuItem,
  category,
  categories
}:FormCategoryProps
) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      categoryId: menuItem.categoryId
    }
  })
 
  const { toast } = useToast()
  const router = useRouter()
  const {isSubmitting}  = form.formState
  const [isEditting, setIsEditting] = useState(false)
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.patch(`/api/menu/menu-items/${menuItem.id}`, values)
      toast({
        title: "Update Category Success",
      })
      router.refresh()
      form.reset({categoryId: values.categoryId})
    } catch(error) {
      toast({
        title: "Something went wrong",
        description: `Error: ${error}`
      })
    } finally {
      setIsEditting(false)
    }
  }
  
  return ( 
    <div className='flex gap-2 flex-col'>
      
        <div className='flex justify-between items-center font-medium'>
          Category
          { isEditting ? (
          
          <Button onClick={() => {setIsEditting(false)}} variant="outline" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={() => {setIsEditting(true)}} variant="outline" size="sm">
            
            <Pencil className='h-4 w-4 mr-2'/>
            Edit
          </Button>
          
        )}
        </div>
        
        { !isEditting ? (
          <div className=' text-sm'>
              {category.name}
          </div>
        ): (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
                
              </Select>
                
            )}
          />
            
            <Button variant="outline" disabled={isSubmitting}>Save</Button>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default FormCategory