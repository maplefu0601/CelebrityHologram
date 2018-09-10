import React, {Component} from 'react';

class ItemForm extends Component {
  constructor(props){
    super(props);
    this.state = {inputValue: '', searchValue:'', file:'', imageUrl: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleChange(e){
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleSubmit() {
    this.props.itemAdd(this.state.inputValue, this.state.imageUrl);
  }

  submitSearch() {
    this.props.itemSearch(this.state.searchValue);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let {imageUrl} = this.state;
    let $imagePreview = null;
    if (imageUrl) {
      $imagePreview = (<img src={imageUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <nav className="navbar navbar-light bg-light justify-content-between">

        <div className="form-row">
          <div className="col-3 flex">
            <input type="file" className="form-control" accept="image/*" onChange={(e)=>this.handleImageChange(e)}/>
            <input className="form-control mr-sm-2" type="text" placeholder="Name" aria-label="Name" value={this.state.inputValue} onChange={this.handleChange}/>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleSubmit}>Add More</button>
          </div>
          <div className="col-2 flex"></div>
          <div className="col-4 flex">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" value={this.state.searchValue} onChange={this.handleSearch}/>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.submitSearch}>Search</button>
          </div>
          <div className="imgPreview">
            {$imagePreview}
          </div>

        </div>
      </nav>

    )
  }
}

export default ItemForm;
