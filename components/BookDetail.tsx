"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/8HBOxVo2P2M
 */

import { useAppStore } from "@/app/lib/store";
import { getBookDetails, getBookRatings } from "@/app/lib/data";
import { isBookRead as getIsBookRead } from "@/app/lib/supabase/books";
import ShowMoreText from "react-show-more-text";
import React, { useState, useEffect, useCallback } from "react";
import { AddReview } from "./add-review";
import { createReview, getBookReviews } from "@/app/lib/supabase/";
import DescriptionSkeleton from "./ui/skeletons/description-skeleton";
import RatingsSkeleton from "./ui/skeletons/ratings-skeleton";
import { Rate } from "antd";
import { parseRating } from "@/utils/helpers";
import Review from "@/components/Reviews/Review";
import BookActions from "./book-actions";
import { NumberSchema } from "yup";
import Image from "next/image";

export function BookDetail() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const bookSelected = useAppStore((state) => state.bookDetail);
  const { bookDetail, isLoading, isError } = getBookDetails(bookSelected?.key);
  const { bookRatings, isErrorRatings, isLoadingRatings } = getBookRatings(
    bookSelected?.key.split("/").pop()
  );


  return (
    <>
      <div className="grid grid-flow-col auto-cols-auto mt-12 gap-12">
        <div className="flex flex-col items-center">
          <Image
            alt="Book cover"
            height="320"
            src={`https://covers.openlibrary.org/b/olid/${bookSelected?.cover_edition_key}-L.jpg`}
            width="200"
          />
          <Rate
            allowHalf
            defaultValue={parseRating(bookRatings?.average_rating)}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-baseline">
            <p className="text-3xl font-bold mr-2 text-black dark:text-white">
              {bookDetail?.title}
            </p>
            {bookSelected?.author_name?.map(
              (author: string, index: NumberSchema) => (
                <p className="text-black dark:text-white text-sm">
                  {author}{" "}
                  {bookSelected?.author_name?.length > index + 1 ? ", " : ""}
                </p>
              )
            )}
          </div>
          {isLoading ? (
            <DescriptionSkeleton />
          ) : (
            <ShowMoreText
              lines={8}
              more="Show more"
              less="Show less"
              anchorClass="show-more-less-clickable"
              onClick={() => setShowMoreDescription(!showMoreDescription)}
              expanded={showMoreDescription}
              truncatedEndingComponent={"..."}
              width={560}
              className="mt-4 text-black dark:text-white"
            >
              {bookDetail?.description?.value
                ? bookDetail?.description?.value
                : bookDetail?.description}
            </ShowMoreText>
          )}
        </div>
        <div className="flex flex-col items-center">
          <BookActions />
        </div>
      </div>
      <AddReview
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        createReview={createReview}
      />
    </>
  );
}
