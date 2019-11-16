import React from 'react';
import './NewProgram.scss';
import Form from '../../components/form/Form';
import Webcam from '../../components/webcam/Webcam';
import ListProgram from '../../components/listProgram/ListProgram';
import SelectUser from '../../components/selectUser/SelectUser';

class NewProgram extends React.Component {

  constructor(props) {
    super(props);

    this.updateUsers = this.updateUsers.bind(this);
    this.updateProgram = this.updateProgram.bind(this);
    this.updateProgramId = this.updateProgramId.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.updateFirstImage = this.updateFirstImage.bind(this);
    this.updateSecondImage = this.updateSecondImage.bind(this);
    this.toggleFirstCam = this.toggleFirstCam.bind(this);
    this.toggleSecondCam = this.toggleSecondCam.bind(this);

    this.state = {
      users: [],
      program: [],
      programId: 0,
      userId: 0,
      image1: '',
      image2: '',
      firstWebcamEnabled: false,
      secondWebcamEnabled: false
    };
  }

  updateUsers(id, username) {
    this.setState(state => {
      const users = state.users.concat({ id: id, username: username });
      return {
        users,
      };
    });
  }

  updateProgram(userId, sets, reps, description, image1, image2) {
    this.setState(state => {
      const program = state.program.concat({ userId: userId, sets: sets, reps: reps, description: description, image1: image1, image2: image2 });
      return {
        program,
      };
    });
  }

  updateProgramId(id) {
    this.setState({ programId: id });
  }

  updateUserId(id) {
    this.setState({ userId: id });
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
        <SelectUser
          users = {this.state.users}
          updateUsers={this.updateUsers}
          updateUserId={this.updateUserId}
        />
        <Form
          program={this.state.program}
          updateProgram={this.updateProgram}
          programId={this.state.programId}
          userId={this.state.userId}
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