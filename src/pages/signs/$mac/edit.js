import React, {
  Component
} from 'react'

class Widget extends Component {
  render() {
    const {
      match
    } = this.props
    return (<div>edit sign {match.params.mac} </div>)
  }
}

export default Widget