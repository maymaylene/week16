import { useState, useEffect }from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from 'react-router-dom'



function Name() {

const END_POINT = 'https://64cf0e8dffcda80aff519db4.mockapi.io/pizza'

const [orders, setOrders] = useState([{}])

//New Order Information
const [newOrderName, setNewOrderName] = useState('');
const [newOrderDate, setNewOrderDate] = useState('');
const [newOrderPrice, setNewOrderPrice] = useState('');
const [newOrderNo, setNewOrderNo] = useState('');

//Updated Order Information
const [updatedOrderName, setUpdatedOrderName] = useState('');
const [updatedOrderDate, setUpdatedOrderDate] = useState('');
const [updatedOrderPrice, setUpdatedOrderPrice] = useState('');
const [updatedOrderNo, setUpdatedOrderNo] = useState('');

function getOrders(){
    fetch(END_POINT)
    .then(data => data.json()
    .then(data => setOrders(data)))
}

useEffect(() => {
    getOrders()
    console.log(orders)
}, [])

function deleteOrder(id){
    fetch(`${END_POINT}/${id}`, {
        method: 'DELETE'
    }).then(() => getOrders())  //update our orders once we delete
}

function postOrder(e){
    e.preventDefault()

    fetch(END_POINT, {
        method: 'POST',
        headers: {'Contenet-Type': 'application/json'},
        body: JSON.stringify({
            name: newOrderName,
            date: newOrderDate,
            price: newOrderPrice,
            orderN: newOrderNo
        })
    }).then(() => getOrders())
}

function updateOrder(e, orderObject){
    e.preventDefault()

let updatedOrderObject = {
    ...orderObject,
    name: updatedOrderName,
    date: updatedOrderDate,
    price: updatedOrderPrice,
    orderN: updatedOrderNo,
}

    fetch(`${END_POINT}/${orderObject.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedOrderObject), 
        headers: {"Content-Type": "Application/json"}
    }).then(() => getOrders())
}

return(
    <div>
        <nav>

</nav>
        <div className='newOrder'>
        <form>
            <h3>Add new order: </h3>
            <label>Name for the order:</label>
            <input onChange={(e) => setNewOrderName(e.target.value)}></input>
            <label>Date order was made:</label>
            <input onChange={(e) => setNewOrderDate(e.target.value)}></input>
            <label>Price of the order:</label>
            <input onChange={(e) => setNewOrderPrice(e.target.value)}></input>
            <label>Order number:</label>
            <input onChange={(e) => setNewOrderNo(e.target.value)}></input>
            <button className='newButton' onClick={(e) => postOrder(e, orders)}>Add new order</button>
        </form>
        </div>
        <h4>Current orders:</h4>
        {orders.map((order, index) => (
        <div className='currentOrders' key={index}>
            <div className='updateOrders'>
                <h3>Update order: </h3>
                <label>Update Name for Order</label>
                <input onChange={(e) => setUpdatedOrderName(e.target.value)}></input><br></br>
                <label>Update Date for Order</label>
                <input onChange={(e) => setUpdatedOrderDate(e.target.value)}></input><br></br>
                <label>Update Price for Order</label>
                <input onChange={(e) => setUpdatedOrderPrice(e.target.value)}></input><br></br>
                <label>Update OrderNumber</label>
                <input onChange={(e) => setUpdatedOrderNo(e.target.value)}></input><br></br> 
                <button onClick={() => updateOrder(e, orders)}>Update order</button>
            </div>           
            <div className='deleteOrder'> 
            <h3>Delete Order: </h3>              
                Name for the order: {order.name}<br></br>
                Date order was made: {order.date}<br></br>
                Price of the order: {order.price}<br></br>
                Order number: {order.orderN}<br></br>
                <button  onClick={() => deleteOrder(order.id)}>Delete Order</button>
            </div>
        </div>
        ))}
        
    </div>
)
}

export default Name 