import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css'

const initialForm = {
  name: "",
  surname: "",
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, one special character and one number',
  name: 'Name must be at least 3 characters long',
  surname: 'Surname must be at least 3 characters long'
};

const validateEmail = (email) => {
  const  regexTest = new RegExp(
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
  );
  return email.match(regexTest);
}

const validatePassword = (password) => {
  const regexTest = new RegExp(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
  );
  return password.match(regexTest)
}

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [registeredId, setRegisteredId] = useState("")


  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      if (!validateEmail(form.email)) {
        newErrors.email = errorMessages.email;
      }
      if (!validatePassword(form.password)) {
        newErrors.password = errorMessages.password;
      }
      if (form.name.length < 3) {
        newErrors.name = errorMessages.name
      }
      if (form.surname.length < 3) {
        newErrors.surname = errorMessages.surname
      }

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);
    };
    validateForm();
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      axios
        .post('https://reqres.in/api/users', form)
        .then((res) => {
          setRegisteredId(res.data.id)
          console.log("success!")
          setForm(initialForm)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  };

  return (
    <div className='container'>
    <h1>Register Form</h1>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          type="text"
          onChange={handleChange}
          value={form.name}
          invalid={errors.name !== undefined}
        />
        {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="surname">Surname</Label>
        <Input
          id="surname"
          name="surname"
          placeholder="Enter your surname"
          type="surname"
          onChange={handleChange}
          value={form.surname}
          invalid={errors.surname !== undefined}
        />
        {errors.surname && <FormFeedback>{errors.surname}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email !== undefined}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password !== undefined}
        />
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Register
        </Button>
      </FormGroup>
    </Form>
    {registeredId.length > 0 && <h2>Registration Successful! Registration Number: {registeredId}</h2>}
    </div>
  );
}
