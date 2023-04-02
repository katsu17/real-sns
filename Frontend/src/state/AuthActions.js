// ユーザー入力に応じたアクションの設定
//userには今のユーザーの状態が入っている
export const LoginStart = (user) => ({
  //typeはアクションの名前
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  //payloadは状態を返すための指定
  payload: user,
});
export const LoginError = (error) => ({
  type: "LOGIN_ERROR",
  payload: error,
});
