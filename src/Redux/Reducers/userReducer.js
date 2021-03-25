import createReducer from "../Library/createReducer";
import * as types from "./../Actions/types";
import { initialState } from "./initialState";

export const userReducer = createReducer(initialState, {
  [types.SET_LOADER_STATUS](state, action) {
    return {
      ...state,
      isLoader: action.payload
    };
  },
  [types.SET_LOGIN_STATUS](state, action) {
    if(action.payload){
      return {
        ...state,
        isLoggedIn: action.payload
      };
    }else{
      return {
        ...state,
        userData:{},
        isLoggedIn:false,
      }
    }
  },
  [types.SET_AUTH_MODAL](state, action) {
    if(action.payload){
      return {
        ...state,
        authModal: action.payload
      };
    } else {
      return {
        ...state,
        authModal: false
      };
    }
  },
  [types.SET_USER_DATA](state, action) {
    return {
      ...state,
      userData: action.payload
    };
  },
  [types.SET_CATEGORY](state, action) {
    return {
      ...state,
      category: action.payload ? action.payload : {}
    };
  },
  [types.SET_COMMUNITIES](state, action) {
    return {
      ...state,
      communities: action.payload
    };
  },
  [types.SET_COMMUNITIES_COMMENTS](state, action) {
    return {
      ...state,
      communitiesComments: action.payload
    };
  },
  [types.SET_CATEGORY_DATA](state, action) {
    return {
      ...state,
      categoryDetails: action.payload ? action.payload : []
    };
  },
  [types.SET_CART_LIST](state, action) {
    return {
      ...state,
      cartList: action.payload ? action.payload : []
    };
  },
  [types.SET_NOTIFY](state, action) {
    return {
      ...state,
      notify: action.payload ? action.payload : {}
    };
  },
  [types.SET_PRODUCTS_LIST](state, action) {
    return {
      ...state,
      productsList: action.payload ? action.payload : []
    };
  },
  [types.SET_CART_TOTAL_AMOUNT](state, action) {
    return {
      ...state,
      cartTotalAmount: action.payload ? action.payload : []
    };
  },
  [types.SET_PARTNERS_LIST](state, action) {
    return {
      ...state,
      partnersList: action.payload ? action.payload : []
    };
  },
});