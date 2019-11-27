import React from 'react';
import { Redirect } from 'react-router-dom';
import './NewExercise.scss';
import Form from '../../components/form/Form';
import Webcam from '../../components/webcam/Webcam';
import ListProgram from '../../components/listProgram/ListProgram';
import { Context } from '../../UserContext';

class NewExercise extends React.Component {

  constructor(props) {
    super(props);

    const { match: { params } } = this.props;

    this.updateExercise = this.updateExercise.bind(this);
    this.updateProgramId = this.updateProgramId.bind(this);
    this.updateFirstImage = this.updateFirstImage.bind(this);
    this.updateSecondImage = this.updateSecondImage.bind(this);
    this.toggleFirstCam = this.toggleFirstCam.bind(this);
    this.toggleSecondCam = this.toggleSecondCam.bind(this);
    this.toggleCam1Button = this.toggleCam1Button.bind(this);
    this.toggleCam2Button = this.toggleCam2Button.bind(this);

    this.state = {
      exercise: [],
      programId: params.programId,
      clientId: params.clientId,
      image1: '',
      image2: '',
      firstWebcamEnabled: false,
      secondWebcamEnabled: false,
      camButton1Active: false,
      camButton2Active: false,
    };
  }

  updateExercise(programId, sets, reps, description, image1, image2) {
    this.setState(state => {
      const exercise = state.exercise.concat({ programId: programId, sets: sets, reps: reps, description: description, image1: image1, image2: image2 });
      return {
        exercise,
      };
    });
  }

  updateProgramId(id) {
    this.setState({ programId: id });
  }

  updateFirstImage(imageValue) {
    this.setState({ image1: imageValue });
  }

  updateSecondImage(imageValue) {
    this.setState({ image2: imageValue });
  }

  toggleFirstCam() {
    this.setState({ firstWebcamEnabled: !this.state.firstWebcamEnabled });
  }

  toggleSecondCam() {
    this.setState({ secondWebcamEnabled: !this.state.secondWebcamEnabled });
  }

  toggleCam1Button() {
    this.setState({ camButton1Active: !this.state.camButton1Active });
  }

  toggleCam2Button() {
    this.setState({ camButton2Active: !this.state.camButton2Active });
  }

  render() {
    return (
      <Context.Consumer>
        {({ authenticated }) => {
          return (
            <div>
              {authenticated && (
                <div className="form-container">
                <Form
                  updateExercise={this.updateExercise}
                  programId={this.state.programId}
                  ClientId={this.state.clientId}
                  image1={this.state.image1}
                  image2={this.state.image2}
                  toggleFirstCam={this.toggleFirstCam}
                  toggleSecondCam={this.toggleSecondCam}
                  camButton1Active={this.state.camButton1Active}
                  camButton2Active={this.state.camButton2Active}
                  toggleCam1Button={this.toggleCam1Button}
                  toggleCam2Button={this.toggleCam2Button}
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
                  toggleCam1Button={this.toggleCam1Button}
                  toggleCam2Button={this.toggleCam2Button}
                />
                <ListProgram
                  exercise={this.state.exercise}
                  clientId={this.state.clientId}
                />
              </div>
              )}

              {!authenticated && (
                <Redirect to={{pathname: '/login', state: {from: this.props.location}}} />
              )}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default NewExercise