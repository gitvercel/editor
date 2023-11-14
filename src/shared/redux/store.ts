
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import pageReducer from './reducers/page.reducers';
import selectedPageReducer from './reducers/selectedPage.reducer';
import editingAttributesReducer from './reducers/editingAttributes.reducers';

const rootReducer = combineReducers({
  selectedPage: selectedPageReducer,
  page: pageReducer,
  editingAttributes: editingAttributesReducer
});

const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof rootReducer>;

export default store; 