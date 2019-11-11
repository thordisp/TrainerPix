import React from 'react';
import './NewProgram.scss';
import Form from '../../components/form/Form';
import Webcam from '../../components/webcam/Webcam';
import ListProgram from '../../components/listProgram/ListProgram';

class NewProgram extends React.Component {

  constructor(props) {
    super(props);

    this.updateProgram = this.updateProgram.bind(this);
    this.updateFirstImage = this.updateFirstImage.bind(this);
    this.updateSecondImage = this.updateSecondImage.bind(this);
    this.toggleFirstCam = this.toggleFirstCam.bind(this);
    this.toggleSecondCam = this.toggleSecondCam.bind(this);

    this.state = {
      program: [],
      image1: '',
      image2: '',
      firstWebcamEnabled: false,
      secondWebcamEnabled: false
    };
  }

  updateProgram(id, sets, reps, description, image1, image2) {
    this.setState(state => {
      const program = state.program.concat({ id: id, sets: sets, reps: reps, description: description, image1: image1, image2: image2 });
      return {
        program,
      };
    });
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
          program={this.state.program}
          updateProgram={this.updateProgram}
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
          program={this.state.program}
        />
      </div>
    )
  }
}

export default NewProgram