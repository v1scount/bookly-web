"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const cookieStore = cookies();
const supabase = createClient(cookieStore);
import axios from "axios";
import { getBookDetails } from "../data";

export const addBookToRead = async (book_id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("read_books").insert([
    {
      user_id: user?.id,
      book_id,
    },
  ]);

  console.log("ERROR", error);
};

export const removeBookFromRead = async (book_id: string) => {
  const { data, error } = await supabase
    .from("read_books")
    .delete()
    .eq("book_id", book_id);
};

export const getIsBookRead = async (book_id: string) => {
  const { data, error } = await supabase
    .from("read_books")
    .select("*")
    .eq("book_id", book_id);

  if (data && data?.length > 0) {
    return true;
  } else return false;
};

export const addBookToLiked = async (book_id: string) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("liked_books").insert([
      {
        user_id: user?.id,
        book_id,
      },
    ]);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const removeBookFromLiked = async (book_id: string) => {
  try {
    const { data, error } = await supabase
      .from("liked_books")
      .delete()
      .eq("book_id", book_id);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getIsBookLiked = async (book_id: string) => {
  try {
    const { data, error } = await supabase
      .from("liked_books")
      .select("*")
      .eq("book_id", book_id);

    if (data && data?.length > 0) {
      return true;
    } else return false;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const addBookToReadList = async (book_id: string) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("to_read_books").insert([
      {
        user_id: user?.id,
        book_id,
      },
    ]);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const removeBookFromReadList = async (book_id: string) => {
  try {
    const { data, error } = await supabase
      .from("to_read_books")
      .delete()
      .eq("book_id", book_id);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getIsBookInReadList = async (book_id: string) => {
  try {
    const { data, error } = await supabase
      .from("to_read_books")
      .select("*")
      .eq("book_id", book_id);

    if (data && data?.length > 0) {
      return true;
    } else return false;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const rateBook = async (book_id: string, rating: number) => {
  try {
    const { data, error } = await supabase
      .from("rated_books")
      .insert([{ rating, book_id }]);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const updateRateBook = async (book_id: string, rating: number) => {
  try {
    const { data, error } = await supabase
      .from("rated_books")
      .update({ rating })
      .eq("book_id", book_id);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const removeBookRating = async (book_id: string) => {
  try {
    const { data, error } = await supabase
      .from("rated_books")
      .delete()
      .eq("book_id", book_id);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getBookRating = async (book_id: string) => {
  try {
    const { data, error } = await supabase
      .from("rated_books")
      .select("*")
      .eq("book_id", book_id);

    if (data && data?.length > 0) {
      return data[0].rating;
    }
    return 0;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getUserReadBooks = async () => {
  let readBooks: any = [];
  try {
    const { data, error } : any = await supabase.from("read_books").select("*");

    // Create an array of Promises (Axios get requests)
    const promises =
      // data &&
      data.map(async (book: any) => {
        const response = await axios.get(
          `https://openlibrary.org/works/${book?.book_id}.json`
        );
        const responseData = response.data;
        const obj = {
          ...responseData,
        };
        return obj;
      });

    // Wait for all Promises to resolve
    const resolvedBooks = await Promise.all(promises);

    // Assign the resolved books to readBooks
    readBooks = resolvedBooks;

    return readBooks;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getUserLikedBooks = async () => {
  let likedBooks: any = [];
  try {
    const { data, error }: any = await supabase.from("liked_books").select("*");

    // Create an array of Promises (Axios get requests)
    const promises = data.map(async (book: any) => {
      const response = await axios.get(
        `https://openlibrary.org/works/${book?.book_id}.json?fields=title,author_name,cover_i,cover_edition_key`
      );
      const responseData = response.data;
      const obj = {
        ...responseData,
      };
      return obj;
    });

    // Wait for all Promises to resolve
    const resolvedBooks = await Promise.all(promises);

    // Assign the resolved books to likedBooks
    likedBooks = resolvedBooks;

    return likedBooks;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getUserToReadBooks = async () => {
  let toReadBooks: any = [];
  try {
    const { data, error }:any = await supabase.from("to_read_books").select("*");

    // Create an array of Promises (Axios get requests)
    const promises = data.map(async (book: any) => {
      const response = await axios.get(
        `https://openlibrary.org/works/${book?.book_id}.json?fields=title,author_name,cover_i,cover_edition_key`
      );
      const responseData = response.data;
      const obj = {
        ...responseData,
      };
      return obj;
    });

    // Wait for all Promises to resolve
    const resolvedBooks = await Promise.all(promises);

    // Assign the resolved books to toReadBooks
    toReadBooks = resolvedBooks;

    return toReadBooks;
  } catch (error) {
    console.log("ERROR", error);
  }
};
