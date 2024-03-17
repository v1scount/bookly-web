"use client";

import { CardContent, Card } from "@/components/ui/card";
import { getPopularBooks } from "@/app/lib/data";
import BookSkeleton from "@/components/ui/skeletons/card-skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/lib/store";
interface PopularBooks {
  bookLimit?: number;
}

export default function PopularBooks({ bookLimit }: PopularBooks) {
  const { popularBooks, isLoading, isError } = getPopularBooks(bookLimit);
  const setBookDetail = useAppStore((state) => state.setBookDetail);
  const router = useRouter();

  const onClickBook = (book: any) => {
    setBookDetail(book);
    console.log(book);
    router.push(`${book?.key}`);
  };

  return (
    <section className="mt-12">
      <h2 className="dark:text-white text-gray-950 text-2xl font-bold">
        Popular Books
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
        {isLoading ? (
          <BookSkeleton />
        ) : (
          popularBooks?.map((book: any, index: number) => {
            return (
              <Card
                key={index}
                className="max-w-48"
                onClick={() => onClickBook(book)}
              >
                <CardContent className="flex flex-col items-center">
                  <Image
                    alt="Book cover"
                    height="320"
                    src={`https://covers.openlibrary.org/b/olid/${book?.cover_edition_key}-L.jpg`}
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "fill",
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8,
                    }}
                    width="240"
                  />
                  <h3 className="my-4 text-md font-semibold text-center px-2">
                    {book?.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
}
