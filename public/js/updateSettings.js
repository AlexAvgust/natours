/* eslint-disable */
import { showAlert } from './alerts';
import axios from 'axios';
export const updateSettings = async (data, type) => {
  const url =
    type === 'password'
      ? 'http://localhost:3000/api/v1/users/updateMyPassword'
      : 'http://localhost:3000/api/v1/users/updateMe';

  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    console.log(res);
    if (res.status === 200) {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (e) {
    console.log(e);
    showAlert('error', e.response.data.message);
  }
};

export const resetPassword = async data => {
  const url = `${window.location.origin}/api/v1/users${
    window.location.pathname
  }`;
  if (data.password !== data.passwordConfirm) {
    showAlert('error', 'password not the same');
    return;
  }
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    console.log(res);
    if (res.status === 200) {
      showAlert('success', `password updated successfully`);
    }
  } catch (e) {
    console.log(e);
    showAlert('error', e.response.data.message);
  }
};
