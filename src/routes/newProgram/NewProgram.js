import React from 'react';
import './NewProgram.scss';
import Webcam from '../../components/webcam/Webcam';
import { addExercise } from '../../api';

class NewProgram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      client: 0,
      sets: 0,
      reps: 0,
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const created = await addExercise(this.state.client, this.state.sets, this.state.reps, this.state.description);
    if (!created.ok) {
      console.log('Villa við að bæta við æfingu.');
    } else {
      console.log('Æfingu var bætt við.');
    }
  }

  render() {
    return (
      <div className="programContainer">
        <div className="programForm">
        <form action="/program" method="post" onSubmit={this.handleSubmit}>
          <label>
            Client:
            <input type="text" name="client"  onChange={this.handleChange} />
          </label>
          <label>
            Sets:
            <input type="text" name="sets" onChange={this.handleChange} />
          </label>
          <label>
            Reps:
            <input type="text" name="reps" onChange={this.handleChange} />
          </label>
          <label>
            Description:
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
        <div className="booth">
          <Webcam />
        </div>
      </div>
    )
  }
}

export default NewProgram