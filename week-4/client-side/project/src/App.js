import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then(data => {
        console.log("Data from api is :", data);
        setCustomers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div className="">
      <div>
      <h1>User List</h1>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Address</th>
    </tr>
  </thead>
  <tbody>
    {customers.map(customer => (
      <tr key={customer.address}>
        <td>{customer.id}</td>
        <td>{customer.name}</td>
        <td>{customer.address}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
    </div>
  );
}

export default App;
