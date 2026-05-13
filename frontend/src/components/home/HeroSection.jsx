function HeroSection() {

  return (

    <div
      className="
      bg-dark
      text-white
      py-5
      "
    >

      <div className="container">

        <div className="row align-items-center">

          <div className="col-lg-6">

            <h1
              className="
              display-4
              fw-bold
              "
            >
              Shop Smart With AI
            </h1>

            <p
              className="
              mt-3
              fs-5
              "
            >
              DenaPoana 2.0 helps you
              discover the best products
              with AI recommendations.
            </p>

            <button
              className="
              btn btn-warning
              btn-lg
              mt-3
              "
            >
              Explore Products
            </button>

          </div>


          <div className="col-lg-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f"

              alt="hero"

              className="
              img-fluid
              rounded
              shadow
              "
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default HeroSection;