import React from 'react';
// instead of importing all all resources in a libray, 
// curly bracket means just import the method called
// render in react-dom library
import { render } from 'react-dom';

// import help.js
import { getFunName } from '../helpers';
//ES6 class
//
class StorePicker extends React.Component {

  //constructor() {
  //  super();
  //  this.goToStore = this.goToStore.bind(this);
  //}

  goToStore(event) {
    // preventDefault will prevent source of event being triggered.
    // In this case, form submit will be stopped
    event.preventDefault();

    //In React, try to keep away from manipulating DOM element no mater it is
    //using jQuery or other techniques. In React, we can use "ref" which acts
    //exactly the same with manipulating DOM but more efficiently

    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    this.context.router.transitionTo(`/store/${storeId}`);
    
  }

  //ES6 syntax is alike:
  //public functon render(){...}
  render() {

    // JSX allows writing HTML right inside JavaScript
    // Typical ways creating THML element is like
    // Html tag, css class name, and contents are argment in createElement
    // respectively
    // React.createElement('p', {className: 'Testing'}, 'I love you');

    // JSX
    return (
      // typically CSS's class is used to specify the 
      // style you want to apply on a html element. 
      // However, the class is preseved keywork in JavaScript
      // which is not allowed in JSX. Instead, you should
      // use className
      //
      // Second, JSX only allows returning one parent node element
      // for exmaple, the below one will produce error 
      // return (
      //   <form><div>hello</div></form>
      //   <p>hello</p>
      // )
      //<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        {/* comment in JSX */}
        <h2>Please enter a Store</h2>
        <input type="text" required placeholder="Store name" 
      defaultValue={getFunName("")} ref={(input) => {this.storeInput = input}}  />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

// context
StorePicker.contextTypes = {
  router: React.PropTypes.object
};

// this is important to allow StorePicker to be used by 
// by other components
export default StorePicker
