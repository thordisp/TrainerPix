import React from 'react';
import './NewProgram.scss';
import Webcam from '../../components/webcam/Webcam';

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

  handleSubmit(event) {
    event.preventDefault();
    console.log('client: ' + this.state.client + ', sets: ' + this.state.sets + ', reps: ' +
                  this.state.reps + ', description: ' + this.state.description);
  }

  render() {
    return (
      <div className="programContainer">
        <div className="programForm">
        <form action="/action_page.php" method="post" onSubmit={this.handleSubmit}>
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