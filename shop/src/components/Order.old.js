import React,{useEffect,useState} from 'react';

import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

export default function Order() {

let params = useParams();
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);
const [entries,setEntries] = ([]);

// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
useEffect(() => {
    fetch("https://test.webwinds.tech/api/store/orders/" + params.id)
    .then(res => res.json())
    .then(
    (result) => {
        setIsLoaded(true);
        setItems(result);
        setEntries(Object.entries(items));

    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
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
   
    /* 
    console.log(items.customer.id +  "  --  " + items.customer.name + "  --  " + items.customer.address)
    */
    const propertyNames = Object.keys(items);
    

console.log(propertyNames);


const entries = Object.entries(items);

 const aaaa = JSON.stringify(items)





    return (

            <div>

                {entries.products.map( (it, index)=> (
                    <React.Fragment key={index}>
                        {it.map((i , index) => (
                            <div key={index}>
                                <div>{i.id}</div>
                                <div>{i.name} </div>
                                <div>{i.description}</div>
                                
                            </div>
                         ))}
                    </React.Fragment>
                ))}
    

                {
                JSON.stringify(items.products)
                } 



 

            
 </div>




);

}
}