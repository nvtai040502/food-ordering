"use client";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { CategoryWithMenuItems } from '@/type';
import CategoryRendering from './category-render';
import { useEffect, useState } from 'react';

const AllFoodRendering = ({ categories }: { categories: CategoryWithMenuItems[] }) => {
  const [orderedCategories, setOrderedCategories] = useState([...categories]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === "category") {
      const updatedCategories = Array.from(orderedCategories);
      const [removed] = updatedCategories.splice(source.index, 1);
      updatedCategories.splice(destination.index, 0, removed);
      setOrderedCategories(updatedCategories.map((item, index) => ({ ...item, order: index })));
    }

    if (type === "menuItem") {
      const updatedCategories = [...orderedCategories];
      const sourceCategoryIndex = updatedCategories.findIndex(category => category.id === source.droppableId);
      const destCategoryIndex = updatedCategories.findIndex(category => category.id === destination.droppableId);

      if (sourceCategoryIndex === -1 || destCategoryIndex === -1) {
        return;
      }

      const sourceCategory = updatedCategories[sourceCategoryIndex];
      const destCategory = updatedCategories[destCategoryIndex];

      if (source.droppableId === destination.droppableId) {
        const updatedMenuItems = Array.from(sourceCategory.menuItems);
        const [movedMenuItem] = updatedMenuItems.splice(source.index, 1);
        updatedMenuItems.splice(destination.index, 0, movedMenuItem);

        sourceCategory.menuItems = updatedMenuItems.map((item, index) => ({ ...item, order: index }));
        updatedCategories[sourceCategoryIndex] = sourceCategory;

        setOrderedCategories(updatedCategories);
      } else {
        const [movedMenuItem] = sourceCategory.menuItems.splice(source.index, 1);
        movedMenuItem.categoryId = destination.droppableId;
        destCategory.menuItems.splice(destination.index, 0, movedMenuItem);

        sourceCategory.menuItems = sourceCategory.menuItems.map((item, index) => ({ ...item, order: index }));
        destCategory.menuItems = destCategory.menuItems.map((item, index) => ({ ...item, order: index }));

        updatedCategories[sourceCategoryIndex] = sourceCategory;
        updatedCategories[destCategoryIndex] = destCategory;

        setOrderedCategories(updatedCategories);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="categories" type="category" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4">
            {orderedCategories.map((category, index) => (
              <CategoryRendering
                key={category.id}
                categories={categories}
                category={category}
                menuItems={category.menuItems}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AllFoodRendering;
