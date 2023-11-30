"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, MenuItem } from '@prisma/client';
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
  description: z.string(),
  size: z.string(),
  basePrice: z.coerce.number(),
  categoryId: z.string()
  

});
interface FormTextSetupProps {
  categories?: Category[]
  menuItem?: MenuItem
}
const FormTextSetup = ({
  categories,
  menuItem
}: FormTextSetupProps
) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: menuItem?.name,
      description: menuItem?.description,
      size: menuItem?.size,
      basePrice: menuItem?.basePrice,
      categoryId: menuItem?.categoryId || ""
    }
  });
  const { onClose } = useModal()
  const { isSubmitting } = form.formState;
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.patch(`/api/menu-items/${menuItem?.id}`, values)
      toast({
        title: "Updated MenuItem Success",
      }) 
      router.refresh()
    } catch(error) {
      console.log(error)
      toast({title: `Something went wrong: ${error}`})
    } finally {
      onClose()
    }
  };

  

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>          
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="test@example.com"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="test@example.com"
                    {...field} />
                </FormControl>
                
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

            <Button disabled={isSubmitting} className="md:w-1/3 w-1/2">Update</Button>
        </form>
      </Form>
        

  );
};

export default FormTextSetup;
