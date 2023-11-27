"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Profile } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import axios from "axios"
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formScheme = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  email: z.string(),
  phone: z.string(),
  streetAddress: z.string(),
  postalCode: z.string(),
  city: z.string(),
  country: z.string()
});
interface FormTextSetupProps {
  name: string
  email: string | undefined
  profile: Profile | null
}
const FormTextSetup = ({
  name,
  email,
  profile
}: FormTextSetupProps
) => {

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: name,
      email: email,
      phone: profile?.phone,
      streetAddress: profile?.streetAddress,
      postalCode: profile?.postalCode,
      city: profile?.city,
      country: profile?.country
    }
  });

  const { isSubmitting } = form.formState;
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      await axios.patch(`/api/profile`, values)
      toast({
        title: "Updated Profile Success",
      }) 
      router.refresh()
    } catch(error) {
      toast({title: "Some thing went wrong `${error}`"})
    }
  };

  return (
    <div className=''>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Street address"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className='flex justify-between items-center gap-2'>
            <div className='w-full'>
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text" placeholder="Postal code"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        type="text" placeholder="City"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Country"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className='md:w-40 w-full'>Save</Button>
        </form>
      </Form>

    </div>
  );
};

export default FormTextSetup;
