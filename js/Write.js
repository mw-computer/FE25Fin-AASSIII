document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;
  const date = new Date().toISOString().slice(0, 10);
  const views = 0;

  const newPost = { title, author, content, date, views };


  const existingPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];
  existingPosts.unshift(newPost);

  localStorage.setItem("communityPosts", JSON.stringify(existingPosts));

  alert("글이 등록되었습니다.");
  window.location.href = "Community.html";
});

