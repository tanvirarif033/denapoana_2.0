import {
  useNavigate
} from "react-router-dom";

import toast
from "react-hot-toast";

import {
  useAuth
} from "../../context/AuthContext";



function AIRecommendationButton({
  product
}) {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();


  const askAI = () => {

    // login check
    if (!user) {

      toast.error(
        "You have to login first"
      );

      return navigate("/login");
    }

    // redirect to ai page
    navigate(
      `/ai-chat/${product.id}`
    );
  };


  return (

    <button
      className="
      btn btn-dark
      mt-4
      "
      onClick={askAI}
    >
      Ask AI About This Product
    </button>
  );
}

export default AIRecommendationButton;