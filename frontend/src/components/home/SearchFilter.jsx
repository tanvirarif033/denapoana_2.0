function SearchFilter({

  search,
  setSearch,

  category,
  setCategory,

  sort,
  setSort
}) {

  return (

    <div
      className="
      bg-white
      p-3
      rounded
      shadow-sm
      mb-4
      "
    >

      <div className="row g-3">

        {/* SEARCH */}
        <div className="col-md-4">

          <input
            type="text"

            className="form-control"

            placeholder="Search products..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        {/* CATEGORY */}
        <div className="col-md-4">

          <select
            className="form-select"

            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >

            <option value="">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Gaming">
              Gaming
            </option>

          </select>

        </div>


        {/* SORT */}
        <div className="col-md-4">

          <select
            className="form-select"

            value={sort}

            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
          >

            <option value="">
              Sort By
            </option>

            <option value="lowToHigh">
              Price Low To High
            </option>

            <option value="highToLow">
              Price High To Low
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default SearchFilter;