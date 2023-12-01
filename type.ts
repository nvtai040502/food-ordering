import { Category, MenuItem } from "@prisma/client";

export interface CategoryWithMenuItems extends Category {
  menuItems: MenuItem[];
}