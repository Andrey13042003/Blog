import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { editProfile } from '../../Redux/Slices/UserSlice';

import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, image, password, username } = data;
    dispatch(editProfile({ user: { email, image, password, username }}));
    navigate('/', { replace: true });
    reset();
  };

  const formName = Object.keys(errors) != 0 ? classes.formError : classes.form;

  return (
    <form className={formName} onSubmit={handleSubmit(onSubmit)}>
      <h4>Edit profile</h4>
      <div className={classes.user_info}> 
        <div className={classes.label}> 
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register('username', {
              required: 'The password must not be empty',
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Use lowercase English letters and numbers',
              }
            })}
            autoComplete="off"
            placeholder="Username"
            className={classes.input}
          />
          <span className={classes.message}>{errors.username?.message}</span>
        </div>
        <div className={classes.label}> 
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            {...register('email', {
              required: 'The email must not be empty',
              pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please, enter a valid email' },
            })}
            autoComplete="off"
            placeholder="Email address"
            className={classes.input}
          />
          <span className={classes.message}>{errors.email?.message}</span>
        </div>
        <div className={classes.label}> 
          <label htmlFor="password">New password</label>
          <input
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Your password must be at least 6 characters' },
              maxLength: { value: 40, message: 'Your password must be no more than 40 characters' },
            })}
            placeholder="New password"
            autoComplete="off"
            className={classes.input}
          />
          <span className={classes.message}>{errors.password?.message}</span>
        </div>
        <div className={classes.label}> 
          <label htmlFor="image">Avatar image (url)</label>
          <input
            id="image"
            {...register('image', {
              required: 'Url is required',
              pattern: {
                value: /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi,
                message: 'Please enter a valid url',
              },
            })}
            placeholder="Avatar image"
            className={classes.input}
            autoComplete="off"
          />
          <span className={classes.message}>{errors.image?.message}</span>
        </div>
      </div>
      <input type="submit" className={classes.save} value="Save" />
    </form>
  );
};

export default EditProfile;