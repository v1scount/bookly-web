// "use server"

// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const cookieStore = cookies();
// const supabase = createClient(cookieStore);


// export const isSupabaseConnected = () => {
//   if (supabase) {
//     return true;
//   }
//   return false
// };

// export const signOut = async () => {
//   "use server"
//   await supabase.auth.signOut();
//   return redirect("/login");
// };
