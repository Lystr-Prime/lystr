import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import search from './search.reducer';
import vehicle from './vehicle.reducer';
import staticData from './static_data.reducer';
import feedback from './feedback.reducer';
import rental from './rental.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  search, // search query and results
  vehicle, // all info regarding vehicles
  staticData, // data for form dropdowns and toggles, city autofill
  feedback, // loading and success feedback
  rental, // reservation info
});

export default rootReducer;
