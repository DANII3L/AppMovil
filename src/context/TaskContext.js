import React, {createContext, useReducer} from 'react';

const TaskContext = createContext();

const inicialState = {
  products: [],
  favorites: [],
  productsBuy: [],
  purchaseHistory: [],
  users: [],
  userConnect: [],
};

const taskReducer = (state, action) => {
  const {type, payload, collectionType} = action;
  switch (type) {
    case 'SET_ITEMS':
      return {
        ...state,
        [collectionType]: [...state[collectionType], payload],
      };
    case 'ADD_ITEM':
      // database().ref(`/${collectionType}/${payload.id}`).set(payload);
      return {
        ...state,
        [collectionType]: [...state[collectionType], payload],
      };
    case 'UPDATE_ITEM':
      if (!payload || !payload.id) {
        return state;
      }
      // database().ref(`/${collectionType}/${payload.id}`).set(payload);
      return {
        ...state,
        [collectionType]: state[collectionType].map(item => {
          if (
            ['favorites', 'productsBuy', 'purchaseHistory'].includes(
              collectionType,
            )
          ) {
            return item.id === payload.id &&
              item.userCorreo === state.userConnect[0].userCorreo
              ? payload
              : item;
          }
          return item.id === payload.id ? payload : item;
        }),
      };
    case 'DELETE_ITEM':
      if (!payload) {
        return state;
      }
      // database().ref(`/${collectionType}/${payload.id}`).remove();
      return {
        ...state,
        [collectionType]: state[collectionType].filter(item => {
          if (
            ['favorites', 'productsBuy', 'purchaseHistory'].includes(
              collectionType,
            )
          ) {
            return !(
              item.id === payload.id &&
              item.userCorreo === state.userConnect[0].userCorreo
            );
          } else if (collectionType === 'userConnect') {
            return false;
          }
          return item.id !== payload;
        }),
      };
    case 'DELETE_ALL_ITEMS':
      return {
        ...state,
        [collectionType]: state[collectionType].filter(item => {
          console.log(item.userCorreo, state.userConnect[0].userCorreo);
          return !(item.userCorreo === state.userConnect[0].userCorreo);
        }),
      };
    default:
      return state;
  }
};

export const TaskProvider = ({children}) => {
  const [state, dispatch] = useReducer(taskReducer, inicialState);

  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
