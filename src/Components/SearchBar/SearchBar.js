import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchTerm: '',
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    search() { //#69 
      //console.log(this.state);
     this.props.onSearch(this.state.searchTerm)
    }
    handleTermChange(event){
        this.setState({searchTerm: event.target.value});
    }
//#73
    render() {       
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" /> 
                <a onClick={this.search}>SEARCH</a>
            </div>
        )
    }
};

export default SearchBar;