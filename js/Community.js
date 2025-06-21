const POSTS_PER_PAGE = 10;
let currentPage = 1;
let currentViewingPostId = null;

function getPosts() {
  return JSON.parse(localStorage.getItem("communityPosts")) || [];
}

function renderPosts(page) {
  const posts = getPosts();
  const tbody = document.getElementById("board-body");
  tbody.innerHTML = "";

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = posts.slice(start, end);

  currentPosts.forEach((post, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${posts.length - (start + index)}</td>
      <td><a href="#" class="post-title" data-id="${start + index}">${post.title}</a></td>
      <td>${post.author}</td>
      <td>${post.date}</td>
      <td>${post.views}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderPagination() {
  const posts = getPosts();
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;
  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const prevBtn = document.createElement("a");
  prevBtn.href = "#";
  prevBtn.textContent = "«";
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderPosts(currentPage);
      renderPagination();
    }
  });
  pagination.appendChild(prevBtn);

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = i;
      renderPosts(currentPage);
      renderPagination();
    });

    pagination.appendChild(btn);
  }

  const nextBtn = document.createElement("a");
  nextBtn.href = "#";
  nextBtn.textContent = "»";
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < pageCount) {
      currentPage++;
      renderPosts(currentPage);
      renderPagination();
    }
  });
  pagination.appendChild(nextBtn);
}


document.addEventListener("DOMContentLoaded", () => {
  renderPosts(currentPage);
  renderPagination();

  const modal = document.getElementById("postModal");
  const modalTitle = document.getElementById("modal-title");
  const modalMeta = document.getElementById("modal-meta");
  const modalContent = document.getElementById("modal-content-text");
  const closeBtn = document.querySelector(".modal .close");
  const deleteBtn = document.getElementById("deleteBtn");

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("post-title")) {
      e.preventDefault();
      const postId = parseInt(e.target.getAttribute("data-id"));
      const post = getPosts()[postId];

      currentViewingPostId = postId;
      modalTitle.textContent = post.title;
      modalMeta.textContent = `작성자: ${post.author} / 작성일: ${post.date}`;
      modalContent.textContent = post.content;
      modal.style.display = "block";
    }
  });

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  deleteBtn.addEventListener("click", () => {
    if (currentViewingPostId === null) return;

    if (confirm("정말 이 글을 삭제하시겠습니까?")) {
      const posts = getPosts();
      posts.splice(currentViewingPostId, 1);
      localStorage.setItem("communityPosts", JSON.stringify(posts));

      modal.style.display = "none";
      currentViewingPostId = null;
      renderPosts(currentPage);
      renderPagination();
    }
  });
});
