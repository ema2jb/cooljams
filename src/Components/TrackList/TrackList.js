import './TrackList.css';
import React from 'react';
import {Track} from '../Track/Track.js';

export class TrackList extends React.Component {

    render() {

        return (
            <div className="TrackList">
            {this.props.tracks.map(track => <Track track={track} onAdd={this.props.onAdd} isRemoval = {this.props.isRemoval} onRemove={this.props.onRemove} />)}
            </div>
        )
    }
}

