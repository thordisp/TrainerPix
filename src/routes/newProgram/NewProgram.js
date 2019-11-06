import React from 'react';
import './NewProgram.scss';
import Form from '../../components/form/Form';
import Webcam from '../../components/webcam/Webcam';

class NewProgram extends React.Component {

  constructor(props) {
    super(props);

    this.updateFirstImage = this.updateFirstImage.bind(this);
    this.updateSecondImage = this.updateSecondImage.bind(this);
    this.toggleFirstCam = this.toggleFirstCam.bind(this);
    this.toggleSecondCam = this.toggleSecondCam.bind(this);

    this.state = {
      image1: '',
      image2: '',
      firstWebcamEnabled: false,
      secondWebcamEnabled: false
    };
  }

  updateFirstImage(imageValue) {
    this.setState({ image1: imageValue });
  }

  updateSecondImage(imageValue) {
    this.setState({ image2: imageValue });
  }

  toggleFirstCam() {
    this.setState({ firstWebcamEnabled: !this.state.firstWebcamEnabled });
    console.log("toggleFirstCam activated, is firstCamEnabled: " + this.state.firstWebcamEnabled);
  }

  toggleSecondCam() {
    this.setState({ secondWebcamEnabled: !this.state.secondWebcamEnabled });
    console.log("toggleSecondCam activated, is secondCamEnabled: " + this.state.secondWebcamEnabled);
  }

  render() {
    return (
      <div className="form-container">
        <Form
          image1={this.state.image1}
          image2={this.state.image2}
          firstWebcamEnabled={this.state.firstWebcamEnabled}
          secondWebcamEnabled={this.state.secondWebcamEnabled}
          updateFirstImage={this.updateFirstImage}
          updateSecondImage={this.updateSecondImage}
          toggleFirstCam={this.toggleFirstCam}
          toggleSecondCam={this.toggleSecondCam}
          />
        <Webcam
          image1={this.state.image1}
          image2={this.state.image2}
          firstWebcamEnabled={this.state.firstWebcamEnabled}
          secondWebcamEnabled={this.state.secondWebcamEnabled}
          updateFirstImage={this.updateFirstImage}
          updateSecondImage={this.updateSecondImage}
          toggleFirstCam={this.toggleFirstCam}
          toggleSecondCam={this.toggleSecondCam}
        />
      </div>
    )
  }
}

export default NewProgram