import useSWR from "swr";
import axios from 'axios';
import { getPlaiceholder } from "plaiceholder";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);


export function getPopularBooks() {
    const {data, error, isLoading} = useSWR('https://openlibrary.org/trending/daily.json?limit=4', fetcher)

    return {
        books: data?.works,
        isLoading,
        isError: error
    }
}

// export async function getBookCover(id:string) {
//     try {
//         const src = `https://covers.openlibrary.org/b/olid/${id}-S.jpg`;
       
//         const buffer = await fetch(src).then(async (res) =>
//           Buffer.from(await res.arrayBuffer())
//         );
       
//         const { base64 } = await getPlaiceholder(buffer);

//         return base64
       
//         // console.log(base64);
//       } catch (err) {
//         err;
//       }
// }