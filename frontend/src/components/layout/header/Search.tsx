import React, { useState } from "react";
import "./Search.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "./Title";
export default function Search({
  setShowSearch,
}: {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleOnSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSearch(false);
    navigate(`/products?search=${searchText}`);
  };
  return (
    <form className={`search `} onSubmit={handleOnSubmitSearch}>
      <button
        className="closeSearch"
        type="button"
        onClick={() => {
          setShowSearch(false);
        }}
      >
        Close
      </button>
      <div>
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
      </div>
    </form>
  );
}
