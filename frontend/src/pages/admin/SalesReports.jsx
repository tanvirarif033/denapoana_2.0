import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import AdminSidebar
from "../../components/admin/AdminSidebar";



function SalesReports() {

  return (

    <>
      <Navbar />

      <div className="container py-5">

        <div className="row">

          {/* SIDEBAR */}
          <div className="col-lg-3">

            <AdminSidebar />

          </div>


          {/* CONTENT */}
          <div className="col-lg-9">

            <div
              className="
              card
              border-0
              shadow-sm
              rounded-4
              p-4
              "
            >

              <h2 className="fw-bold">
                Add Product
              </h2>

              <p className="text-muted">
                Product form coming next step...
              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default SalesReports;