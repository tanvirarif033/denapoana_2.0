import {
  FaUser,
  FaBox
} from "react-icons/fa";


function ProfileSidebar({

  activeTab,
  setActiveTab

}) {

  return (

    <div
      className="
      card
      border-0
      shadow-sm
      p-4
      "
      style={{
        borderRadius: "15px"
      }}
    >

      <h4
        className="
        fw-bold
        mb-4
        "
      >
        Dashboard
      </h4>


      <div
        className="
        d-flex
        flex-column
        gap-3
        "
      >

        {/* PROFILE */}
        <button

          className={

            activeTab ===
            "profile"

              ? "btn btn-dark text-start"

              : "btn btn-outline-dark text-start"
          }

          onClick={() =>
            setActiveTab(
              "profile"
            )
          }
        >

          <FaUser className="me-2" />

          Profile

        </button>



        {/* ORDERS */}
        <button

          className={

            activeTab ===
            "orders"

              ? "btn btn-dark text-start"

              : "btn btn-outline-dark text-start"
          }

          onClick={() =>
            setActiveTab(
              "orders"
            )
          }
        >

          <FaBox className="me-2" />

          Order History

        </button>

      </div>

    </div>
  );
}

export default ProfileSidebar;