import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      searchResults:[[]],
      playlistName:'Name',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName =this.updatePlaylistName.bind(this); //#58
    this.savePlaylist = this.savePlaylist.bind();
    this.search = this.search.bind(this);
    
  }
  addTrack(track) {
     console.log(this);
       if (this.state.playlistTracks.indexOf(track.id) === -1){
        this.state.playlistTracks.push(track);
          console.log(this.state.playlistTracks);
        this.setState({ playlistTracks: this.state.playlistTracks })
        }
    console.log(this);
  } 
  removeTrack(track){
    if (this.state.playlistTracks.indexOf(track.id) !== -1){
      this.state.playlistTracks.pull(track);
      this.setState({ playlistTracks: this.state.playlistTracks })
      }
    console.log(this);
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
 
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(results => {
      this.setState({
        playlistName:'',
        playlistTracks: []
      })
    })
  }
  
  search(searchTerm){
    Spotify.search(searchTerm).then(results => {
      this.setState({searchResults: results});
    })
    console.log(this);
   }

//#58,#68
  render() {
    return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>  
        <div className="App">          
              <SearchBar onSearch={this.search} />
          <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div> 
        </div>
      </div>
    );
  }
}
// 
export default App;
