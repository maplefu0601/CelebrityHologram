const React = require('react');

class HologramItem extends React.Component {
  constructor() {
    super();
  }

  render() {console.log(this.props);
    let name = this.props.name;
    let onDelete = this.props.onDelete;
    let imageData = this.props.imageData;
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span>{name}</span>
        <span onClick={onDelete} className="badge badge-primary badge-pill"> x </span>
        <div className="imgPreview">
          <img src={imageData}/>
        </div>
      </li>
    );
  }
}

export default HologramItem;
