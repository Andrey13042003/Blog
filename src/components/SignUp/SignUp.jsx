import { Link } from 'react-router-dom';

import classes from './SignUp.module.scss';

const SignUp = () => {
  return (
    <form className={classes.form}>
      <h4>Create new account</h4>
      <div className={classes.user_info}> 
        <div className={classes.label}> 
          <label htmlFor="name">Username</label>
          <input id="name" placeholder="Username" type="text" className={classes.input} />
        </div>
        <div className={classes.label}> 
          <label htmlFor="address">Email address</label>
          <input id="address" placeholder="Email address" type="text" className={classes.input} />
        </div>
        <div className={classes.label}> 
          <label htmlFor="password">Password</label>
          <input id="password" placeholder="Password" type="text" className={classes.input} />
        </div>
        <div className={classes.label}> 
          <label htmlFor="repeat">Repeat Password</label>
          <input id="repeat" placeholder="Password" type="text" className={classes.input} />
        </div>
      </div>
      <div className={classes.agreement}> 
        <label>
          <input type="checkbox" className={classes.checkbox} />
          <span className={classes.fake}></span>
          <span>I agree to the processing of my personal information</span>
        </label>
      </div>
      <button className={classes.create}>Create</button> 
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