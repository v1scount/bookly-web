"use client";

import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { getPopularBooks } from "@/app/lib/data";
import BookSkeleton from "@/app/ui/skeletons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

export default function PopularBooks() {
  const { books, isLoading, isError } = getPopularBooks();

  // if (isLoading) return <BookSkeleton />;

  return (
    <section>
      <h2 className="text-2xl font-bold">Popular Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {isLoading ? (
          <BookSkeleton />
        ) : (
          books?.map((book: any, index: number) => {
            // const cover = getBookCover(book?.cover_edition_key);
            return (
            <Card key={index}>
              <CardContent>
                <Image
                  alt="Book cover"
                  height="200"
                  src={`https://covers.openlibrary.org/b/olid/${book?.cover_edition_key}-S.jpg`}
                  style={{
                    aspectRatio: "150/200",
                    objectFit: "cover",
                  }}
                  width="150"
                  placeholder="blur"
                  blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAJYAAADICAYAAAAKhRhlAAABeUlEQVR42u3SsREAAAQAMRbXmZslFIpkhL/Pqp6AY2ksjIWxMJaxMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsbCWMbCWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAtjGQtjYSyMJQPGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJj8c0Cc/P02DlNXsoAAAAASUVORK5CYII="
                />
                <h3 className="mt-2 text-lg font-semibold">{book?.title}</h3>
              </CardContent>
            </Card>
          )})
        )}
        {/* <Card>
              <CardContent>
                <img
                  alt="Book cover"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "150/200",
                    objectFit: "cover",
                  }}
                  width="150"
                />
                <h3 className="mt-2 text-lg font-semibold">Book Title</h3>
                <p className="text-gray-500">Author Name</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <img
                  alt="Book cover"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "150/200",
                    objectFit: "cover",
                  }}
                  width="150"
                />
                <h3 className="mt-2 text-lg font-semibold">Book Title</h3>
                <p className="text-gray-500">Author Name</p>
              </CardContent>
            </Card> */}
      </div>
    </section>
  );
}
