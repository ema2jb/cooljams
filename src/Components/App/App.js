import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import {spotify} from '../../util/spotify.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          id:1, name:'emmanuel', artist:'2jb', album:'coder'
        },
        {
          id:2, name:"gabriel", artist:'salgardo', album:'writer'
        },
        {
          id:3, name:'kessiena', artist:'keshy', album:'baller'
        }
    ],
      playlistName: 'my favourites',
      playlistTracks: [
        {
          id:4, name:'faith', artist:'faithy', album:'fashion'
        },
        {
          id:5, name:'favour', artist:'eguoski', album:'hair styles'
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  addTrack(track){
   /* for(const playlistTrack of this.state.playlistTracks){
      if(playlistTrack.id === track.id){
        return;
      }
    }*/
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState(state => ({
      playlistTracks: [...state.playlistTracks, track]
    }))
  }

  removeTrack(track){
    this.setState(state =>{
      const playlistTracks = [...state.playlistTracks];
      const newPlaylistTracks = playlistTracks.filter(tracks => tracks.id !== track.id)
      return {
        playlistTracks:newPlaylistTracks
      }
    })
  }

  updatePlaylistName(name){
    this.setState({
      playlistName:name
    })
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(playlistTrack => {
      return playlistTrack.uri
    })
    spotify.savePlaylist(this.state.playlistName, trackURIs)
    this.setState({
      playlistName:'New Playlist',
      playlistTracks:[]
    })
  }

  search(jam){
    const jams = spotify.search(jam)
    console.log(jams.json());
    this.setState({
      searchResults:jams
    })
  }


  render(){
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch = {this.search} />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        <Playlist 
        onSave = {this.savePlaylist}
        onNameChange={this.updatePlaylistName} 
        onRemove = {this.removeTrack} 
        playlistName={this.state.playlistName} 
        playlistTracks={this.state.playlistTracks} 
        />
      </div>
    </div>
  </div>
    );
  }
}
  


export default App;
