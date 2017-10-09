import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(){
        console.log(this.props)
        if (this.props.isRemoval === true) {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>;
        } else {
           return <a className="Track-action" onClick={this.addTrack}>+</a>;
        }
    }
    
    addTrack(){
        this.props.onAdd(this.props.track);
        console.log(this.props)
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }
 
    render() {       
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3 id={this.props.key}>{this.props.track.name}</h3>
                        <p>{this.props.track.artists} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;
