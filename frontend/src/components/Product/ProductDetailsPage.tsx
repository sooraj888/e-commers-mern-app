import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getProductDetails } from "../../redux/product/productDetailsSlice";
import { useAlert } from "react-alert";
import "./ProductDetails.css";
import { Carousel } from "react-responsive-carousel";
import { idText } from "typescript";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactStars from "react-rating-stars-component";
import ReviewsCard from "./ReviewsCard";
import Loader from "../layout/Loader/Loader";
import { getAllProducts } from "../../redux/product/productSlice";
import Title from "../layout/header/Title";

const reviews = [
  {
    user: "65158a45f0d4d4b470d25299",
    name: "sooraj",
    rating: 3,
    comment: "v product",
    _id: "6544fff9dfe90e78e28e1958",
  },
  {
    user: "65158a45f0d4d4b470d25299",
    name: "sooraj",
    rating: 3,
    comment: "v product",
    _id: "6544fff9dfe90e78e28e1951",
  },
  {
    user: "65158a45f0d4d4b470d25299",
    name: "sooraj",
    rating: 3,
    comment: "v product",
    _id: "6544fff9dfe90e78e28e1952",
  },
  {
    user: "65158a45f0d4d4b470d25299",
    name: "sooraj",
    rating: 3,
    comment: "v product",
    _id: "6544fff9dfe90e78e28e1953",
  },
  {
    user: "65158a45f0d4d4b470d25299",
    name: "sooraj",
    rating: 3,
    comment: "v product",
    _id: "6544fff9dfe90e78e28e1954",
  },
  {
    user: "65158a45f0d4d4b470d25299",
    name: "sooraj",
    rating: 3,
    comment: "v product",
    _id: "6544fff9dfe90e78e28e195",
  },
];

const options = {
  edit: false,
  color: "rgba(20,20,20,0.2)",
  activeColor: "tomato",
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 20,
};

const carouselOptions = {
  autoPlay: true,
  dynamicHeight: true,
  emulateTouch: true,
  interval: 2000,
  preventMovementUntilSwipeScrollTolerance: false,
  showArrows: false,
  showThumbs: false,
  swipeable: true,
  thumbWidth: 40,
  infiniteLoop: true,
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { product, loading, error, errorMessage } = useSelector(
    (state: any) => state.productDetails
  );

  const [ratings, setRatings] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const bottomAlert = useAlert();

  useEffect((): any => {
    if (error) {
      return bottomAlert.error(errorMessage);
    }
    if (id) {
      dispatch(getProductDetails({ productId: id, navigation: navigate }));
    }
  }, [id, dispatch, , error, bottomAlert]);

  useEffect(() => {
    setRatings(product?.ratings);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return loading ? (
    <>
      <Title>Loading</Title>
      <Loader />
    </>
  ) : (
    <Fragment>
      <Title>Product Details</Title>
      <div className="productDetails">
        <div className="carouselContainer">
          <Carousel {...carouselOptions}>
            {product?.image?.map((image: any, index: number) => {
              return (
                <div className="productImage" key={image?._id || index}>
                  <img alt={`image ${index} slide`} src={image?.url} />
                  <p className="legend">{index + 1}</p>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="details">
          <div className="block-1">
            <h2>{product?.name}</h2>
            <h6>product #{product?._id}</h6>
          </div>
          <div className="block-2">
            <span>
              {ratings && (
                <ReactStars
                  value={ratings}
                  edit={false}
                  color={"rgba(20,20,20,0.2)"}
                  activeColor={"tomato"}
                  isHalf={true}
                  size={window.innerWidth < 600 ? 20 : 20}
                />
              )}
            </span>
            <h5>{`(${product?.numOfReviews}  ${
              Number(product?.numOfReviews) == 1 ? "review" : "reviews"
            })`}</h5>
          </div>
          <div className="block-3">
            <div>
              <h1>&#8377;{product?.price} </h1>
            </div>
            <div className="block-3-1">
              <span className="block-3-1-1">
                <button onClick={() => {}}>-</button>
                <input type="number" value={0} onChange={() => {}}></input>
                <button onClick={() => {}}>+</button>
              </span>
              <span className="block-3-1-2">
                <button onClick={() => {}}>Add to Cart</button>
              </span>
            </div>
          </div>
          <div className="block-4">
            Status :
            <span
              className={Number(product?.stock) > 0 ? "greenColor" : "redColor"}
            >
              {Number(product?.stock) > 0 ? "InStock" : "OutOfStock"}
            </span>
          </div>
          <div className="block-5">
            Description <p>{product?.description}</p>
          </div>
          <div className="block-6">
            Category :<p> {product?.category} </p>
          </div>
          <div className="block-7">
            <button>Submit Review</button>
          </div>
        </div>
      </div>

      <h3 className="reviews-h3">REVIEWS</h3>
      {product?.reviews?.length > 0 ? (
        <div className="review">
          {product?.reviews?.map((reviewDetails: any, index: number) => {
            return (
              <ReviewsCard
                reviewDetails={reviewDetails}
                key={reviewDetails?._id || index}
              />
            );
          })}
        </div>
      ) : (
        <div className="no-reviews">No Reviews at</div>
      )}
    </Fragment>
  );
}
