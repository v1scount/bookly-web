import useSWR from "swr";
import axios from 'axios';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);


export function getPopularBooks(limit = 6) {
    const {data, error, isLoading} = useSWR(`https://openlibrary.org/trending/daily.json?limit=${limit}`, fetcher)

    return {
        popularBooks: data?.works,
        isLoading,
        isError: error
    }
}

export function getBookDetails(id: string) {
    const {data, error, isLoading} = useSWR(`https://openlibrary.org${id}.json`, fetcher)

    return {
        bookDetail: data,
        isLoading,
        isError: error
    }
}
