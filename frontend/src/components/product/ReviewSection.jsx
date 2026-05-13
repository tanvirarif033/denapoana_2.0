import {
  useState
} from "react";

import {
  FaStar
} from "react-icons/fa";

import toast
from "react-hot-toast";



function ReviewSection({
  reviews = []
}) {

  const [comment, setComment] =
    useState("");

  const [rating, setRating] =
    useState(5);


  // submit review
  const submitReview = () => {

    toast.success(
      "Review Submitted"
    );

    setComment("");
  };


  return (

    <div className="mt-5">

      <h3
        className="
        fw-bold
        mb-4
        "
      >
        Reviews
      </h3>


      {/* ADD REVIEW */}
      <div
        className="
        bg-white
        p-4
        rounded
        shadow-sm
        mb-5
        "
      >

        <h5>Add Review</h5>

        <div className="mb-3">

          <select
            className="form-select"

            value={rating}

            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
          >

            <option value="5">
              5 Star
            </option>

            <option value="4">
              4 Star
            </option>

            <option value="3">
              3 Star
            </option>

            <option value="2">
              2 Star
            </option>

            <option value="1">
              1 Star
            </option>

          </select>

        </div>


        <textarea
          className="form-control"

          rows="4"

          placeholder="Write your review..."

          value={comment}

          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
        />

        <button
          className="
          btn btn-warning
          mt-3
          "
          onClick={submitReview}
        >
          Submit Review
        </button>

      </div>


      {/* REVIEWS */}
      {
        reviews.map((review) => (

          <div
            key={review.id}

            className="
            bg-white
            p-4
            rounded
            shadow-sm
            mb-3
            "
          >

            <div
              className="
              d-flex
              justify-content-between
              "
            >

              <h6
                className="
                fw-bold
                "
              >
                {review.user?.name}
              </h6>


              <div
                className="
                d-flex
                align-items-center
                gap-1
                "
              >

                <FaStar color="orange" />

                {review.rating}

              </div>

            </div>


            <p
              className="
              text-muted
              mt-2
              "
            >
              {review.comment}
            </p>

          </div>
        ))
      }

    </div>
  );
}

export default ReviewSection;