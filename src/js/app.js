import 'aframe';
import 'aframe-leap-hands';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import Text from './components/Text';
import Sky from './components/Sky';

require('aframe-leap-hands').registerAll();
class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    return (
      <Scene>
        <a-assets></a-assets>

        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>
          <a-entity leap-hand="hand: left"></a-entity>
          <a-entity leap-hand="hand: right"></a-entity>
        </Camera>

        <Sky src="url(https://rawgit.com/aframevr/assets/gh-pages/360-image-gallery-boilerplate/img/sechelt.jpg)"/>

        <Text
          text='Hello World!'
          color='#DADADA'
          position='5.5 1 -3' scale="15 15 15"/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

        <Entity
          geometry='primitive: box'
          material={{color: this.state.color, opacity: 0.6}}
          position='0 -0.5 -3'
          onClick={this.changeColor.bind(this)}>
          <a-animation attribute="rotation" repeat="indefinite" loop="true" to="360 360 360"></a-animation>
           <a-animation attribute="scale" direction="alternate"  dur="100" repeat="indefinite" to='1.1 1.1 1.1'></a-animation>
           <Entity
            geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
            material={{color: '#24CAFF'}}>
              <a-animation attribute="scale" direction="alternate"  dur="100" repeat="indefinite" to='2 2 2'></a-animation>
            </Entity>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
