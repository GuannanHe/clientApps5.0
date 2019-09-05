import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from 'Assets/LogoN.png';
import { Icon, TextField, Button } from 'SL_UI';
import { login } from 'Data/auth';

import styles from './styles.scss';

export default ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authenticating = useSelector(state => state.sessionReducer.authenticating);
  const authenticated = useSelector(state => state.sessionReducer.authenticated);
  const error = useSelector(state => state.sessionReducer.authError);

  const loginClicked = () => dispatch(login({ username, password }));

  useEffect(() => {
    if (!authenticating && authenticated ) {
      history.push('/app');
    }
  }, [authenticated, authenticating])

  return <div className={styles.contianer}>
    <img className={styles.logo} src={Logo} />
    <TextField
      label='Username'
      onChange={event => setUsername(event.target.value)}
      value={username}
      qaId='login-username'
    />
    <TextField
      label='Password'
      inputType='password'
      onChange={event => setPassword(event.target.value)}
      value={password}
      qaId='login-password'
    />
    <Button
      qaId='login-button'
      label='Primary'
      block
      disabled={username === '' || password === ''}
      onClick={loginClicked}
    />
  </div>
}