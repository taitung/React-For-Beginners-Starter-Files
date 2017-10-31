import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder= this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // get initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      });

    // check if there is any oder in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef) {
      // update our app component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', (nextProps, nextState));
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  loadSamples() {
    console.log('call loadSamples');
    this.setState({
      fishes: sampleFishes
    });
  }

  addFish(fish) {

    // update state
    // you cannot directly update state
    // steps
    // 1 copy current state
    const fishes = {...this.state.fishes} //...take every item from fishes
    // 2 add fish 
    // key is the timestamp which should be a uniqe one
    const timestamp = Date.now(); //mili second
    fishes[`fish-${timestamp}`] = fish;
    // 3. set actual state
    //this.setState({fishes: fishes}); // tell react which state to be updated 
    this.setState({fishes}); // this line is the same as the above line but in more concise way
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  }

  removeFish(key) {
    const fishes = {...this.state.fishes}
    fishes[key] = null;
    this.setState({ fishes });
  }

  removeFromOrder(key) {
    const order = {...this.state.order}
    // this is limited to Firebase so 
    // delete locally should be okay
    delete order[key];
    this.setState({ order });
  }

  addToOrder(key) {
    // take a copy of order
    const order = {...this.state.order};

    // pudate or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}/>
        <Inventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes} 
          updateFish={this.updateFish}
          removeFish={this.removeFish}/>
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;
