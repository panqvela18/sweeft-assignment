import React from "react";
import { Link } from "react-router-dom";
import "./style/Animal.css";

export default function FriendsInfo({ friendAnimalsData }) {
  return (
    <>
      <h2 className="friends">Friend:</h2>
      <div className="cards">
        {friendAnimalsData.map((item, index) => {
          return (
            <Link
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`../animals/${item.id}`}
              className="card"
            >
              <img src={item.imageUrl + `?v=${item.id}`} alt={item.name} />
              <div className="text-box">
                <h3>
                  {item.prefix} {item.name} {item.lastName}
                </h3>
                <p>{item.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
