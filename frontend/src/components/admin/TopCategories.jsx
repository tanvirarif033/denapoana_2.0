function TopCategories({

categories=[]

}){


return(

<div
className="
card
border-0
shadow-sm
rounded-4
p-4
h-100
"
>

<h2
className="
fw-bold
mb-4
"
>

Top Categories

</h2>


{

categories.length===0 ?

(

<p>

No category data

</p>

)

:

categories.map(

(item,index)=>(

<div

key={index}

className="
d-flex
justify-content-between
border-bottom
py-2
"

>

<span>

{item.category}

</span>

<b>

Sold:
{item.totalSold}

</b>

</div>

)

)

}

</div>

)

}

export default TopCategories;