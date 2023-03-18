import React from "react";
import { useEffect, useState, useRef } from "react";
import "../App";
import AnimalBox from "../components/AnimalBox";
import Loader from "../components/Loader";

export default function HomePage() {
  const [animalsData, setAnimalsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const tempFetchData = useRef();

  const fetchData = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`
    );
    const data = await response.json();
    const result = data.list;
    setAnimalsData((prev) => [...prev, ...result]);
  };

  tempFetchData.current = fetchData;

  useEffect(() => {
    tempFetchData.current();
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <h1 className="title">Sweeft Project</h1>
      <AnimalBox animalsData={animalsData} />
      {loading && <Loader />}
    </div>
  );
}
