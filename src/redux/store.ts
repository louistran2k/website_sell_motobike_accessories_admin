import { configureStore } from '@reduxjs/toolkit';
import customerOrderReducer from './customerOrder/slice';
import userReducer from './user/slice';

const RootReducer = {
  customerOrderReducer,
  userReducer,
};

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
