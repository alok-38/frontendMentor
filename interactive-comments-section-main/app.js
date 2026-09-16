const commentsContainer = document.querySelector("#comments");
const commentForm = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-input");

let data = null;

async function loadComments() {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("Could not load comments");
    }

    data = await response.json();

    renderComments();
  } catch (error) {
    console.error(error);
  }
}

// comment component

function renderComments() {
  commentsContainer.innerHTML = "";

  data.comments.forEach((comment) => {
    commentsContainer.appendChild(createComment(comment));
  });
}

function createComment(comment) {
  const article = document.createElement("article");

  article.className = "comment card";

  article.innerHTML = `
    <div class="comment__vote">
      <button
        class="vote-button"
        data-action="upvote"
        aria-label="Upvote comment"
      >
        +
      </button>

      <span class="comment__score">
        ${comment.score}
      </span>

      <button
        class="vote-button"
        data-action="downvote"
        aria-label="Downvote comment"
      >
        −
      </button>
    </div>

    <div class="comment__body">
      <header class="comment__header">
        <div class="comment__user">
          <img
            src="${comment.user.image.png}"
            alt="${comment.user.username}"
            class="comment__avatar"
          />

          <strong class="comment__username">
            ${comment.user.username}
          </strong>

          <span class="comment__date">
            ${comment.createdAt}
          </span>
        </div>

        <button
          class="reply-button"
          data-action="reply"
        >
          Reply
        </button>
      </header>

      <p class="comment__content">
        ${comment.content}
      </p>
    </div>
  `;

  article.dataset.commentId = comment.id;

  return article;
}

// voting
commentsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const commentElement = button.closest(".comment");

  if (!commentElement) return;

  const commentId = Number(commentElement.dataset.commentId);

  const comment = data.comments.find((comment) => comment.id === commentId);

  if (!comment) return;

  if (button.dataset.action === "upvote") {
    comment.score++;
  }

  if (button.dataset.action === "downvote") {
    comment.score--;
  }

  renderComments();
});

// Adding a new comment
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const content = commentInput.value.trim();

  if (!content) return;

  const newComment = {
    id: Date.now(),
    content,
    createdAt: "just now",
    score: 0,
    user: data.currentUser,
    replies: [],
  };

  data.comments.push(newComment);

  commentInput.value = "";

  renderComments();
});

// Load the data
loadComments();