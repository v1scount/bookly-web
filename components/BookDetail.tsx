"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/8HBOxVo2P2M
 */

import { useAppStore } from "@/app/lib/store";
import { getBookDetails, getBookRatings } from "@/app/lib/data";
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
import { Skeleton } from "antd";

export function BookDetail() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const bookSelected = useAppStore((state) => state.bookDetail);
  const { bookDetail, isLoading, isError } = getBookDetails(bookSelected?.key);
  const { bookRatings, isErrorRatings, isLoadingRatings } = getBookRatings(
    bookSelected?.key.split("/").pop()
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-12">
      <div className="flex flex-col items-center">
        <Image
          alt="Book cover"
          height="320"
          src={`https://covers.openlibrary.org/b/olid/${bookSelected?.cover_edition_key}-L.jpg`}
          width="200"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {isLoading ? (
            <Skeleton paragraph={{ rows: 1 }} title={false} />
          ) : (
            <p className="text-3xl font-bold mr-2 text-black dark:text-white">
              {bookDetail?.title}
            </p>
          )}
          {isLoading ? (
            <Skeleton paragraph={{ rows: 1 }} title={false} className="mt-8" />
          ) : (
            bookSelected?.author_name?.map((author: string, index: number) => (
              <p className="text-sm">
                {author}{" "}
                {bookSelected?.author_name?.length > index + 1 ? ", " : ""}
              </p>
            ))
          )}
        </div>
        {isLoading ? (
          <div className="flex flex-col flex-1 mt-8 mr-12 items-center">
            <div className="mb-8">
              <DescriptionSkeleton />
            </div>
            <DescriptionSkeleton />
          </div>
        ) : (
          <ShowMoreText
            lines={8}
            more="Show more"
            less="Show less"
            anchorClass="show-more-less-clickable"
            onClick={() => setShowMoreDescription(!showMoreDescription)}
            expanded={showMoreDescription}
            truncatedEndingComponent={"..."}
            width={640}
            className="mt-4 dark:text-textDark text-textLight"
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
      <AddReview
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        createReview={createReview}
      />
    </div>
  );
}
