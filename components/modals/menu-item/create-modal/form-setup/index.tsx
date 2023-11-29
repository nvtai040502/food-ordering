"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, MenuItem } from '@prisma/client';
import { set, useForm } from 'react-hook-form';
import * as z from "zod";
import axios from "axios"
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/file-upload';

const formScheme = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  imageUrl: z.string(),
  description: z.string(),
  size: z.string(),
  basePrice: z.coerce.number(),
  categoryId: z.string()
  

});
interface FormMenuItemSetupProps {
  categories?: Category[]
}
const FormMenuItemSetup = ({
  categories,
}: FormMenuItemSetupProps
) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      imageUrl: "",
      description: "",
      size: "",
      basePrice: 0,
      categoryId: ""
    }
  });

  const { isSubmitting } = form.formState;
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.post(`/api/menu-items`, values)
      toast({
        title: "Created MenuItem Success",
      }) 
      router.refresh()
    } catch(error) {
      console.log(error)
      toast({title: `Something went wrong: ${error}`})
    }
  };
  return (
    <div className="">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-3 grid-cols-2 gap-2 w-full'>
          
          <div className='col-span-1 flex justify-center'>
              <FormField 
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>

                    <FormControl>
                      <FileUpload
                        endpoint= "uploadImage"
                        value={field.value}
                        onChange={field.onChange} 
                      />
                    </FormControl>
                  
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>
          

            <div className='flex flex-col gap-2 md:col-span-2'> 
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
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
                <FormLabel>Base Price</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
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
          </div>

          <div className='col-span-3 flex justify-center items-center'>
            <Button disabled={isSubmitting} className="md:w-1/3 w-1/2">Create</Button>
          </div>
        </form>
      </Form>
        
      
    </div>
  );
};

export default FormMenuItemSetup;
