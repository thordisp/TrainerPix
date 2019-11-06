import React from "react";
import Webcam from "react-webcam";
import Button from '../button/Button';

export default class WebcamCapture extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
      image_name: '',
      saveImage: false,
    };
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  captureFirst = (e) => {
    e.preventDefault();
    const imageSrc = this.webcam.getScreenshot();
    this.props.updateFirstImage(imageSrc);
    this.props.toggleFirstCam();
    console.log("image1: " + this.props.image1);
  }

  captureSecond = (e) => {
    e.preventDefault();
    const imageSrc = this.webcam.getScreenshot();
    this.props.updateSecondImage(imageSrc);
    this.props.toggleSecondCam();
    console.log("image2: " + this.props.image2);
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div className="new-exercise-container">
        {this.props.firstWebcamEnabled ? (
        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <Button onClick={this.captureFirst}>Capture photo</Button>
        </div>
        ) : (
          <div>
          </div>
        )}
        {this.props.secondWebcamEnabled ? (
        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <Button onClick={this.captureSecond}>Capture photo</Button>
        </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    );
  }
}