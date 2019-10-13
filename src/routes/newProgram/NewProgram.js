import React from 'react';
import './NewProgram.scss';
import Webcam from '../../components/webcam/Webcam';

class NewProgram extends React.Component {
  render() {
    return (
      <div className="booth">
        <Webcam />
      </div>
    )
  }
}

export default NewProgram