import './Track.css';
import React  from 'react';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }


  renderAction(){
    return this.props.isRemoval ?  <span onClick = {this.addTrack}>+</span> : <span onClick={this.removeTrack} >-</span>;
    /*if(this.props.isRemoval){
      return <button>-</button>
    } else {
      return  <button onClick = {this.addTrack}>+</button>   
    }*/
  }

  addTrack(){
    this.props.onAdd(this.props.track)
  }

  removeTrack(){
    this.props.onRemove(this.props.track)
  }

  render() {

    return (
      <div className="Track">
      <div className="Track-information">
      <h3>{this.props.track.name}</h3>
      <p> {this.props.track.artist} | {this.props.track.album} </p>
      </div>
      <button className="Track-action">{this.renderAction()}</button>
      </div>
    )
  }
}
