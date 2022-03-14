import React,{useEffect,useState} from 'react';

import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import background from "../img/user.png";






export default function Order() {

let params = useParams();
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);
const [stuff, setStuff] = useState();




// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
useEffect(() => {
    fetch("https://test.webwinds.tech/api/store/customers/" + params.id)
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
   
console.log(items)
   
    return (

            <div>

<h2 className='pl-20 text-center text-white bg-gray-500 '> Viðskiptavinur </h2>
                
                <div className="py-6 ">
                <div className="flex max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
                    <div className="w-1/3 bg-cover" style={{ backgroundImage: `url(${background})` }} >
                    </div> 
                    <div className="w-2/3 p-4">
                    <h1 className="text-2xl font-bold text-gray-900">Viðskiptarnúmer : {items.id}</h1>
                    <p className="mt-2 text-sm text-gray-600">Viðskiptavinur : {items.name}</p>
                    <p className="mt-2 text-sm text-gray-600">Heimilisfang : {items.address}</p>



                    <div className="flex mt-2 item-center">
                      
                    </div>
                    <div className="flex justify-between mt-3 item-center">
                        <h1 className="text-xl font-bold text-gray-700"></h1>
                        <button className="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded"><Link to={`/`}>
                            Tilbaka
                        </Link></button>
                    </div>
                    </div>
                </div>
                </div>      
            </div>
        ); } }