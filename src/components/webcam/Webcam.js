import React from "react";
import Webcam from "react-webcam";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import CameraIcon from '@material-ui/icons/Camera';
import './Webcam.scss'

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
    this.props.toggleCam2Button();
  }

  captureSecond = (e) => {
    e.preventDefault();
    const imageSrc = this.webcam.getScreenshot();
    this.props.updateSecondImage(imageSrc);
    this.props.toggleSecondCam();
    this.props.toggleCam1Button();
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#4f83cc',
          main: '#002f6c',
          dark: '#01579b',
          contrastText: '#ffffff',
        },
        secondary: {
          light: '#eeffff',
          main: '#bbdefb',
          dark: '#8aacc8',
          contrastText: '#000000',
        },
      },
    });

    return (
      <div className="new-exercise-container">
        <ThemeProvider theme={theme}>
          {this.props.firstWebcamEnabled ? (
          <div className="camContainer">
            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
            <Fab color="primary" aria-label="capture" onClick={this.captureFirst}>
              <CameraIcon />
            </Fab>
          </div>
          ) : (
            <div>
            </div>
          )}
          {this.props.secondWebcamEnabled ? (
          <div className="camContainer">
            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
            <Fab color="primary" aria-label="capture" onClick={this.captureSecond}>
              <CameraIcon />
            </Fab>
          </div>
          ) : (
            <div>
            </div>
          )}
        </ThemeProvider>
      </div>
    );
  }
}