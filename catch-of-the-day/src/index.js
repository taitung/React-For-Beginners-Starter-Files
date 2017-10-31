import React from 'react';
// instead of importing all all methods in a libray, 
// curly bracket means just import the method called
// render in react-dom library
import { render } from 'react-dom';
//Importing CSS like following line will
//make Webpack to compile the css file but also
//allow embedding css into JSX

import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';

import NotFound from './components/NotFound';

import App from './components/App';
// import StorePicker
import StorePicker from './components/StorePicker';

const Root = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

// JSX syntax <StorePicker />
render(<Root/>, document.querySelector('#main')); 
