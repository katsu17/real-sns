import React, { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef(); //値を監視できる ref={}属性をつけて使う
  const password = useRef();
  const passwordConfirmation = useRef();
  const baseURL = process.env.BACKEND_ACCESS;

  const navigate = useNavigate(); //App.jsのNavigateコンポーネントと同じ役割（react-router-dom)

  const handleSubmit = async (e) => {
    e.preventDefault();

    //確認パスワードの照合
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      try {
        //registerAPIのリクエストボディーに対応したパラメータを作る
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };

        //registerAPIを叩く
        await axios.post(`${baseURL}auth/register`, user);
        //home画面に移動する
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Real SNS</h3>
            <span className="loginDesc">本格的なSNSを、自分の手で。</span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
              <p className="loginMsg">新規登録はこちら</p>
              <input
                type="text"
                className="loginInput"
                placeholder="ユーザー名"
                required
                ref={username}
              />
              <input
                type="email"
                className="loginInput"
                placeholder="Eメール"
                required
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="パスワード"
                required
                minLength={6}
                ref={password}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="確認用パスワード"
                required
                minLength={6}
                ref={passwordConfirmation}
              />
              <button className="loginButton" type="submit">
                サインアップ
              </button>
              <button className="loginRegisterButton">ログイン</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
