const displayBooks = document.querySelector(".display-books");
const addBookBtn = document.querySelector("#add-book");
const addBtn = document.querySelector("#add");
const cancelBtn = document.querySelector("#cancel");
const form = document.querySelector("#book-form");

let myLibrary = [];

function Books(title, author, pages, read, img, place) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.img = img
  this.place = place
  this.info = function () {
    info = `${title} by ${author}, ${pages} pages`;
      return info;
    }
  this.status = function() {
    this.read ? true : false;
  }
}


function addBookToLibrary(book) {
  myLibrary.push(book);
  renderLast(book);
}

//test books
const book1 = new Books('Eisenhorn', 'Dan Abnett', "768", "did")
const book2 = new Books('Ravenor', 'Dan Abnett', "900", "did")
const book3 = new Books('The Ultramaries', 'Graham McNeill', "989", "didNot")
const book4 = new Books('book', 'someone', "99", "did")
book1.img = "https://images-na.ssl-images-amazon.com/images/I/51iQf9TinNL._SX324_BO1,204,203,200_.jpg";
book2.img ="https://images-na.ssl-images-amazon.com/images/I/71tm70Ez1HL.jpg";
book3.img = "https://dave430.files.wordpress.com/2015/10/ultramarined-omnibus.jpg";
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


//not used now
let render = ((array) => { 
    array.forEach ((e) => {
        createTemplate(e)
    });
}); 

function renderLast(e) {
  createTemplate(e)
}

function createTemplate (e) {
    const bookTemplate = document.createElement("div");
    bookTemplate.className = "books";
    bookTemplate.setAttribute("data-place", `${myLibrary.length-1}`);
    displayBooks.appendChild(bookTemplate);
    const bookInfo = document.createElement("div");
    bookInfo.className = "book-info";
    bookTemplate.appendChild(bookInfo);
    const bookCover = document.createElement("img");
    bookCover.className = "book-cover";
    bookCover.setAttribute("src", `${e.img}`);
    bookTemplate.appendChild(bookCover);
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "delete";
    deleteBtn.textContent = "delete";
    deleteBtn.setAttribute("data-place", `${myLibrary.length-1}`);
    bookTemplate.appendChild(deleteBtn);
    const readBtn = document.createElement("button");
    readBtn.setAttribute("data-place", `${myLibrary.length-1}`);
    readBtn.id = "read";
    readBtn.textContent = "read";
    bookTemplate.appendChild(readBtn);
    const readStatus = document.createElement("img");
    readStatus.id = "read-status";
    readStatus.setAttribute("src", "./img/checkbox.png");
    if (myLibrary[`${myLibrary.length-1}`].read == "didNot") readStatus.style.display="none";
    bookTemplate.appendChild(readStatus);
    const para = document.createElement("p");
    bookInfo.appendChild(para);

    para.textContent = `${e.info()}`

    deleteBtn.addEventListener("click",(e) => {
      let place = e.target.getAttribute('data-place');
      confirm("Are you sure?") ? remove(place) : alert("Canceled")
    });

    bookTemplate.addEventListener("mouseenter", (e) => {
      e.target.querySelector("#delete").style.display = "block";
      e.target.querySelector("#read").style.display = "block";
    });

    bookTemplate.addEventListener("mouseleave", (e) => {
      e.target.querySelector("#delete").style.display = "none";
      e.target.querySelector("#read").style.display = "none";
    });

    readBtn.addEventListener("click", (e) => {
      let locate = e.target.getAttribute('data-place');
      let read = myLibrary[locate].read;
      
      if (read == "did") {
        myLibrary[locate].read="didNot";
        e.target.nextSibling.style.display = "none";
      }
      else if (read == "didNot") {
        myLibrary[locate].read="did";
        read="did";
        e.target.nextSibling.style.display = "block";
      }
    });
  }



addBookBtn.addEventListener("click", () => {
  document.getElementById("book-form").style.display = "block";
});

addBtn.addEventListener("click", (e) => {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read-check").value;
  let img = document.getElementById("img").value;
  let place = `${myLibrary.length}`


  if ((title == "") || (author == "") || ( isNaN(pages)) || (pages < 1) ){
    alert("Fill out the form");
    return false;
  }

  if (img == "") {
    img = "./img/book.png"
  }

  let book = new Books(title, author, pages, read, img, place);
  book.status = read;
  addBookToLibrary(book)
  resetFormValue();
});

function validateForm (title, author, pages, img) {

}

cancelBtn.addEventListener("click", () => {
  resetFormValue();
});

function remove(place) { 
    myLibrary.splice(place, 1);
    let div = document.querySelector(`div[data-place="${place}"]`)
    displayBooks.removeChild(div);
  }


function resetFormValue() {
  document.getElementById("book-form").style.display = "none";
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").value = "";
  document.getElementById("img").value = "";
}


/*
form.addEventListener("submit", () => {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").value;

  const book = new Books(title, author, pages, read);
  addBookToLibrary(book);
  console.log(myLibrary)
  alert(`submit ${book}`)
});

function submitForm () {
  
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").value;

  let book = new Books(title, author, pages, read);
  addBookToLibrary(book)
  alert("submitted")
}
*/