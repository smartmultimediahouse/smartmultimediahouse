export const mapStateToProps = state => {
  let store = state.userReducer
  return {
    isLoader: store.isLoader,
    isLoggedIn: store.isLoggedIn,
    userData: store.userData,
    getCategories: store.category,
    getCommunities: store.communities,
    getCommunitiesComments: store.communitiesComments,
    getCatDetails: store.categoryDetails,
    getCartList: store.cartList,
    notify: store.notify,
    productsList: store.productsList,
    cartTotalAmount: store.cartTotalAmount,
    partnersList: store.partnersList,
    authModal: store.authModal
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setLoader: status => {
      dispatch({ type: "SET_LOADER_STATUS", payload: status });
    },
    setLoginStatus: status => {
      dispatch({ type: "SET_LOGIN_STATUS", payload: status });
    },
    setAuthModal: status => {
      dispatch({ type: "SET_AUTH_MODAL", payload: status });
    },
    setUserData: data => {
      if(data !== undefined){
        dispatch({ type: "SET_USER_DATA", payload: data });
      }else{
        dispatch({ type: "SET_USER_DATA", payload: {} });
      }
    },

    setCategory: data => {
      if(data !== undefined){
        dispatch({ type: "SET_CATEGORY", payload: data });
      }else{
        dispatch({ type: "SET_CATEGORY", payload: {} });
      }
    },

    setCommunities: data => {
      if(data !== undefined){
        dispatch({ type: "SET_COMMUNITIES", payload: data });
      }else{
        dispatch({ type: "SET_COMMUNITIES", payload: {} });
      }
    },

    setCommunitiesComments: data => {
      if(data !== undefined){
        dispatch({ type: "SET_COMMUNITIES_COMMENTS", payload: data });
      }else{
        dispatch({ type: "SET_COMMUNITIES_COMMENTS", payload: {} });
      }
    },

    setCatDetails: data => {
      if(data !== undefined){
        dispatch({ type: "SET_CATEGORY_DATA", payload: data });
      }else{
        dispatch({ type: "SET_CATEGORY_DATA", payload: {} });
      }
    },
    setCartList: data => {
      if(data && typeof(data) === "object"){
        dispatch({ type: "SET_CART_LIST", payload: data });
      }else{
        dispatch({ type: "SET_CART_LIST", payload: [] });
      }
    },
    setNotify: data => {
      dispatch({ type: "SET_NOTIFY", payload: data });
    },
    setProductsList: data => {
      dispatch({ type: "SET_PRODUCTS_LIST", payload: data });
    },
    setCartTotalAmount: data => {
      dispatch({ type: "SET_CART_TOTAL_AMOUNT", payload: data });
    },
    setPartnersList: list => {
      dispatch({ type: "SET_PARTNERS_LIST", payload: list });
    },
  };
};