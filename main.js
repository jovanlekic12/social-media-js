"use strict";

import "./style.css";
import { user } from "./data.js";
import { formatDistanceToNow } from "date-fns";
const friendsList = document.querySelector(".friends__list");

class User {
  id;
  firstName;
  lastName;
  img;
  backgroundImg;
  address;
  friends;
  posts;
  constructor(
    firstName,
    lastName,
    img,
    backgroundImg,
    address,
    friends,
    posts
  ) {
    this.id = crypto.randomUUID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.img = img;
    this.backgroundImg = backgroundImg;
    this.address = address;
    this.posts = posts;
    this.friends = friends;
  }

  renderFriends() {
    friendsList.innerHTML = "";
    this.friends.forEach((friend) => {
      const html = `<li class="friends__list__item" id="${friend.id}">
      <img src="${friend.img}" alt="404" class="friend__photo" />
      <h2 class="friend__username">${friend.firstName} ${friend.lastName}</h2>
      </li>`;
      friendsList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

class Post {
  id;
  postText;
  postDate;
  likes;
  comments;
  constructor(postText, postDate) {
    id = crypto.randomUUID();
    this.postText = postText;
    this.postDate = postDate;
    this.likes = [];
    this.comments = [];
  }
}

class Like {
  firstName;
  lastName;
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Comment {
  firstName;
  lastName;
  commentText;
  img;
  constructor(firstName, lastName, commentText, img) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.commentText = commentText;
    this.img = img;
  }
}

const user1 = new User(
  user.firstName,
  user.lastName,
  user.img,
  user.backgroundImg,
  user.address,
  user.friends,
  user.posts
);

user1.renderFriends();
