"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addBookToRead = async (book_id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("read_books")
    .delete()
    .eq("book_id", book_id);
};

export const isBookReaad = async (book_id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("read_books")
    .select("*")
    .eq("book_id", book_id);
};
