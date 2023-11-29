"use client"
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';

const CreateCategory = () => {
  const { onOpen } = useModal()
  return ( 
    <div>
      <Button onClick={() => {onOpen("createCategory")}}>Create</Button>
    </div>
   );
}
 
export default CreateCategory