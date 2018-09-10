const React = require('react');
import HologramList from './HologramList'

class Home extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="container text-center">
        <HologramList></HologramList>
      </div>
    );
  }
}


export default Home;