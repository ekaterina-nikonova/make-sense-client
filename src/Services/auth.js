import { signin, signout, signup } from './api';

export const authSignup = data => {
  const success = response => {
    if (!response.data.csrf) {
      failure(response);
    } else {
      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
    }
  };

  const failure = error => {
    delete localStorage.csrf;
    delete localStorage.signedIn;
  };

  signup(data)
    .then(response => success(response))
    .catch(error => failure(error));
};

export const authLogin = data => {
  const success = response => {
    if (!response.data.csrf) {
      failure(response);
    } else {
      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
    }
  };
  const failure = error => console.log(error);

  signin(data)
    .then(response => success(response))
    .catch(error => failure(error));
};

export const authLogout = () => {
  const success = response => {
    delete localStorage.csrf;
    delete localStorage.signedIn;
  };

  const failure = error => console.log(error);

  signout()
    .then(response => success(response))
    .catch(error => failure(error))
}
