"use client";

import Image from "next/image";
import { Avatar, Button, Tabs } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import withTheme from "@/theme";
import {
  getUserReadBooks,
  getUserLikedBooks,
  getUserToReadBooks,
} from "../lib/supabase/books";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/lib/store";

function Profile() {
  const [readBooks, setReadBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [toReadBooks, setToReadBooks] = useState([]);
  const setBookDetail = useAppStore((state) => state.setBookDetail);
  const router = useRouter();

  const onClickBook = (book: any) => {
    console.log(book);
    setBookDetail(book);
    router.push(`${book?.key}`);
  };

  useEffect(() => {
    getUserReadBooks().then((data: any) => setReadBooks(data));
    getUserLikedBooks().then((data: any) => setLikedBooks(data));
    getUserToReadBooks().then((data: any) => setToReadBooks(data));
  }, []);

  const items: any["items"] = [
    {
      key: "1",
      label: "Read",
      children: (
        <div className="flex items-center justify-between p-4 mb-6">
          <div className="flex flex-col items-left space-x-4">
            <div>
              <h2 className="text-lg font-bold">Read</h2>
              <p className="text-sm font-regular text-gray-500 dark:text-gray-400">
                {`${readBooks.length} books`}
              </p>
            </div>
            <div className="flex mt-2 space-x-2">
              {readBooks?.map((book: any, index: number) => {
                return (
                  <Image
                    alt="Book cover"
                    height="200"
                    src={`https://covers.openlibrary.org/b/id/${book?.covers[0]}-L.jpg`}
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "contain",
                      borderRadius: "0.25rem",
                    }}
                    width="120"
                    onClick={() => onClickBook(book)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Liked",
      children: (
        <div className="flex items-center justify-between p-4 mb-6">
          <div className="flex flex-col items-left space-x-4">
            <div>
              <h2 className="text-lg font-bold">Liked</h2>
              <p className="text-sm font-regular text-gray-500 dark:text-gray-400">
                {`${likedBooks.length} books`}
              </p>
            </div>
            <div className="flex mt-2 space-x-2">
              {likedBooks?.map((book: any, index: number) => {
                return (
                  <Image
                    alt="Book cover"
                    height="200"
                    src={`https://covers.openlibrary.org/b/id/${book?.covers[0]}-L.jpg`}
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "contain",
                      borderRadius: "0.25rem",
                    }}
                    width="120"
                    onClick={() => onClickBook(book)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Readlist",
      children: (
        <div className="flex items-center justify-between p-4 mb-6">
          <div className="flex flex-col items-left space-x-4">
            <div>
              <h2 className="text-lg font-bold">Readlist</h2>
              <p className="text-sm font-regular text-gray-500 dark:text-gray-400">
                {`${toReadBooks.length} books`}
              </p>
            </div>
            <div className="flex mt-2 space-x-2">
              {toReadBooks?.map((book: any, index: number) => {
                return (
                  <Image
                    alt="Book cover"
                    height="200"
                    src={`https://covers.openlibrary.org/b/id/${book?.covers[0]}-L.jpg`}
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "fill",
                      borderRadius: "0.25rem",
                    }}
                    width="120"
                    onClick={() => onClickBook(book)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="pb-4 space-y-2 px-20">
        <div className="flex items-center space-x-4">
          {/* <Avatar className="w-12 h-12" /> */}
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AiOutlineUser />}
          />
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold">My Books</h1>
            <Button size="middle">Edit Profile</Button>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Reading enthusiast. Addicted to good books. 📚
        </p>
      </header>
      <div>
        <Tabs defaultActiveKey="1" items={items} type="card" />
        {/* <div className="flex items-center justify-between p-4">
          <div className="flex flex-col items-left space-x-4">
            <div>
              <h2 className="text-lg font-bold">Read</h2>
              <p className="text-sm font-regular text-gray-500 dark:text-gray-400">
                {`${readBooks.length} books`}
              </p>
            </div>
            <div className="flex mt-2 space-x-2">
              {readBooks?.map((book: any, index: number) => {
                return (
                  <Image
                    alt="Book cover"
                    height="200"
                    src={`https://covers.openlibrary.org/b/id/${book?.cover_edition_key}-L.jpg`}
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "contain",
                      borderRadius: "0.25rem",
                    }}
                    width="120"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col items-left space-x-4">
            <div>
              <h2 className="text-md font-bold">Liked</h2>
              <p className="text-sm font-regular text-gray-500 dark:text-gray-400">
                {`${likedBooks.length} books`}
              </p>
            </div>
            <div className="flex mt-2 space-x-2">
              {likedBooks?.map((book: any, index: number) => {
                return (
                  <Image
                    alt="Book cover"
                    height="160"
                    src={`https://covers.openlibrary.org/b/id/${book?.cover_edition_key}-L.jpg`}
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "contain",
                      borderRadius: "0.25rem",
                    }}
                    width="80"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col items-left space-x-4">
            <div>
              <h2 className="text-md font-bold">Read List</h2>
              <p className="text-sm font-regular text-gray-500 dark:text-gray-400">
                {`${toReadBooks.length} books`}
              </p>
            </div>
            <div className="flex mt-2 space-x-2">
              {toReadBooks?.map((book: any, index: number) => {
                return (
                  <Image
                    alt="Book cover"
                    height="160"
                    src={`https://covers.openlibrary.org/b/id/${book?.cover_edition_key}-L.jpg`}
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "fill",
                      borderRadius: "0.25rem",
                    }}
                    width="80"
                  />
                );
              })}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

const ProfilePage = () => {
  return withTheme(<Profile />);
};

export default ProfilePage;
