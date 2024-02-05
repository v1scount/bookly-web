import {create} from 'zustand';
import { createBooksSlice, BooksSlice } from './slices/createBooksSlice';

type StoreState = BooksSlice;

export const useAppStore = create<StoreState>()((...a) => ({
    ...createBooksSlice(...a),
}))