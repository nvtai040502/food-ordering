"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import axios from "axios"
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useModal } from '@/hooks/use-modal-store';

const formScheme = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  categoryId: z.string()
  

});
interface FormMenuItemSetupProps {
  categories: Category[]
}
const FormMenuItemSetup = ({
  categories,
}: FormMenuItemSetupProps
) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      categoryId: ""
    }
  });

  const { isSubmitting } = form.formState;
  const { toast } = useToast()
  const router = useRouter()
  const { onClose } = useModal()
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      const response = await axios.post(`/api/menu/menu-items`, values)
      toast({
        title: "Created MenuItem Success",
      }) 
      router.refresh()
      console.log(response.data)
      router.push(`/setting/menu/menu-items/${response.data.id}`)
    } catch(error) {
      console.log(error)
      toast({title: `Something went wrong: ${error}`})
    } finally {
      onClose()
    }
  };
  return (
    <div className="">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter menu item name"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  
                </Select>
                
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting}>Continue</Button>
        </form>
      </Form>
        
      
    </div>
  );
};

export default FormMenuItemSetup;
