// AuthReducerの中の状態に変更する
const AuthReducer = (state, action) => {
  //actionの状態に寄って、それぞれのstateの中身を返す
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    //最終的なstateを返す
    default:
      return state;
  }
};

export default AuthReducer;
