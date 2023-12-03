"use client"
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { CategoryWithMenuItems } from '@/type';
import CategoryRendering from './category-render';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AllFoodRendering = ({ categories }: { categories: CategoryWithMenuItems[] }) => {
  const [orderedCategories, setOrderedCategories] = useState<CategoryWithMenuItems[]>([]);

  useEffect(() => {
    setOrderedCategories([...categories]);
  }, [categories]);

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === "category") {
      const updatedCategories = Array.from(orderedCategories);
      const [removed] = updatedCategories.splice(source.index, 1);
      updatedCategories.splice(destination.index, 0, removed);

      const updatedCategoriesWithOrder = updatedCategories.map((item, index) => ({ ...item, order: index }));
      setOrderedCategories(updatedCategoriesWithOrder);

      try {
        await axios.patch(`/api/menu/categories/reorder`, { updateCategories: updatedCategoriesWithOrder });
        console.log("success")
      } catch (error) {
        console.error('API Error:', error);
      }
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

        try {
          await axios.patch(`/api/menu/menu-items/reorder`, { sourceCategory: sourceCategory });
          console.log("success")
        } catch (error) {
          console.error('API Error:', error);
        }
      } else {
        const [movedMenuItem] = sourceCategory.menuItems.splice(source.index, 1);
        movedMenuItem.categoryId = destination.droppableId;
        destCategory.menuItems.splice(destination.index, 0, movedMenuItem);

        sourceCategory.menuItems = sourceCategory.menuItems.map((item, index) => ({ ...item, order: index }));
        destCategory.menuItems = destCategory.menuItems.map((item, index) => ({ ...item, order: index }));

        updatedCategories[sourceCategoryIndex] = sourceCategory;
        updatedCategories[destCategoryIndex] = destCategory;

        setOrderedCategories(updatedCategories);

        try {
          await axios.patch(`/api/menu/menu-items/${movedMenuItem.id}`, { categoryId: movedMenuItem.categoryId });
          await axios.patch(`/api/menu/menu-items/reorder`, { sourceCategory: sourceCategory, destCategory: destCategory });
          console.log("success")
        } catch (error) {
          console.error('API Error:', error);
        }
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
            {categories.length === 0 && (
              <div className="text-center">
                No category found
              </div>
            )}
            {provided.placeholder}
          </div>
          
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AllFoodRendering;
