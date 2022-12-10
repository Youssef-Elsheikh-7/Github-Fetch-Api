let button = document.getElementById("click");
let input = document.getElementById("user");
let parent = document.getElementById("parent");

button.onclick = function () {
  parent.innerHTML = "";
  if (input.value !== "") {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((resolve) => {
        let myData = resolve.json();
        return myData;
      })
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          let div = document.createElement("div");
          div.className = "box";
          let repoName = document.createElement("div");
          repoName.className = "repo";
          let stars = document.createElement("div");
          stars.className = "stars";
          let starCount = document.createElement("span");
          let starIcon = document.createElement("i");
          starIcon.className = "fas fa-star icon";
          starCount.innerHTML = result[i].stargazers_count;
          stars.appendChild(starCount);
          stars.appendChild(starIcon);
          repoName.innerHTML = result[i].name;
          div.appendChild(repoName);
          div.appendChild(stars);
          parent.appendChild(div);
        }
      })
      .catch((err) => {
        console.log(err);
        // let divError = document.createElement("div");
        // divError.className = "error";
        // divError.innerHTML = err;
        // parent.appendChild(divError);
      });
  }
  input.value = "";
};
