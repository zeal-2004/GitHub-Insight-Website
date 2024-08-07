import { useState } from "react";

export default function Search() {
  async function listRepos() {
    document.getElementById("public-repo").classList.add("content-show");
    let username = document.getElementById("input-box").value;
    let link = "https://api.github.com/users/" + username + "/repos";
    await fetch(link)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length != 0) {
            const list = result.map((item) => (
              <div className="text-center">
                <a target="_blank" href={item.svn_url}>
                  {item.name}
                </a>
              </div>
            ));
            setRepoData(list);
          } else if (result.length == 0) {
            setRepoData("None Found");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function getText() {
    let username = document.getElementById("input-box").value;
    if (username == "") {
      alert("Enter valid username!");
    } else {
      let link = "https://api.github.com/users/" + username;
      fetch(link)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.message != "Not Found") {
              document.getElementById("card").classList.add("content-show");
              setAvatarURL(result.avatar_url);
              setGithubUsername(result.login);
              setURL(result.html_url);
              setRepos(result.public_repos);
            } else {
              alert("Username not found!");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGithubUsername] = useState();
  const [URL, setURL] = useState();
  const [repos, setRepos] = useState();
  const [repoData, setRepoData] = useState();

  return (
    <div>
      <div className="text-center mt-5 d-flex justify-content-center gap-2">
        <input
          placeholder="Enter Github Username"
          className="input"
          id="input-box"
        ></input>
        <button
          type="button"
          className="btn btn-outline-light border"
          onClick={getText}
        >
          Search
        </button>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-5">
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="card content" id="card" style={{ width: "18rem" }}>
            <img src={avatarURL} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title text-center" style={{ color: "white" }}>
                {githubUsername}
              </h5>
              <div className="card-text text-center">
                <p>
                  Github URL: <a href={URL}>{URL}</a>
                </p>
                <p>Public Repos: {repos}</p>
                <button
                  onClick={listRepos}
                  className="btn btn-outline-light"
                  id="btn"
                >
                  List all Repos
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="public-repo" className="content mt-5">
          <p className="text-center public">Public Repositories:</p>
          {repoData}
        </div>
      </div>
    </div>
  );
}
