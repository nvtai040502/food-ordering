import { Category, MenuItem, Order } from "@prisma/client";

export interface CategoryWithMenuItems extends Category {
  menuItems: MenuItem[];
}

export interface OrderWithMenuItems extends Order{
  menuItem: MenuItem | null;
}