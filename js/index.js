document.addEventListener("DOMContentLoaded", function () {
  const ul = document.getElementById("list");
  const panel = document.getElementById("show-panel");
  createBookTitles();
  function createBookTitles() {
    getBooks().then((res) => {
      res.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = book.title;
        li.addEventListener("click", () => {
          bookInfo(book);
        });
        ul.appendChild(li);
      });
    });
  }
  function bookInfo(book) {
    panel.textContent = "";
    const users = document.createElement("div");
    book.users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.username;
      users.appendChild(li);
    });
    const image = document.createElement("img");
    image.setAttribute("src", book.img_url);
    const title = document.createElement("h3");
    title.textContent = book.title;
    const description = document.createElement("p");
    description.textContent = book.description;
    const button = document.createElement("button");
    button.textContent = "LIKE";
    button.addEventListener("click", (e) => {
      likeBook(e, users, book);
    });
    panel.appendChild(image);
    panel.appendChild(title);
    panel.appendChild(description);
    panel.appendChild(users);
    panel.appendChild(button);
  }
  function likeBook(e, users, book) {
    if (e.target.textContent === "LIKE") {
      e.target.textContent = "UNLIKE";
      let user = { id: 10, username: "someone" };
      let li = document.createElement("li");
      li.textContent = user["username"];
      users.appendChild(li);
      book.users.push(user);
      let id = book.id;
      let bookUsers = book.users;
      updateBook(id, bookUsers).then((users) => console.log(users));
    } else {
      e.target.textContent = "LIKE";
    }
  }
  function getBooks() {
    return fetch(`http://localhost:3000/books`).then((res) => res.json());
  }
  function updateBook(id, bookUsers) {
    return fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: bookUsers }),
    }).then((res) => res.json());
  }
});
