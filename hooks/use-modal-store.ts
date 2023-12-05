import { Category, MenuItem, Order } from "@prisma/client"
import { create } from "zustand"

export type ModalType = 
"createCategory" |
"editCategory" |
"deleteCategory" |
"createMenuItem" |
"editMenuItem" |
"deleteMenuItem" |
"deleteOrder"

export type ModalData = {
  category?: Category
  categories?: Category[]
  menuItem?: MenuItem
  order?: Order
}


interface ModalStore {
  type: ModalType | null,
  data: ModalData
  isOpen: boolean,
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}


export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data={}) => set({isOpen: true, type, data}),
  onClose: () => set({isOpen: false, type: null,data: {}})
}))