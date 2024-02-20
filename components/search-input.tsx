"use client"
import { Input } from "antd";
const { Search } = Input;
import { useState } from "react";
import axios from 'axios';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState(null);

  const handleSearch = async (query:string) => {
    axios.get(`https://openlibrary.org/search.json?title=${query}&_spellcheck_count=0&limit=10&fields=key,cover_i,title,subtitle,author_name,name&mode=everything`)
    .then((response) => {
      setSearchTerm(response.data)
      return response.data
    })
    
  };
  console.log(searchTerm)
  return (
    <Search
      placeholder="Search"
      onSearch={(value) => handleSearch(value)}
      style={{ width: "32%" }}
    />
  );
}