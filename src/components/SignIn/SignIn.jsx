import { Link } from 'react-router-dom';

import classes from './SignIn.module.scss';

const SignIn = () => {
  return (
    <form className={classes.form}>
      <h4>Sign In</h4>
      <div className={classes.user_info}> 
        <div className={classes.label}> 
          <label htmlFor="address">Email address</label>
          <input id="address" placeholder="Email address" type="text" className={classes.input} />
        </div>
        <div className={classes.label}> 
          <label htmlFor="password">Password</label>
          <input id="password" placeholder="Password" type="text" className={classes.input} />
        </div>
      </div>
      <button className={classes.create}>Create</button> 
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