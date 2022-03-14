import React from 'react';


import { 
  Routes, 
  Route
} from 'react-router-dom';

import "./output.css";
import CustomersOrders from './components/CustomersOrders';
import Head from './components/Head';
import GetOrder from './components/GetOrder';
import Customer from './components/Customer';
import PutOrder from './components/PutOrders';

function App() {
  return (
    <div className=''>
    
  
    < Head />
    <Routes>
      <Route path="/" element={<CustomersOrders />} />
      <Route path="/Order/:id" element={<GetOrder />} />
      <Route path="/Customer/:id" element={<Customer />} />
      <Route path='/PutOrder/:id' element={<PutOrder /> } />
    </Routes>

    </div>
   
  );
}

export default App;
