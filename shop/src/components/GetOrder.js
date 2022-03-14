import React,{useEffect,useState} from 'react';

import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

export default function Order() {

let params = useParams();
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);
const [customer, setCustomer] = useState([]);
const [id,setId] = useState();
const [home, setHome] = useState();


// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
useEffect(() => {
    fetch("https://test.webwinds.tech/api/store/orders/" + params.id)
    .then(res => res.json())
    .then(
        
    (result) => {
        setIsLoaded(true);
        setItems(result.products);
        setCustomer(result.customer);
        setId(result.id);
        setHome(result.homeDelivery);
        

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

                <h2 className='flex justify-between pl-20 text-center text-white bg-gray-500'> <div> Pöntunarnúmer: {id} </div> <div>Viðskiptavinur : {customer.name + "  " + customer.address} </div> <div className='float-right mr-32'>Heimsending : {home ? 'Já' : 'Nei'}</div></h2>
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
                                <td className="px-6 py-4 ">
                                <div className="text-sm text-gray-900">{item.description}</div>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.quantity}
                                
                                </div>
                                

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.price}
                                </td>

                                <td  className="px-6 py-4 whitespace-nowrap">{item.quantity * item.price}</td>

                            </tr>



                            ))}
                            </tbody>
                        </table>
                        </div>
                    
                    </div>


                    </div>
                </div>
                    <div className='float-right m-10'>
                        <button className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"> <Link to={`/`}>
                        Tilbaka
                        </Link></button>
                
                        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        <Link 
                            to={`../PutOrder/${id}` } 
                            state={{ instructor_id: [items]}}
                            
                        >
                        Uppfæra pöntun
                        </Link></button>
                        </div>    
            </div>
        ); } }