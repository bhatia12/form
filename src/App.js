import React, { Component } from "react";
import Modal from 'react-modal';
import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const customStyle = {
  overlay : {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  content : {
    position:'relative',
    top  : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    padding: '5% 5% 2.8% 2.8%',
    width : '35%',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)',
    display : 'flex'
  }
}
const phoneRegex = RegExp(/^(\+91[\-\s]?)?[0]?(91)?[7896]\d{9}$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      phone: null,
      email: null,
      password: null,
      address: null,
      isActive:false,
      formErrors: {
        name: "",
        phone: "",
        email: "",
        password: "",
        address: ""
      }
    };
  }

  componentWillMount(){
    Modal.setAppElement('body');

  }

  handleSubmit = e => {
    e.preventDefault();



    if (formValid(this.state)) {
      this.setState({
        isActive:!this.state.isActive,
      })

      // const { name,phone, email,address, } = this.state;
      // alert(`Your state values: \n
      //         Name: ${name} \n
      //         Phone:${phone} \n
      //         Email: ${email} \n
      //         Address: ${address}`
      //         )
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.name}
        Phone: ${this.state.phone}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Address: ${this.state.address}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };




  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = {...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "phone":
        formErrors.phone =
          phoneRegex.test(value)? "" : "invalid phone no";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
        case "address":
          formErrors.address =
            value.length < 3 ? "address is required" : "";
          break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Contact Us</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="name">
              <label htmlFor="name">Name</label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="Name"
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>
            <div className="phone">
              <label htmlFor="phone">Phone</label>
              <input
                className={formErrors.phone.length > 0 ? "error" : null}
                placeholder="Phone"
                type="text"
                name="phone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phone.length > 0 && (
                <span className="errorMessage">{formErrors.phone}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="address">
              <label htmlFor="address">Address</label>
              <textarea
                className={formErrors.address.length > 0 ? "error" : null}
                placeholder="Address"
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
            {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>
            <div className="submit">
              <button type="submit">Submit</button>
              <Modal
                onRequestClose={this.handleSubmit}
                isOpen={this.state.isActive}
                style={customStyle}>
                <tbody className="aftersubmit">
                  <tr>
                    <td>Name:</td>
                    <td>{this.state.name}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{this.state.phone}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td>Address: </td>
                    <td>{this.state.address}</td>
                  </tr>
                </tbody>
              </Modal>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
