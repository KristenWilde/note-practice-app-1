import React from 'react';

class Hello extends React.Component {
  state = {
    result: 'No result',
    error: 'No error'
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/hello")
      .then(response => response.json())
      .then(result => {
        console.log(result.express)
        this.setState({ result: result.express })
        }, error => this.setState({ error })
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
