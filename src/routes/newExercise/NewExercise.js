import React from 'react';
import './NewExercise.scss';
import Form from '../../components/form/Form';
import Webcam from '../../components/webcam/Webcam';
import ListProgram from '../../components/listProgram/ListProgram';

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

    this.state = {
      exercise: [],
      programId: params.programId,
      image1: '',
      image2: '',
      firstWebcamEnabled: false,
      secondWebcamEnabled: false
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

  render() {
    return (
      <div className="form-container">
        <Form
          updateExercise={this.updateExercise}
          programId={this.state.programId}
          ClientId={this.state.clientId}
          image1={this.state.image1}
          image2={this.state.image2}
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
        <ListProgram
          exercise={this.state.exercise}
        />
      </div>
    )
  }
}

export default NewExercise