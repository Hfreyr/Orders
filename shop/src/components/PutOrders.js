import React,{useState,useEffect} from "react";
import { useParams,Link } from "react-router-dom";




export default function PutOrders(){

let params = useParams();


const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);



const [id, setId] = useState();
const [name, setName] = useState("");
const [decscription , setDrescription] = useState("");
const [quan , setQuantity] = useState();
const [inprice, setPrice] = useState();


function selecItems (a){
    for(var i = 0; i < items.length; i++ ){
        if (a === items[i].id) {
           setId(a)
           setName(items[i].name)
           setDrescription(items[i].description)
           setQuantity(items[i].quantity )
           setPrice(items[i].price)
        } 
    }
};
let quantity = Number(quan)
let price = Number(inprice)
let it = {id,name,decscription,quantity,price}
/*console.warn(it)*/

    function update () {

     fetch("https://test.webwinds.tech/api/store/orders/" + params.id,
        {
        method:'PUT',
        headers :{
        
        /*Búinn að prófa missmunandi hérna en ég held að serverinn taki ekki við PUT / POST */ 
        },
        body:JSON.stringify({ products:it})}) /* búinn að gera bæði  { products:[it]} og { products:it} hvorugt virkar  */
            .then(response => { response.json()
            .then((resp) => { console.warn(resp)
              window.location.reload(true);
        } ) }
        );

    }

useEffect(() => {
fetch("https://test.webwinds.tech/api/store/orders/" + params.id)
.then(res => res.json())
.then(

(result) => {
    setIsLoaded(true);
    setItems(result.products);
},

(error) => {
    setIsLoaded(true);
    setError(error);
}
)
}, [params.id])


if (error) {
    return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
    return <div>Loading...</div>;
} else {
    return (
        <div>

            <h2 className='text-center text-white bg-gray-500'>
    <div> Pöntunarnúmer: {params.id} </div>
  </h2>
  <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Vörunúmer
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Nafn
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Lýsing á vöru
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Magn
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Verð
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Magn verð
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Uppfæra
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900" alt="">{item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900" alt="">{item.name}</div>
                </td>

                <td>
                  <div className="text-sm text-gray-900">{item.description}</div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.quantity}

                  </div>


                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}
                </td>


               

                <td className="px-6 py-4 whitespace-nowrap">{item.quantity * item.price}</td>
                
                
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button onClick={() => selecItems(item.id)} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">

                    Uppfæra

                  </button>
                </td>

              </tr>



              ))}

            </tbody>
          </table>
        </div>

      </div>


    </div>
    <div className='m-5'>
        <button className="float-right px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
        <Link to={`../Order/${params.id}` }>    Tilbaka     </Link>
        </button>
    </div>

  </div>


  <h2 className='text-center text-white bg-gray-500'>
                <div> Uppfæra Pöntun</div>
            </h2>
 
          <div className="flex bg-gray-50">
            
                <div  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Vörunúmer
                  <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                   type="text"  readOnly value={id}></input>
   
                </div>
                <div  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Nafn
                  <input onChange={(e) => {setName(e.target.value)}} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                   type="text" defaultValue={name} ></input>
   
                </div>
                <div onChange={(e) => {setDrescription(e.target.value)}} className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Lýsing á vöru
                  <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                  type="text" defaultValue={decscription} ></input>
 
                </div>
                <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Magn
                  <input onChange={(e) => {setQuantity(e.target.value)}} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                   type="number" defaultValue={quan} ></input>

                </div>

                <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Verð
                  <input onChange={(e) => {setPrice(e.target.value)}}  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                   type="number" defaultValue={inprice} ></input>

                </div>

               <div className="px-6 font-medium tracking-wider text-left text-gray-500 uppercase whitespace-nowrap">
                
            
                  <button onClick={update} className="px-4 py-2 text-white bg-blue-500 rounded mt-7 hover:bg-blue-700">

                  Vista!!

                  </button>
                
              </div>
            </div>


</div>
); }


}
