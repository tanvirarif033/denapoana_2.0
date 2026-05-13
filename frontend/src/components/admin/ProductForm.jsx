import {
  useState
} from "react";



function ProductForm({
  initialData = {},
  onSubmit,
  loading
}) {

  const [formData, setFormData] =
    useState({

      title:
        initialData.title || "",

      description:
        initialData.description || "",

      price:
        initialData.price || "",

      category:
        initialData.category || "",

      stock:
        initialData.stock || ""
    });


  const [images, setImages] =
    useState([]);


  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };


  const handleSubmit =
    (e) => {

      e.preventDefault();

      const data =
        new FormData();


      Object.keys(formData)
        .forEach((key) => {

          data.append(
            key,
            formData[key]
          );
        });


      for (
        let i = 0;
        i < images.length;
        i++
      ) {

        data.append(
          "images",
          images[i]
        );
      }


      onSubmit(data);
    };


  return (

    <form onSubmit={handleSubmit}>

      <div className="mb-3">

        <label className="fw-bold">
          Product Title
        </label>

        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />

      </div>


      <div className="mb-3">

        <label className="fw-bold">
          Description
        </label>

        <textarea
          name="description"
          rows="4"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          required
        />

      </div>


      <div className="row">

        <div className="col-md-6">

          <div className="mb-3">

            <label className="fw-bold">
              Price
            </label>

            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />

          </div>

        </div>


        <div className="col-md-6">

          <div className="mb-3">

            <label className="fw-bold">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              className="form-control"
              value={formData.stock}
              onChange={handleChange}
              required
            />

          </div>

        </div>

      </div>


      <div className="mb-3">

        <label className="fw-bold">
          Category
        </label>

        <input
          type="text"
          name="category"
          className="form-control"
          value={formData.category}
          onChange={handleChange}
          required
        />

      </div>


      <div className="mb-4">

        <label className="fw-bold">
          Product Images
        </label>

        <input
          type="file"
          multiple
          className="form-control"
          onChange={(e) =>
            setImages(e.target.files)
          }
        />

      </div>


      <button
        className="
        btn btn-warning
        fw-bold
        w-100
        "
      >

        {
          loading
            ? "Loading..."
            : "Save Product"
        }

      </button>

    </form>
  );
}

export default ProductForm;