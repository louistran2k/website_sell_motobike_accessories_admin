import { User } from 'types/user.type';

export enum ACCESS_TOKEN_KEY {
  ADMIN = 'access_token_sharma_shop_admin',
  SHIPPER = 'access_token_sharma_shop_shipper',
}

export const setAccessToken = (
  value: { accessToken: string; user: User },
  key: ACCESS_TOKEN_KEY
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getAccessToken = (key: ACCESS_TOKEN_KEY) =>
  localStorage.getItem(key);

export const removeAccessToken = (key: ACCESS_TOKEN_KEY) =>
  localStorage.removeItem(key);
