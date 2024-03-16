import { Home } from "@/components/Home";
import PopularBooks from "@/components/PopularBooks";

export default async function Index() {
  return (
    <>
      {/* <Home /> */}
      <PopularBooks bookLimit={6}/>
    </>
  );
}
