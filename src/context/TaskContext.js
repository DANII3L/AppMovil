import React, {createContext, useReducer} from 'react';

const TaskContext = createContext();

const initialState = {
  products: [],
  favorites: [],
  productsBuy: [],
  purchaseHistory: [],
  users: [],
  userConnect: [],
  carouselData: [],
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
      return {
        ...state,
        [collectionType]: [...state[collectionType], payload],
      };
    case 'UPDATE_ITEM':
      if (!payload || !payload.id) {
        return state;
      }
      return {
        ...state,
        [collectionType]: state[collectionType].map(item => {
          if (
            ['favorites', 'productsBuy', 'purchaseHistory'].includes(
              collectionType,
            )
          ) {
            return item.id === payload.id &&
              item.userCorreo === (state.userConnect[0]?.userCorreo ?? null)
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
              item.userCorreo === (state.userConnect[0]?.userCorreo ?? null)
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
          return !((item.userCorreo) === (state.userConnect[0]?.userCorreo ?? null));
        }),
      };
    default:
      return state;
  }
};

export const TaskProvider = ({children}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
