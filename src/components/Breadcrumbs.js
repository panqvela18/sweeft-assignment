import React from "react";
import { Link } from "react-router-dom";
import "./style/Breadcrumbs.css";

export default function Breadcrumbs({ prev }) {
  return (
    <div className="breads">
      <div style={{ marginLeft: "20px" }}>
        <Link style={{ textDecoration: "none" }} to="/">
          <button className="btn">Home</button>
        </Link>
      </div>
      <div className="test">
        {prev.map((item) => {
          return (
            <div className="bread-with-arrow">
              <Link className="bread btn" key={item.split("/")[2]} to={item}>
                {item}
              </Link>
              <p style={{ marginLeft: "10px" }}>{`>`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
