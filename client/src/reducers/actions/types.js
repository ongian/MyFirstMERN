//The reason that action types are separated in other file and imported to reducers
//is when there are changes to action types name, it will be easy to change and won't
//need to go to each reducers where action types was set.
export const SET_ALERT = 'SET_ALERT';

export const REMOVE_ALERT = 'REMOVE_ALERT';