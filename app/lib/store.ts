import {create} from 'zustand';
import { createBooksSlice, BooksSlice } from './slices/createBooksSlice';
import { persist, createJSONStorage } from 'zustand/middleware'

type StoreState = BooksSlice;

export const useAppStore = create<StoreState>()(persist((...a) => ({
    ...createBooksSlice(...a),
}), {name: 'bound-store', storage: createJSONStorage(() => localStorage)}))