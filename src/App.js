import React, { Component } from 'react'
import GridPassword from './components/GridPassword.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }
  render() {
    return (
      <div>
        {
          this.state.show ? <GridPassword onConfirm = {(e) => this.confirm(e) } onClose = {() => this.close()} /> : null
        }
      </div>
    )
  }
  confirm(e) {
    console.log(e);
  }
  close() {
    this.setState({
      show: false
    })
  }
}

export default App
