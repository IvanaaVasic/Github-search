const searchButton = document.querySelector(".search-button");
const defaultUser = "octocat";
const inputField = document.querySelector(".search-input");

searchButton.addEventListener("click", () => {
  const searchedUser = document.querySelector(".search-input").value;
  if (searchedUser === "") {
    return;
  }
  callApi(searchedUser);
});

inputField.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    searchButton.click();
  }
});

function callApi(userParam) {
  fetch("https://api.github.com/users/" + userParam)
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      const errorMessage = document.querySelector(".error-message");
      if (user.id === undefined) {
        errorMessage.classList.add("error-message-visible");
      } else {
        updateUserData(user);
        errorMessage.classList.remove("error-message-visible");
      }
    });
}

function updateUserData(user) {
  updateName(user);
  updateDate(user);
  updateBio(user);
  updateNumInfo(user);
  updateLocation(user);
  updateBlog(user);
  updateTwitter(user);
  updateCompany(user);
  updateAvatar(user);
}

function checkUserExistance(user) {
  const errorMessage = document.querySelector(".error-message");
  if (user.id === undefined) {
    errorMessage.classList.add("error-message-visible");
  } else {
    errorMessage.classList.remove("error-message-visible");
  }
}

function updateName(user) {
  const name = document.querySelector(".name");
  const login = document.querySelector(".login");
  name.innerText = user.name;
  login.innerText = `@${user.login}`;
}

function updateDate(user) {
  const date = document.querySelector(".date");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const d = new Date(user.created_at);
  const year = d.getFullYear();
  const day = d.getDate();
  const month = monthNames[d.getMonth()];
  date.innerText = `Joined ${day} ${month} ${year}`;
}

function updateBio(user) {
  const date = document.querySelector(".bio");
  if (user.bio === null) {
    date.innerText = "This profile has no bio";
  } else {
    date.innerText = user.bio;
  }
}

function updateNumInfo(user) {
  const repo = document.querySelector(".repo-num");
  const followers = document.querySelector(".followers-num");
  const following = document.querySelector(".following-num");
  repo.innerText = user.public_repos;
  followers.innerText = user.followers;
  following.innerText = user.following;
}

function updateLocation(user) {
  const location = document.querySelector(".location-text");
  const locationField = document.querySelector(".location-wrapper");
  if (user.location === null) {
    location.innerText = "Not Available";
    locationField.style["opacity"] = "0.5";
  } else {
    location.innerText = user.location;
    locationField.style["opacity"] = "1";
  }
}

function updateBlog(user) {
  const blog = document.querySelector(".website-text");
  const blogField = document.querySelector(".blog-wrapper");
  if (user.blog === "") {
    blog.innerText = "Not Available";
    blogField.style["opacity"] = "0.5";
    blog.removeAttribute("href");
  } else {
    blog.innerText = user.blog;
    blog.href = user.blog;
    blogField.style["opacity"] = "1";
  }
}

function updateTwitter(user) {
  const twitter = document.querySelector(".twitter-text");
  const twitterField = document.querySelector(".twitter-wrapper");

  if (user.twitter_username === null) {
    twitter.innerText = "Not Available";
    twitterField.style["opacity"] = "0.5";
    twitter.removeAttribute("href");
  } else {
    twitter.innerText = user.twitter_username;
    twitter.href = "https://twitter.com/" + user.twitter_username;
    twitterField.style["opacity"] = "1";
  }
}

function updateCompany(user) {
  const company = document.querySelector(".company-text");
  const companyField = document.querySelector(".company-wrapper");
  if (user.company === null) {
    company.innerText = "Not Available";
    companyField.style["opacity"] = "0.5";
    company.removeAttribute("href");
  } else if (user.company.startsWith("@")) {
    company.innerText = user.company;
    company.href = "https://github.com/" + user.company.substring(1);
    companyField.style["opacity"] = "1";
  } else {
    company.innerText = user.company;
    company.removeAttribute("href");
    companyField.style["opacity"] = "1";
  }
}

function updateAvatar(user) {
  const avatar = document.querySelector(".avatar");
  avatar.src = user.avatar_url;
  console.log(user.avatar_url);
}

callApi(defaultUser);
