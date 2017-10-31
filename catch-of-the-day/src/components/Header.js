import React from 'react';

// Stateless function
// Rendering only html tag information through 
// render method without other functions can be replaced
// with Stateless function

var Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{props.tagLine}</span></h3>
    </header>
  )
}

Header.propTypes = {
  tagLine: React.PropTypes.string.isRequired
};

export default Header;
