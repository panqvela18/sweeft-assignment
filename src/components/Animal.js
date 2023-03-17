import React from "react";
import "./style/Animal.css";

export default function Animal({ animalInfo }) {
  return (
    <>
      <h1 className="animal-detail-title"> Animal Details</h1>
      <div className="animal-info-card">
        <img
          src={animalInfo.imageUrl + `?v=${animalInfo.id}`}
          alt="animalinfo"
        />
        <div className="animal-info">
          <div className="info">
            <h4>Info</h4>
            <h3>
              {animalInfo.prefix} {animalInfo.name} {animalInfo.lastName}{" "}
            </h3>
            <span>{animalInfo.title}</span>
            <br />
            <div className="contact-info">
              <span>Email: {animalInfo.email}</span>
              <span>Ip Adress: {animalInfo.ip}</span>
              <span>Job Area:{animalInfo.jobArea}</span>
              <span>Job Type: {animalInfo.jobType}</span>
            </div>
          </div>

          <div className="info">
            {animalInfo.company === undefined ? (
              <div></div>
            ) : (
              <>
                <h4>Address</h4>
                <h3>
                  {animalInfo.company.name} {animalInfo.company.suffix}
                </h3>
                <br />
                <span>City: {animalInfo.address.city}</span>
                <span>Country: {animalInfo.address.country}</span>
                <span>State:{animalInfo.address.state}</span>
                <span>Street Address: {animalInfo.address.streetAddress}</span>
                <span>ZIP: {animalInfo.address.zipCode}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
