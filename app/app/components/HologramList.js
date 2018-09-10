const React = require('react');
import HologramItem from './HologramItem';
import ItemForm from './HologramForm';
import * as apiCalls from '../actions/actions_item';

class HologramList extends React.Component {
  constructor() {
    super();
    this.state = {
      errorMsg: '',
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.findItem = this.findItem.bind(this);
  }
  componentWillMount(){
    this.loadItems();
  }

  hideMsg(e) {

    this.setState({errorMsg: ''});
  }
  async loadItems() {
    let items = await apiCalls.getItems();
    this.setState({items});
  }
  async deleteItem(id) {
    let ret = await apiCalls.removeItem(id);console.log(ret);
    if(!ret.hasOwnProperty('error')) {
      const items = this.state.items.filter(item => item._id !== id);
      this.setState({items});
    } else {
      this.setState({errorMsg: ret.error});
    }
  }

  async addItem(val, imageData){
    let newItem = await apiCalls.createItem(val, imageData);console.log(newItem);
    if(newItem.hasOwnProperty('error')) {
      this.setState({errorMsg: newItem.error});
    } else {
      this.setState({items: [...this.state.items, newItem]});
    }
  }

  async findItem(name) {console.log(name);
    let item = await apiCalls.findItem(name);
    this.setState({items: item});
  }

  render() {
    const items = this.state.items?this.state.items.map(t => (
      <HologramItem key={t._id} {...t} onDelete={this.deleteItem.bind(this, t._id)}/>
    )) : [];

    return (
      <div className="container text-center">
        <h1>Celebrity Hologram List</h1>
        <p className="error error-msg"  onClick={this.hideMsg.bind(this)}>{this.state.errorMsg}</p>

        <ItemForm itemAdd={this.addItem} itemSearch={this.findItem}/>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}


export default HologramList;
