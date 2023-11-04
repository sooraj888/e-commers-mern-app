import React from "react";
import "./ReviewCard.css";

import ReactStars from "react-rating-stars-component";
import DEFAULT_IMAGE from "../../assets/avatar.jpeg";

export default function ReviewsCard({ reviewDetails }: { reviewDetails: any }) {
  return (
    <div className="cardContainer">
      <div className="card">
        <img
          alt={`${reviewDetails?.user?.name} avatar`}
          className="avatar"
          src={DEFAULT_IMAGE}
        ></img>
        <div>Name : {reviewDetails?.name}</div>
        {reviewDetails?.rating && (
          <ReactStars
            value={reviewDetails?.rating}
            edit={false}
            color={"rgba(20,20,20,0.2)"}
            activeColor={"tomato"}
            isHalf={true}
            size={window.innerWidth < 600 ? 20 : 20}
          />
        )}
        <div className="description">
          <p>{reviewDetails?.comment}</p>
        </div>
      </div>
    </div>
  );
}
