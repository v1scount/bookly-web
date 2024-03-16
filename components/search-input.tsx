"use client";
import { Input } from "antd";
const { Search } = Input;
import { useState } from "react";
import axios from "axios";
import { Dropdown, Space } from "antd";

export default function SearchInput() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: string) => {
    axios
      .get(
        `https://openlibrary.org/search.json?title=${query}&_spellcheck_count=0&limit=10&fields=key,cover_i,title,subtitle,author_name,name&mode=everything`
      )
      .then((response) => {
        setSearchResults(response.data?.docs);
        // console.log('data',)
        return response.data;
      });
  };
  // console.log(searchTerm)
  return (
    <Dropdown menu={{ items: searchResults }}>
      <Search
        placeholder="Search"
        onSearch={(value) => handleSearch(value)}
        style={{ width: "32%" }}
      />
    </Dropdown>
  );
}
