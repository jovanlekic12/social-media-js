"use strict";

import "./style.css";
import { user } from "./data.js";
import { formatDistanceToNow } from "date-fns";
const friendsList = document.querySelector(".friends__list");
const postsList = document.querySelector(".posts__list");
const freindsCounter = document.querySelector(".friends__counter");

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
    freindsCounter.textContent =
      this.friends.length === 1
        ? `${this.friends.length} friend`
        : `${this.friends.length} friends`;
    friendsList.innerHTML = "";
    this.friends.forEach((friend) => {
      const html = `<li class="friends__list__item" id="${friend.id}">
      <img src="${friend.img}" alt="404" class="friend__photo" />
      <h2 class="friend__username">${friend.firstName} ${friend.lastName}</h2>
      </li>`;
      friendsList.insertAdjacentHTML("afterbegin", html);
    });
  }

  renderPosts() {
    postsList.innerHTML = "";
    this.posts.forEach((post) => {
      const html = `<li class="posts__list__item" id="${post.id}">
      <div class="post__user__div">
        <img class="post__user__photo" src="${this.img}" alt="404" />
        <div class="post__user__infos">
          <h1 class="post__user__username">${this.firstName} ${
        this.lastName
      }</h1>
          <p class="post__date">${formatDistanceToNow(post.postDate)} ago</p>
        </div>
      </div>

      <h1 class="post__text">${post.postText}</h1>

      <div class="likes__comments__div">
        <div class="likes__container">
          <p class="likes__p likes__p__${post.id}"></p>
        </div>

        <div class="comments__container">
          <p class="comments__p comments__p__${post.id}">${
        post.comments.length
      } comments</p>
        </div>
      </div>
      </li>`;
      postsList.insertAdjacentHTML("afterbegin", html);
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

  renderLikes(likeParagraph) {
    if (this.likes.length <= 0) likeParagraph.innerHTML = "";
    if (this.likes.length === 1)
      likeParagraph.innerHTML = `${this.likes[0].firstName} ${this.likes[0].lastName} likes this post`;
    if (this.likes.length === 2)
      likeParagraph.innerHTML = `${this.likes[0].firstName} ${this.likes[0].lastName} and ${this.likes[1].firstName} ${this.likes[1].lastName} likes this post`;
    if (this.likes.length >= 3)
      likeParagraph.innerHTML = `${this.likes[0].firstName} ${
        this.likes[0].lastName
      }, ${this.likes[1].firstName} ${this.likes[1].lastName} and ${
        this.likes.length - 2
      } others likes this post`;
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
user1.renderPosts();
