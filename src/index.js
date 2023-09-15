import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import StarRating from './components/StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <App />

  </React.StrictMode>
);


function TestComp(){
  const [rating,SetRating] = useState(0)
  return <div>
    <StarRating onRatingSet={SetRating} color='green'/>
    <p>You rated this post {rating}</p>
  </div>
}


