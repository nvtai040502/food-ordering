"use client"
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { CategoryWithMenuItems } from '@/type';
import CategoryRendering from './category-render';

const AllFoodRendering = ({ categories }: { categories: CategoryWithMenuItems[] }) => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="categories">
        {(provided) => (
        
          <div
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="flex flex-col gap-4"
          >
            {categories.map((category, index) => (
              <div key={category.id}>
                <CategoryRendering
                  categories={categories}
                  category={category}
                  menuItems={category.menuItems} 
                  index={index}
                />
              </div>
            ))}
            {provided.placeholder}
            
          </div>
        
        )}
        </Droppable>
    </DragDropContext>
  );
};

export default AllFoodRendering;
