import {
  FaTrash
} from "react-icons/fa";


function ProfileImage({

  user,

  imagePreview,

  handleImageChange,

  handleDeleteImage

}) {

  return (

    <div
      className="
      card
      border-0
      shadow-sm
      p-4
      mb-4
      text-center
      "
      style={{
        borderRadius: "15px"
      }}
    >

      {/* PROFILE IMAGE */}
      <img

        src={

          imagePreview ||

          user?.profilePicture ||

          "https://i.imgur.com/HeIi0wU.png"
        }

        alt="profile"

        className="
        rounded-circle
        mx-auto
        mb-4
        "

        style={{
          width: "130px",
          height: "130px",
          objectFit: "cover",
          border: "4px solid #ffc107"
        }}
      />


      {/* FILE INPUT */}
      <input
        type="file"

        className="form-control"

        accept="image/*"

        onChange={
          handleImageChange
        }
      />


      {/* DELETE BUTTON */}
      {
        user?.profilePicture && (

          <button
            className="
            btn btn-danger
            mt-3
            "
            onClick={
              handleDeleteImage
            }
          >

            <FaTrash className="me-2" />

            Delete Photo

          </button>
        )
      }

    </div>
  );
}

export default ProfileImage;