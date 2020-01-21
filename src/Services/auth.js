import { signin, signout, signup, signupAsGuest } from './api';

export const authSignup = ({ data, setError }) => {
  const success = response => {
    if (!response.data.csrf) {
      failure(response);
    } else {
      localStorage.csrf = response.data.csrf;
      localStorage.setItem('signedIn', 'true');
    }
  };

  const failure = error => {
    delete localStorage.csrf;
    delete localStorage.signedIn;
    setError(error);
  };

  if (!!data) {
    signup(data)
      .then(response => success(response))
      .catch(error => failure(error));
  } else {
    signupAsGuest()
      .then(response => success(response))
      .catch(error => failure(error));
  }
};

export const authLogin = (data, setError) => {
  const success = response => {
    if (!response.data.csrf) {
      failure(response);
    } else {
      localStorage.csrf = response.data.csrf;
      localStorage.setItem('signedIn', 'true');
    }
  };
  const failure = error => {
    setError(error);
  };

  signin(data)
    .then(response => success(response))
    .catch(error => failure(error));
};

export const authLogout = () => {
  const success = response => {
    delete localStorage.csrf;
    localStorage.setItem('signedIn', '');
  };

  const failure = error => console.log(error);

  signout()
    .then(response => success(response))
    .catch(error => failure(error))
};
