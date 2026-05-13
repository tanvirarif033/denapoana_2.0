import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";


function DashboardPage() {

  return (

    <>
      <Navbar />

      <div className="container py-5">

        <div
          className="
          card
          border-0
          shadow-sm
          p-5
          text-center
          "
          style={{
            borderRadius: "15px"
          }}
        >

          <h1
            className="
            fw-bold
            mb-3
            "
          >
            User Dashboard
          </h1>

          <p className="text-muted">
            Welcome to your account dashboard
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default DashboardPage;