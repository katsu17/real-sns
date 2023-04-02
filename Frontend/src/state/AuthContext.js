// globalContext= どこからでもアクセスできるprops的な考え

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// 最初のユーザーの初期状態を定義
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // user: {
  //   _id: "63faf626e281302e4079fd4b",
  //   username: "katsuaki",
  //   email: "katsuaki@gmail.com",
  //   password: "abcdef",
  //   profilePicture: "/person/1.jpeg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   isAdmin: false,
  // },
  isFetching: false,
  error: false,
};

// 状態をグローバルに管理する
//createContextでglobalContextを作ることができる
//initialStateをどこでも使えるようにしてる
export const AuthContext = createContext(initialState);

//認証状態の提供
export const AuthContextProvider = ({ children }) => {
  // useReducerを使うことでstate,reducer,dispathを取りまとめて扱うことができる
  // useReducerはuseStateと似ていて、初期値を設定しておくことができ、stateで初期値、dispatchでset関数的な機能を果たせる
  // 第一引数にReducer関数（AuthReducer:昔のstateの状態を新しいstateに更新する）、第二引数に初期値の状態を定義する
  // stateには現在の状態が入っている、ログインしたか、成功したか、エラーか
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    // createContextを使っている時にProviderをつけ、どこにでも提供できるようにしている
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
