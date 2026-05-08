import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

function HomePage() {

  return (

    <>
      <Navbar />

      <div className="container py-5">

        <div
          className="
          bg-white
          p-5
          rounded
          shadow-sm
          text-center
          "
        >

          <h1
            className="
            fw-bold
            mb-3
            "
          >
            Welcome To DenPoana 2.0
          </h1>

          <p
            className="
            text-muted
            "
          >
            AI Powered Ecommerce Platform
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default HomePage;