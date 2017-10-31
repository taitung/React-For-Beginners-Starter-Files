import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {

  render() {
    // data massage
    // ES6 destructuring 
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h4 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h4>
        <p>{details.desc}</p>
        <button type="button" onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequred
};

export default Fish;
