import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Animal from "../components/Animal";
import FriendsInfo from "../components/FriendsInfo";
import Loader from "../components/Loader";

export default function Animals() {
  const [animalInfo, setAnimalInfo] = useState([]);
  const [friendAnimalsData, setFriendAnimalsData] = useState([]);
  const [detailPage, setDetailPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [prevFrined, setPrevFriend] = useState([]);

  const { id } = useParams();

  const location = useLocation();

  const tests = location.pathname;
  console.log(tests);
  setPrevFriend([...prevFrined, tests]);

  console.log(prevFrined);

  const fetchInfo = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    );
    const data = await response.json();
    const result = data;
    setAnimalInfo(result);
  };

  const fetchFriendsData = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${detailPage}/20`
    );
    const data = await response.json();
    const result = data.list;
    setFriendAnimalsData((prev) => [...prev, ...result]);
  };

  const fetchFriendData2 = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${detailPage}/20`
    );
    const data = await response.json();
    const result = data.list;
    setFriendAnimalsData(result);
  };

  useEffect(() => {
    fetchInfo();
  }, [id]);

  useEffect(() => {
    fetchFriendsData();
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [detailPage]);

  useEffect(() => {
    fetchFriendData2();
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
      <FriendsInfo friendAnimalsData={friendAnimalsData} />
      {loading && <Loader />}
    </div>
  );
}
