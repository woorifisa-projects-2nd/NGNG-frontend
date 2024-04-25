"use client";

import { useState } from "react";

export default function Search() {

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");


  const test = () => {

    const url = `http://localhost:8080/search/${keyword}/${page}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    fetch(url, options);
  }

  return <div className="text-slate-200">
    <button type="button" onClick={test}>123</button>
  </div>;
}
