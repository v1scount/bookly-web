"use client";

import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { getPopularBooks } from "@/app/lib/data";
import BookSkeleton from "@/app/ui/skeletons";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useAppStore } from "@/app/lib/store";
interface PopularBooks {
  bookLimit?: number;
}

export default function PopularBooks({bookLimit}: PopularBooks) {
  const { popularBooks, isLoading, isError } = getPopularBooks(bookLimit);
  const setBookDetail = useAppStore((state) => state.setBookDetail);
  const router = useRouter();

  console.log(popularBooks);

  const onClickBook = (book: any) => {
    setBookDetail(book);
    router.push(`/book-detail/${book?.title}`);
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Popular Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
        {isLoading ? (
          <BookSkeleton />
        ) : (
          popularBooks?.map((book: any, index: number) => {
            return (
                <Card key={index} className="max-w-48 max-h-80" onClick={() => onClickBook(book)}>
                  <CardContent className="flex flex-col items-center">
                    <Image
                      alt="Book cover"
                      height="200"
                      src={`https://covers.openlibrary.org/b/olid/${book?.cover_edition_key}-L.jpg`}
                      style={{
                        aspectRatio: "150/200",
                        objectFit: "contain",
                      }}
                      width="150"
                    />
                    <h3 className="mt-2 text-lg font-semibold">
                      {book?.title}
                    </h3>
                  </CardContent>
                </Card>
            );
          })
        )}
      </div>
    </>
  );
}
