import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import "./Share.css";
import axios from "axios";
import { client } from "../../actionCalls";

export default function Share() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);
  console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData(); //keyとvalueを合わせてデータとして残しておく(フォームで打ち込まれたデータを読み込む)
      const fileName = Date.now() + file.name;
      data.append("name", fileName); //dataにappend関数でkeyとvalueを設定
      data.append("file", file);
      newPost.img = fileName; //newPostにimgを付加

      try {
        //画像APIを叩く
        console.log("画像アップロード開始");
        // await axios.post("/upload", data);
        await client("/upload", data);
        console.log("画像アップロード終了");
      } catch (err) {
        console.error(err);
      }
    }

    try {
      // await axios.post("/posts", newPost);
      await client("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture
                : PUBLIC_FOLDER + "/person/noAvatar.jpeg"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="今何してる？"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            {/* htmlForでinputのid="file"となっている要素を指定することで、label全体がinputの機能を持たせることができる */}
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="bule" />
              <span className="shareOptionText">写真</span>
              <input
                type="file"
                id="file"
                accept=".png, .jepeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
}
