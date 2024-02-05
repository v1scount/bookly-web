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
    books: Book[];
    fetchPopularBooks: () => void;
}

export const createBooksSlice: StateCreator<BooksSlice> = (set) => ({
    books: [],
    fetchPopularBooks: async () => {
        const res = await axios.get('https://openlibrary.org/trending/daily.json')
        set({ books: res.data })
    },
})