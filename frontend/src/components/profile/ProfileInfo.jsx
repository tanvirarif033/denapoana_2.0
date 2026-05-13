function ProfileInfo({

  formData,
  handleChange,
  handleSubmit,
  loading

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

      <h3
        className="
        fw-bold
        mb-4
        "
      >
        Profile Information
      </h3>


      <div className="row">

        {/* NAME */}
        <div className="col-md-6 mb-3">

          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"

            className="form-control"

            name="name"

            value={formData.name}

            onChange={handleChange}
          />

        </div>


        {/* PHONE */}
        <div className="col-md-6 mb-3">

          <label className="form-label">
            Phone
          </label>

          <input
            type="text"

            className="form-control"

            name="phone"

            value={formData.phone}

            onChange={handleChange}
          />

        </div>


        {/* ADDRESS */}
        <div className="col-12 mb-3">

          <label className="form-label">
            Address
          </label>

          <textarea
            rows="4"

            className="form-control"

            name="address"

            value={formData.address}

            onChange={handleChange}
          />

        </div>

      </div>


      <button
        className="
        btn btn-warning
        fw-bold
        "
        onClick={handleSubmit}
      >

        {
          loading
            ? "Updating..."
            : "Update Profile"
        }

      </button>

    </div>
  );
}

export default ProfileInfo;