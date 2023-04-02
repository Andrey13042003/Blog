import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authUser } from '../../Redux/Slices/UserSlice';

import classes from './SignIn.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    if (data) {
      const info = await dispatch(authUser({ user: { email, password } }));
      localStorage.setItem('token', info.payload.user.token);
      navigate('/', { replace: true });
    }
  };

  const formName = Object.keys(errors) != 0 ? classes.formError : classes.form;

  return (
    <form className={formName} onSubmit={handleSubmit(onSubmit)}>
      <h4>Sign In</h4>
      <div className={classes.user_info}> 
        <div className={classes.label}> 
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please, enter a valid email' },
            })}
            placeholder="Email address"
            className={classes.input}
          />
          <span className={classes.message}>{errors.email?.message}</span>
        </div>
        <div className={classes.label}> 
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register('password', {
              required: 'The password must not be empty',
              minLength: 1,
            })}
            autoComplete="off"
            placeholder="Password"
            className={classes.input}
          />
          <span className={classes.message}>{errors.password?.message}</span>
        </div>
      </div>
      <input type="submit" className={classes.create} value="Login" />
      <span>
        Do not have an account?{' '}
        <Link to="/sign-up" className={classes.sign_up}>
          Sign Up
        </Link>
      </span>
    </form> 
  );
};

export default SignIn;