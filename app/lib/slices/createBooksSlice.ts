import { StateCreator } from "zustand";
import axios from 'axios';

export interface Book {
    category: {
        id: number;
        image: string;
        name: string;
    };
    description: string;
    id: number;
    images: string[];
    price: number;
    title: string;
    quantity?: number;
}

export interface BooksSlice {
    popularBooks: any[];
    bookDetail: any | null;
    setBookDetail: (book: any) => void;
}

export const createBooksSlice: StateCreator<BooksSlice> = (set) => ({
    popularBooks: [],
    bookDetail: null,
    setBookDetail: (book: any) => set({ bookDetail: book }),
})