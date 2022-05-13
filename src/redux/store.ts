import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './root.reducer';

const setupStore = () => configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore();
