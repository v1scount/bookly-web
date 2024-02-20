"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createReview = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("reviews").insert([
    {
      user_id: user?.id,
      title: "locura total",
      text: "demenciaa",
      book_id: "alla",
      rating: 4.5,
    },
  ]);

};

export const getBookReviews = async (bookId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("book_id", bookId);

    return {
        reviews: data,
        isReviewError: error
    }
    
};
