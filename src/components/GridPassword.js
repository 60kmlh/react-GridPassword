import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'

class GridPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPanel: true,
      hiddenInput: null,
      code: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
  }
  render() {
    var lengthArr = []
    for(let i=0; i<this.props.passwordLength; i++){
        lengthArr.push(i)
    }
    return (
      <div>
        <div className="gp_pop" onClick={() => this.focusInput()}>
          <input
            className="gp_hidden_input"
            type={this.props.isNumber?"tel":"text"}
            ref={(input) => { this.hiddenInput = input }}
            onChange={this.handleChange} 
            value={this.state.code} />
          <div className="gp_wrap">
            <div style={{height: "25px"}}>
              <span className="gp_close" onClick={this.cancel}></span>
            </div> 
            <div className="gp_tip">{this.props.tip}</div>
            <div className="gp_input_list">
              {
                lengthArr.map((item,index)=>{
                  return (
                    <input
                      key={index}
                      value={this.state.code.substring(index, index+1)}
                      className="gp_input_grid"
                      type={this.props.isPassword ? 'password' : 'text'} 
                      style={{width:(2.5-(this.props.passwordLength-4)*0.3)+'em',height:(2.5-(this.props.passwordLength-4)*0.3)+'em'}}
                      disabled='true' />
                  )
                })
              }
            </div>
            <div className="gp_btn_list" v-if='isBtnCtr'>
              <button className="gp_btn" onClick={this.cancel}>取消</button>
              <button className="gp_btn gp_btn_confirm" onClick={this.confirm}>确认</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  handleChange(e) {
    this.setState({
      code: e.target.value.slice(0, this.props.passwordLength)
    })
    if(this.state.code.length == this.props.passwordLength && !this.props.isBtnCtr) {
      this.onConfirm(this.state.code)
    }
  }
  focusInput() {
    this.hiddenInput.focus()
  }
  cancel(e) {
    e.stopPropagation()
    this.props.onClose()
  }
  confirm(e) {
    e.stopPropagation()
    if(this.state.code.length == this.props.passwordLength) {
        this.props.onConfirm(this.hiddenInput.value)
        this.hiddenInput.blur()
    }else {
      this.focusInput()
    }
  }
}

GridPassword.propTypes = {
  tip: PropTypes.string,
  passwordLength: PropTypes.number,
  isPassword: PropTypes.bool,
  isNumber: PropTypes.bool,
  isBtnCtr: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

GridPassword.defaultProps = {
  tip: '请输入密码',
  passwordLength: 6,
  isPassword :true,
  isNumber: true,
  isBtnCtr: true
}

export default GridPassword