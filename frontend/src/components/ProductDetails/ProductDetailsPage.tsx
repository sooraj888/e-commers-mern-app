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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { product, loading, error, errorMessage } = useSelector(
    (state: any) => state.productDetails
  );

  const [ratings, setRatings] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const bottomAlert = useAlert();

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 20,
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails({ productId: id, navigation: navigate }));
    }
  }, [id, dispatch]);

  useEffect((): any => {
    if (error) {
      return bottomAlert.error(errorMessage);
    }
  }, [error]);

  useEffect(() => {
    setRatings(product?.ratings);
  }, [product]);

  return (
    <Fragment>
      <div className="productDetails">
        <div className="carouselContainer">
          <Carousel
            autoPlay={true}
            dynamicHeight
            emulateTouch
            interval={2000}
            preventMovementUntilSwipeScrollTolerance={false}
            showArrows={false}
            showThumbs={false}
            swipeable={true}
            thumbWidth={40}
            infiniteLoop={true}
          >
            {product?.image?.map((image: any, index: number) => {
              return (
                <div key={image?._id || index} className="productImage">
                  <img alt={`image ${index} slide`} src={image?.url} />
                  <p className="legend">{index + 1}</p>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="details">
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <div className="ratings">
            <span style={{ paddingRight: "10px" }}>Ratings</span>
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
          </div>
          <div className="price">
            <p>Price </p>
            <p> &#8377; {product?.price} </p>
          </div>
          <div className="category">
            <p>Category : </p>
            <pre> {product?.category} </pre>
          </div>
          <>{JSON.stringify(product)}</>
        </div>
      </div>
    </Fragment>
  );
}
