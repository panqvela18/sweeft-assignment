import React from "react";
import { Link } from "react-router-dom";
import "./style/AnimalBox.css";

export default function AnimalBox({ animalsData }) {
  return (
    <div className="cards">
      {animalsData.map((item, index) => {
        return (
          <Link
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
            to={`animals/${item.id}`}
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
  );
}
