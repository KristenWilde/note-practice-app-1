import React from 'react';

class Hello extends React.Component {
  state = {
    result: 'No result',
    error: 'No error'
  }

  componentDidMount() {

    // Try to call a test API which should send a simple JSON object, { express: 'Hello'}.
    // Instead, index.html is rendered.

    fetch('/api/hello')
    .then(
      (result) => this.setState({ result: String(result) }),
      (error) => this.setState({ error })
    )
  }

  render() {
    return (
      <main>
        <p>Result: {this.state.result}</p>
        <p>Error: {this.state.error}</p>
      </main>
    )
  }
}

export default Hello
