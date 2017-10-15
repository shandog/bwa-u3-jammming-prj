import React from 'react';
import './SearchResults.css';
import TrackList from '../Tracklist/Tracklist';

class SearchResults extends React.Component {
    render() {       
        return (
            <div className="SearchResults">
                <h2>Search Results</h2>
                   <TrackList tracks={this.props.searchResults} isRemoval={false} onAdd={this.props.onAdd}/> 
            </div>
        )
    }
}
export default SearchResults;