"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/6TMHBNbzSam
 */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PiHeartStraightFill,
  PiHeartStraightLight,
  PiBookLight,
  PiBookFill,
  PiEyeFill,
  PiEyeLight,
} from "react-icons/pi";
import { Rate } from "antd";
import {
  addBookToRead,
  getIsBookRead,
  removeBookFromRead,
  addBookToLiked,
  removeBookFromLiked,
  getIsBookLiked,
  addBookToReadList,
  removeBookFromReadList,
  getIsBookInReadList,
  rateBook,
  getBookRating,
  updateRateBook,
  removeBookRating
} from "@/app/lib/supabase/books";
import { usePathname } from "next/navigation";
import { Player } from "@lordicon/react";
// import { isBookRead } from "@/app/lib/supabase/books";

const EYE_ICON = require("@/assets/wired-outline-eye.json");
const BOOK_ICON = require("@/assets/outline-book.json");
const PLUS_ICON = require("@/assets/outline-plus-circle.json");
const HEART_ICON = require("@/assets/heart.json");

export default function BookActions() {
  const pathname = usePathname();
  const book_id = pathname?.split("/").pop();

  // Action states
  const [isBookRead, setIsBookRead] = useState(false);
  const [isBookLiked, setIsBookLiked] = useState(false);
  const [isBookInReadList, setIsBookInReadList] = useState(false);

  // Icon Directions
  const [bookDirection, setBookDirection] = useState(-1);
  const [heartDirection, setHeartDirection] = useState(-1);
  const [plusDirection, setPlusDirection] = useState(-1);

  //Book rating
  const [bookRating, setBookRating] = useState(0);

  const bookRef = useRef<Player>(null);
  const heartRef = useRef<Player>(null);
  const plusRef = useRef<Player>(null);

  const changeDirection = (action: string) => {
    switch (action) {
      case "book": {
        setBookDirection(bookDirection === 1 ? -1 : 1);
        if (isBookRead) {
          book_id && removeBookFromRead(book_id);
          setIsBookRead(false);
        } else {
          book_id && addBookToRead(book_id);
          setIsBookRead(true);
        }
        break;
      }
      case "heart": {
        setHeartDirection(heartDirection === 1 ? -1 : 1);
        if (isBookLiked) {
          book_id && removeBookFromLiked(book_id);
          setIsBookLiked(false);
        } else {
          book_id && addBookToLiked(book_id);
          setIsBookLiked(true);
        }
        break;
      }
      case "plus": {
        setPlusDirection(plusDirection === 1 ? -1 : 1);
        if (isBookInReadList) {
          book_id && removeBookFromReadList(book_id);
          setIsBookInReadList(false);
        } else {
          book_id && addBookToReadList(book_id);
          setIsBookInReadList(true);
        }
        break;
      }

      default:
        break;
    }
  };

  const changeBookRating = (value: number) => {
    console.log('bookRating', bookRating)
    if (bookRating !== 0) {
      if (value === 0) book_id && removeBookRating(book_id);
      else book_id && updateRateBook(book_id, value);
    } else {
      if (value !== 0) book_id && rateBook(book_id, value);
      else book_id && removeBookRating(book_id);
    }

    setBookRating(value);
  };

  useEffect(() => {
    book_id &&
      getIsBookRead(book_id).then((data: boolean) => {
        if (data) {
          setIsBookRead(true);
          setBookDirection(1);
        }
      });
    book_id &&
      getIsBookLiked(book_id).then((data: any) => {
        if (data) {
          setIsBookLiked(true);
          setHeartDirection(1);
        }
      });
    book_id &&
      getIsBookInReadList(book_id).then((data: any) => {
        if (data) {
          setIsBookInReadList(true);
          setPlusDirection(1);
        }
      });
    book_id &&
      getBookRating(book_id).then((data: number) => {
        setBookRating(data);
      });
  }, []);

  useEffect(() => {
    bookRef.current?.play();
  }, [bookDirection]);

  useEffect(() => {
    heartRef.current?.play();
  }, [heartDirection]);

  useEffect(() => {
    plusRef.current?.play();
  }, [plusDirection]);

  return (
    <div className="bg-[#2b2b2b] p-4 rounded-lg text-white w-64">
      <div className="flex justify-between mb-4">
        <div
          onClick={() => changeDirection("book")}
          className="flex flex-col items-center"
        >
          <Player
            ref={bookRef}
            icon={BOOK_ICON}
            direction={bookDirection}
            colorize="#FFFF"
            size={48}
            state="morph-book"
          />
          <p>{bookDirection === -1 ? "Read" : "Remove"}</p>
        </div>
        <div
          onClick={() => changeDirection("heart")}
          className="flex flex-col items-center"
        >
          <Player
            ref={heartRef}
            icon={HEART_ICON}
            direction={heartDirection}
            colorize="#FFFF"
            size={48}
            state="morph-heart"
          />
          <p>{heartDirection === -1 ? "Like" : "Remove"}</p>
        </div>
        <div
          onClick={() => changeDirection("plus")}
          className="flex flex-col items-center"
        >
          <Player
            ref={plusRef}
            icon={PLUS_ICON}
            direction={plusDirection}
            colorize="#FFFF"
            size={48}
            state="morph-minus"
          />
          <p>{plusDirection === -1 ? "Readlist" : "Remove"}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2 text-center">Rate</div>
        <div className="flex flex-row justify-center">
          <Rate
            style={{ fontSize: 32, alignSelf: "center" }}
            value={bookRating}
            onChange={changeBookRating}
            allowHalf
          />
        </div>
      </div>
      <div className="text-sm">
        <Button className="w-full mb-2" variant="ghost">
          Show your activity
        </Button>
        <Button className="w-full mb-2" variant="ghost">
          Review or log...
        </Button>
        <Button className="w-full" variant="ghost">
          Add this book to lists...
        </Button>
      </div>
      {/* <div className="flex items-center justify-between bg-[#1b1b1b] p-2 rounded">
        <Input
          className="bg-transparent text-xs text-white placeholder-gray-400 border-none"
          placeholder="https://boxd.it/5RLb5"
          type="text"
        />
        <div className="flex space-x-2">
          <LinkIcon className="text-gray-400" />
          <PanelTopCloseIcon className="text-gray-400" />
          <FacebookIcon className="text-gray-400" />
        </div>
      </div> */}
    </div>
  );
}
