import './SearchBar.css';
import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarTerm: 'people'
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.searchBarTerm)
  }

  handleTermChange(event){
    const jam = event.target.value;
    this.setState({
      searchBarTerm:jam
    })
  }

  render() {
    return (
      <div className="SearchBar">
      <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
      <button onClick={this.search} className="SearchButton">SEARCH</button>
      </div>
    )
  }
}


