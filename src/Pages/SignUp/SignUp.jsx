import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAddNewUserMutation } from '../../Redux/GetApi';
import { setToken } from '../../Redux/Slices/UserSlice';

import classes from './SignUp.module.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [addNewUser] = useAddNewUserMutation();
  const [passErr, setPassErr] = useState(false);

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    if (data) {
      const result = await addNewUser({ user: { username, email, password } }).unwrap();
      localStorage.setItem('token', result.user.token);
      dispatch(setToken(result.user.token));
      navigate('/', { replace: true });
    }
    reset();
  };

  const formName = Object.keys(errors) != 0 ? classes.formError : classes.form;

  return (
    <form className={formName} onSubmit={handleSubmit(onSubmit)}>
      <h4>Create new account</h4>
      <div className={classes.user_info}> 
        <div className={classes.label}> 
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Your name must be at least 3 characters' },
              maxLength: { value: 20, message: 'Your name must be no more than 20 characters'},
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Use lowercase English letters and numbers',
              }
            })}
            autoComplete="off"
            placeholder="Username"
            className={errors.username ? classes.input_error : classes.input}
          />
          <span className={classes.message}>{errors.username?.message}</span>
        </div>
        <div className={classes.label}> 
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please, enter a valid email' },
            })}
            placeholder="Email address"
            className={errors.email ? classes.input_error : classes.input}
          />
          <span className={classes.message}>{errors.email?.message}</span>
        </div>
        <div className={classes.label}> 
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Your password must be at least 6 characters' },
              maxLength: { value: 40, message: 'Your password must be no more than 40 characters' },
            })}
            placeholder="Password"
            autoComplete="off"
            className={errors.password ? classes.input_error : classes.input}
          />
          <span className={classes.message}>{errors.password?.message}</span>
        </div>
        <div className={classes.label}> 
          <label htmlFor="repeat">Repeat Password</label>
          <input
            id="repeat"
            {...register('repeat', {
              required: true,
              validate: (value) => {
                if (watch('password') != value) {
                  setPassErr(true);
                  return 'Your passwords do no match';
                }
              }})}
            placeholder="Password"
            className={passErr ? classes.input_error : classes.input}
            autoComplete="off"
          />
          <span className={classes.message}>{passErr ? 'Password must match' : null}</span>
        </div>
      </div>
      <div className={classes.agreement}> 
        <label>
          <input
            type="checkbox"
            className={classes.checkbox}
            {...register('agreement', { required: 'You must agree to the terms' })}
          />
          <span className={classes.fake}></span>
          <span>I agree to the processing of my personal information</span>
        </label>
      </div>
      <input type="submit" className={classes.create} value="Create" />
      <span>
        Already have an account?{' '}
        <Link to="/sign-in" className={classes.sign_in}>
          Sign in
        </Link>
      </span>
    </form>
  );
};

export default SignUp;