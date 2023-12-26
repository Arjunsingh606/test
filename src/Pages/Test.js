import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import "../style/login.css";

const SignUp = (props) => {
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    
    const formData = { firstName, lastName, email, password, confirmPass };
    dispatch(setUser(formData));
    
    try {
      const response = await fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data saved successfully!');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error while saving data:', error);
    }
  };

 

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="form-wrapper">
            <div className="col-md-7 form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <Form className=" col-md-4">
              <h3 className="text-start">SignUp</h3>

              <Form.Group className="mb-3 form-field">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="LastName"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group className="mb-3 form-field">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="LastName"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group className="mb-3 form-field">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                />
              </Form.Group>

              <Form.Group className="mb-3 form-field">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-3 form-field">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  type="password"
                  name="confirm-password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button
                onClick={handleSubmitBtn}
                className="form-btn"
                variant="primary"
                type="submit"
              >
                Sign Up
              </Button>
              <div className="sign-up-link">
                <p>
                  Already a member?
                  <a href="forget.html" class="link-underline-light ">
                    Login now
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
