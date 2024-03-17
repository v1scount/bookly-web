"use client";
import { Input } from "antd";
const { Search } = Input;
import { useState } from "react";
import axios from "axios";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/lib/store";
// import { parseSearch } from "@/utils/helpers";

export default function SearchInput() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [searchDropdrown, setSearchDropdown] = useState<boolean>(false);
  const setBookDetail = useAppStore((state) => state.setBookDetail);

  const onClickBook = (doc: any) => {
    let book = {
      key: doc?.key,
      cover_i: doc?.cover_i,
      title: doc?.title,
      author_name: doc?.author_name,
      cover_edition_key: doc?.cover_edition_key,
    };
    setBookDetail(book);
    router.push(`${book?.key}`);
    setSearchDropdown(false);
    setSearchResults([]);
  };

  const parseSearch = (docs: any) => {
    return docs?.map((doc: any, index: number) => {
      return {
        key: index,
        label: (
          <div
            className="flex flex-row w-full"
            onClick={() => onClickBook(doc)}
          >
            <p>
              {doc?.title} -{" "}
              {doc?.author_name?.map((author: any) => (
                <p>{author}</p>
              ))}
            </p>
          </div>
        ),
      };
    });
  };

  const handleSearch = async (query: string) => {
    axios
      .get(
        `https://openlibrary.org/search.json?title=${query}&_spellcheck_count=0&limit=10&fields=key,cover_i,title,subtitle,author_name,name,cover_edition_key&mode=everything&sort=rating`
      )
      .then((response) => {
        setSearchResults(parseSearch(response.data?.docs));
        setSearchDropdown(true);
        return response.data;
      });
  };

  const closeDropdown = () => {
    setSearchDropdown(false);
  };

  return (
    <div>
      <Dropdown
        menu={{ items: searchResults }}
        open={searchDropdrown}
        destroyPopupOnHide
      >
        <Search
          placeholder="Search"
          onSearch={(value) => handleSearch(value)}
          style={{ background: 'white', borderRadius: 4 }}
          // allowClear
          onBlur={closeDropdown}
        />
      </Dropdown>
    </div>
  );
}
