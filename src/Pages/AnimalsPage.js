import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Animal from "../components/Animal";
import Breadcrumbs from "../components/Breadcrumbs";
import FriendsInfo from "../components/FriendsInfo";
import Loader from "../components/Loader";

export default function Animals() {
  const [animalInfo, setAnimalInfo] = useState([]);
  const [friendAnimalsData, setFriendAnimalsData] = useState([]);
  const [detailPage, setDetailPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [prev, setPrev] = useState([]);
  const tempFetchInfo = useRef();
  const tempFetchFriendsData = useRef();
  const tempFetchFriendsData2 = useRef();
  const tempPrev = useRef();

  const { id } = useParams();

  const { pathname } = useLocation();

  useEffect(() => {
    if (tempPrev.current.includes(pathname)) {
      return;
    }
    setPrev((prev) => [...prev, pathname]);
  }, [pathname]);

  tempPrev.current = prev;

  const fetchInfo = async (currID) => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${currID}`
    );
    const data = await response.json();
    const result = data;
    setAnimalInfo(result);
  };

  tempFetchInfo.current = fetchInfo;

  const fetchFriendsData = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${detailPage}/20`
    );
    const data = await response.json();
    const result = data.list;
    setFriendAnimalsData((prev) => [...prev, ...result]);
  };
  tempFetchFriendsData.current = fetchFriendsData;

  const fetchFriendData2 = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${detailPage}/20`
    );
    const data = await response.json();
    const result = data.list;
    setFriendAnimalsData(result);
  };

  tempFetchFriendsData2.current = fetchFriendData2;

  useEffect(() => {
    tempFetchInfo.current(id);
  }, [id]);

  useEffect(() => {
    tempFetchFriendsData.current();
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [detailPage]);

  useEffect(() => {
    tempFetchFriendsData2.current();
  }, [id]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setDetailPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Animal animalInfo={animalInfo} />
      <Breadcrumbs prev={prev} />
      <FriendsInfo friendAnimalsData={friendAnimalsData} />
      {loading && <Loader />}
    </div>
  );
}
