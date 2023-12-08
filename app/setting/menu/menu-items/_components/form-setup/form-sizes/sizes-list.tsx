"use client";

import { MenuItem, Size } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash2 } from "lucide-react";

import { formatPrice } from "@/lib/fotmat-price";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";

interface SizesListProps {
  sizes: Size[]
  menuItem: MenuItem
  
};

export const SizesList = ({
  sizes,
  menuItem,
}: SizesListProps) => {
  const [orderedSizes, setOrderedSizes] = useState<Size[]>([]);

  useEffect(() => {
    setOrderedSizes([...sizes]);
  }, [sizes]);


  const {toast} = useToast()
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === "size") {
      const updatedSizes = Array.from(orderedSizes);
      const [removed] = updatedSizes.splice(source.index, 1);
      updatedSizes.splice(destination.index, 0, removed);

      const updatedSizesWithOrder = updatedSizes.map((item, index) => ({ ...item, order: index }));
      setOrderedSizes(updatedSizesWithOrder);

      try {
        await axios.patch(`/api/menu/menu-items/${menuItem.id}/sizes/reorder`, { updateSizes: updatedSizesWithOrder });
        console.log("success")

      } catch (error) {
        console.error('API Error:', error);
      }
    }
  }

  const { onOpen } = useModal()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sizes" type="size" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {orderedSizes.map((size, index) => (
              <Draggable 
                key={size.id} 
                draggableId={size.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    className="flex items-center bg-background border rounded-md mb-4 text-sm"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className="px-2 py-3 hover:bg-secondary border-r rounded-l-md transition"
                      {...provided.dragHandleProps}
                    >
                      <Grip
                        className="h-5 w-5"
                      />
                    </div>
                    <div className="flex justify-between items-center w-full p-2">
                      <p>
                        {size.name}
                      </p>
                      <p>
                        {formatPrice(size.price)}
                      </p>
                      
                      <div>
                        <Button 
                          onClick={() => {onOpen("editSize", {menuItem, size})}}
                          size="icon" 
                          variant="ghost"
                        > 
                        <Pencil className="h-4 w-4"/> 
                      </Button>

                      <Button 
                        onClick={() => {onOpen("deleteSize", {menuItem, size})}}
                        size="icon" 
                        variant="ghost"
                      > 
                        <Trash2 className="h-4 w-4"/> 
                      </Button>
                      
                      </div>
                      
                    </div>
                    
                    
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}