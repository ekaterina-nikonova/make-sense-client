import { signin } from './api';

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
