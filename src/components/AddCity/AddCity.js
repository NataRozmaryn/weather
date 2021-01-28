import React from "react";
import { connect } from "react-redux";
import { addCity } from "../../redux/actions";

class AddCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddCity = () => {
    this.props.addCity(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-city" onClick={this.handleAddCity}>
          Find
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { addCity }
)(AddCity);