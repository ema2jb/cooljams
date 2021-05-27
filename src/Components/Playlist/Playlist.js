import './Playlist.css'
import React from 'react';
import {TrackList} from '../TrackList/TrackList.js';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoval: false
    }
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    const name = event.target.value;
    this.props.onNameChange(name)
  }

  

  render(){

    return (
      <div className="Playlist">
      <input value = {this.props.playlistName} onChange = {this.handleNameChange} />
      <TrackList 
      onRemove={this.props.onRemove} 
      tracks={this.props.playlistTracks} 
      isRemoval={this.state.isRemoval} 
      />
      <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

