import React, { useState } from "react";
import "./Search.css";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Search() {
  const [searchText, setSearchText] = useState<any>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleOnSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/products?search=${searchText}`);
  };
  return (
    <form className="search" onSubmit={handleOnSubmitSearch}>
      <input
        autoFocus
        placeholder="Search any product"
        type="text"
        required
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <button>Search</button>
    </form>
  );
}
