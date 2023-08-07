import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Orders from './Components/oders';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomerQuestion from './Components/customerQuestion';
import CustomerReview from './Components/customerReview';

export default function App() 
  
  {
  return (
    <div>
      <div>
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/questions'>Questions</Link>
          </li>
          <li>
            <Link to='/Reviews'>Reviews</Link>
          </li>
        </ul>                                                                                                                                                                 
        <Switch>
        <Route path='/'>
            <Home />
          </Route>
          <Route path='/question'>
            <Question faq={['What is the refund policy?', 'Is there free shipping?']}/>
          </Route>
          <Route path='/Reviews'>
            <Reviews reviews={Reviews}/>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
      <h1>Check todays Orders!</h1>
      <Orders/>
    </div>
  );

  }
function Home(){
  return(
    <h2>Home</h2>
  )
}

function Question(){
  return(
    <div>
      <ul>
        <li>
          <CustomerQuestion/>
        </li>
      </ul>
    </div>
  )
}

function Reviews(){
  return(
    <div>
      <ul>
        <li>
          <CustomerReview/>
        </li>
      </ul>
    </div>
  )
}
