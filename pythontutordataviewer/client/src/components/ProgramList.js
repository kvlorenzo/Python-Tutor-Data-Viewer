import React, {Component} from 'react';
import Program from './Program';

class ProgramList extends Component {
  render() {
    let programs;
    if (this.props.programs) {
      programs = this.props.programs.map((program, index) => {
        return (
          <Program key={index} program={program} />
        );
      });
    }
    return (
      <div className="ProgramList">
        {programs}
      </div>
    );
  }
}

export default ProgramList;
