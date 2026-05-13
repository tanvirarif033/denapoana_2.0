import {

  Bar

} from "react-chartjs-2";

import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  BarElement,

  Tooltip,

  Legend

} from "chart.js";


ChartJS.register(

  CategoryScale,

  LinearScale,

  BarElement,

  Tooltip,

  Legend
);



function ProductAnalytics({
  products
}) {

  const data = {

    labels:
      products.map(
        (p) => p.title
      ),

    datasets: [

      {
        label:
          "Stock",

        data:
          products.map(
            (p) => p.stock
          )
      }
    ]
  };


  return (

    <div
      className="
      card
      border-0
      shadow-sm
      rounded-4
      p-4
      mb-4
      "
    >

      <h4 className="fw-bold mb-4">

        Product Analytics

      </h4>

      <Bar data={data} />

    </div>
  );
}

export default ProductAnalytics;