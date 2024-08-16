"use strict";

import "./style.css";
import { user } from "./data.js";
import { formatDistanceToNow } from "date-fns";
const friendsList = document.querySelector(".friends__list");
const postsList = document.querySelector(".posts__list");
const freindsCounter = document.querySelector(".friends__counter");
const newPostForm = document.querySelector(".new__post__form");
const newPostInput = document.querySelector(".new__post__input");
const search = document.querySelector(".search__input");
const findFriendsList = document.querySelector(".find__friends__list");
let newPostValue;
let commentValue;

window.addEventListener("load", function () {
  const loader = this.document.querySelector(".loader");
  loader.classList.add("loader-hidden");
});

class User {
  id;
  firstName;
  lastName;
  img;
  backgroundImg;
  address;
  friends;
  posts;
  constructor(firstName, lastName, img, backgroundImg, address, friends) {
    this.id = crypto.randomUUID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.img = img;
    this.backgroundImg = backgroundImg;
    this.address = address;
    this.friends = friends;
    this.posts = [];
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

  addPost(post) {
    this.posts.push(post);
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
          <p class="likes__p likes__p__${post.id}"></p>

          <p class="comments__p comments__p__${post.id}">${
        post.comments.length
      } comments</p>
      </div>
      <div class="post__buttons">
        <button class="post__btn btn__like"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
          </svg><span>Like</span>
        </button>
        <button class="post__btn btn__comment"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
          <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
          </svg><span>Comment</span>
        </button>
      </div>
      <ul class="comments__list comments__list__${post.id} hide" id="${
        post.id
      }"></ul>
      <div class="add__comment__div">
      <img class="post__user__photo" src="${this.img}" alt="404" />
      <form class="add__comment__form">
      <input type="text" class="add__comment__input" placeholder="Write a comment" required/>
      <button class="add__comment__btn">Add comment</button>
      </form>
      </div>
      </li>`;
      postsList.insertAdjacentHTML("afterbegin", html);
      const likeParagraph = document.querySelector(`.likes__p__${post.id}`);
      post.renderLikes(likeParagraph);
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
    this.id = crypto.randomUUID();
    this.postText = postText;
    this.postDate = postDate;
    this.likes = [];
    this.comments = [];
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  addLike(like) {
    this.likes.push(like);
  }

  removeLike(id) {
    this.likes = this.likes.filter((like) => like.id !== id);
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

  renderComments() {
    const commentsList = document.querySelector(`.comments__list__${this.id}`);
    commentsList.innerHTML = "";
    this.comments.forEach((comment) => {
      const html = `<li class="comments__list__item" id="${comment.id}">
                      <img src="${comment.img}" class="comment__photo">
                      <div class="comment__info">
                        <p class="comment__owner">${comment.firstName} ${
        comment.lastName
      }</p>
                        <p class="comment__text">${comment.commentText}</p>
                      </div>
                      <div class="comment__like">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="comment__like__icon" viewBox="0 0 16 16">
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                      </svg>
                      <p class="comment__like__counter ${
                        comment.likes.length === 0 ? "hide" : ""
                      }">${comment.likes.length}</p>
                      </div>
                    </li>`;
      commentsList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

class Like {
  id;
  firstName;
  lastName;
  constructor(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class CommentLike {
  id;
  firstName;
  lastName;
  constructor(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Comment {
  id;
  firstName;
  lastName;
  commentText;
  img;
  likes;
  constructor(firstName, lastName, commentText, img) {
    this.id = crypto.randomUUID();
    this.likes = [];
    this.firstName = firstName;
    this.lastName = lastName;
    this.commentText = commentText;
    this.img = img;
  }
  addLike(like) {
    this.likes.push(like);
  }
  removeLike(id) {
    this.likes = this.likes.filter((like) => like.id !== id);
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
user.posts.forEach((post) => {
  const newPost = new Post(
    post.postText,
    post.postDate,
    post.likes,
    post.comments
  );

  post.comments.forEach((comment) => {
    const newComment = new Comment(
      comment.firstName,
      comment.lastName,
      comment.commentText,
      comment.img
    );
    comment.likes.forEach((like) => {
      const newLike = new CommentLike(like.firstName, like.lastName);
      newComment.addLike(newLike);
    });
    newPost.addComment(newComment);
  });

  post.likes.forEach((like) => {
    const newLike = new Like(post.id, like.firstName, like.lastName);
    newPost.addLike(newLike);
  });

  user1.addPost(newPost);
});

user1.renderPosts();
user1.posts.forEach((post) => post.renderComments());
console.log(user1);
newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  user1.addPost(new Post(newPostValue, new Date()));
  user1.renderPosts();
  user1.posts.forEach((post) => post.renderComments());
  newPostInput.value = "";
  console.log(user1);
});

newPostInput.addEventListener("input", function (event) {
  newPostValue = event.target.value;
});

let form;
function addComment(event, post, commentCounter, list, input) {
  event.preventDefault();
  console.log("123");
  post.addComment(
    new Comment(user1.firstName, user1.lastName, commentValue, user1.img)
  );
  input.value = "";
  post.renderComments();
  commentCounter.textContent = `${post.comments.length} comments`;
  list.classList.remove("hide");
  console.log(post);
}
postsList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add__comment__input")) {
    const li = event.target.closest("li");
    const id = li.id;
    const currentPost = user1.posts.find((post) => post.id === id);
    form = event.target.closest("form");
    const commentCounter = document.querySelector(`.comments__p__${id}`);
    const list = document.querySelector(`.comments__list__${id}`);
    const clonedForm = form.cloneNode(true);
    form.parentNode.replaceChild(clonedForm, form);
    form = clonedForm;
    const input = form.querySelector(".add__comment__input");
    input.addEventListener("input", function (event) {
      commentValue = event.target.value;
    });
    input.focus();
    form.addEventListener("submit", (event) =>
      addComment(event, currentPost, commentCounter, list, input)
    );
  }
  if (event.target.classList.contains("comments__p")) {
    //coments list
    const li = event.target.closest("li");
    const id = li.id;
    const list = document.querySelector(`.comments__list__${id}`);
    list.classList.contains("hide")
      ? list.classList.remove("hide")
      : list.classList.add("hide");
    return;
  }

  if (event.target.classList.contains("btn__like")) {
    const li = event.target.closest("li");
    const id = li.id;
    const currentPost = user1.posts.find((post) => post.id === id);
    const isLiked = currentPost.likes.some((like) => like.id === id);
    //adding like
    if (!isLiked) {
      currentPost.addLike(new Like(id, user1.firstName, user1.lastName));
      const likeParagraph = document.querySelector(
        `.likes__p__${currentPost.id}`
      );
      currentPost.renderLikes(likeParagraph);
      event.target.classList.add("active");
      return;

      //removing like
    } else if (isLiked) {
      currentPost.removeLike(id);
      const likeParagraph = document.querySelector(
        `.likes__p__${currentPost.id}`
      );
      currentPost.renderLikes(likeParagraph);
      event.target.classList.remove("active");
      return;
    }
  }

  if (event.target.classList.contains("comment__like__icon")) {
    const li = event.target.closest("li");
    const commentId = li.id;
    const ul = event.target.closest("ul");
    const postId = ul.id;
    const currentPost = user1.posts.find((post) => post.id === postId);
    const currentComment = currentPost.comments.find(
      (comment) => comment.id === commentId
    );
    const isLiked = currentComment.likes.some((like) => like.id === commentId);
    if (!isLiked) {
      currentComment.addLike(
        new CommentLike(commentId, user1.firstName, user1.lastName)
      );
      currentPost.renderComments();
    } else if (isLiked) {
      currentComment.removeLike(commentId);
      console.log(currentComment);
      currentPost.renderComments();
    }
  }
});

search.addEventListener("input", function (event) {
  if (event.target.value.length > 0) {
    const searched = user1.friends.filter(
      (friend) =>
        friend.firstName.toLowerCase().includes(event.target.value) ||
        friend.lastName.toLowerCase().includes(event.target.value) ||
        (
          friend.firstName.toLowerCase() +
          " " +
          friend.lastName.toLowerCase()
        ).includes(event.target.value)
    );
    findFriendsList.classList.remove("hide");
    findFriendsList.innerHTML = "";
    searched.forEach((friend) => {
      const html = `<li class="find__friends__list__item">
                      <img src=${friend.img} class="find__friends__photo">
                      <p class="find__friends__name">${friend.firstName} ${friend.lastName}</p>
                    </li>`;
      findFriendsList.insertAdjacentHTML("afterbegin", html);
    });
  } else findFriendsList.classList.add("hide");
});
