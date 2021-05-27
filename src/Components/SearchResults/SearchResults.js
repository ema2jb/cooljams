import './SearchResults.css'
import React from 'react';
import {TrackList} from '../TrackList/TrackList.js';


export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoval: true
    }
  }

  render() {
    
    return (
      <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval = {this.state.isRemoval} />
      </div> 
    )
  }
}

