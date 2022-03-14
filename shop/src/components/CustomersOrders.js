import React,{ useEffect,useState} from 'react';

import {Link} from "react-router-dom";


export default function Customers() {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);
// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
useEffect(() => {
fetch("https://test.webwinds.tech/api/store/orders")
.then(res => res.json())
.then(
(result) => {
setIsLoaded(true);
setItems(result);
},
// Note: it's important to handle errors here
// instead of a catch() block so that we don't swallow
// exceptions from actual bugs in components.
(error) => {
setIsLoaded(true);
setError(error);
}
)
}, [])

if (error) {
return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
return <div>Loading...</div>;
} else {
return (
<div>
  <h2 className='text-center text-white bg-gray-500'>Pantanir</h2>
  <div className="flex flex-col ">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Pöntunarnúmer
                </th>

                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Viðskiptavins Númer
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Nafn
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Heimilisfang
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                 Heimsending
                </th>
                <th scope="col"  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                 Skoða
                </th>
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900" alt="">{item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900" alt="">
                  <button className='bg-gray-100 border-2 border-slate-200 hover:shadow-2xl hover:bg-gray-300'>  
                   
                          <Link to={`Customer/${item.customer.id}`}>Skoða</Link> 
                  </button>
                    
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.customer.name}</div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.customer.address}</div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={item.homeDelivery ? 'text-green-900' : 'text-red-900' }>
                    {item.homeDelivery ? 'Já' : 'Nei'}
                  </span>
                </td>

                <td>
                  <div>
                    
                    <button className='bg-gray-100 border-2 border-slate-200 hover:shadow-2xl hover:bg-gray-300'>  
                    <Link to={`Order/${item.id}`}>
                            Skoða pöntun
                        </Link>
                   
                        </button>  


                  </div>
                  


                </td>

           
              </tr>



              ))}
            </tbody>
          </table>
        </div>

      </div>


    </div>
  </div>

</div>

);
}
}