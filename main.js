const displayBooks = document.querySelector(".display-books");
const addBookBtn = document.querySelector("#add-book");
const addBtn = document.querySelector("#add");
const cancelBtn = document.querySelector("#cancel");
const form = document.querySelector("#book-form");

let myLibrary = [];

function Books(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    info = `${title} by ${author}, ${pages} pages`;
      return info;
  }
}

function arrayPlace(place) {
  this.place = place
}
function bookPicture(picture) {
  this.picture = picture
}
//arrayPlace.prototype = Object.create(Books.prototype)
bookPicture.prototype = Object.create(Books.prototype)

function addBookToLibrary(book) {
  myLibrary.push(book);
 // alert("add")
  renderLast(book);
}

//test books
const book1 = new Books('Eisenhorn', 'Dan Abnett', "768", "yes")
const book2 = new Books('Ravenor', 'Dan Abnett', "900", "nah")
const book3 = new Books('title', 'author', "number pages", "yesno")
const book4 = new Books('book', 'someone', "number pages", "nah")
//alert(`${myLibrary.length}`)
book1.picture = "https://images-na.ssl-images-amazon.com/images/I/51iQf9TinNL._SX324_BO1,204,203,200_.jpg";
book2.picture ="https://images-na.ssl-images-amazon.com/images/I/71tm70Ez1HL.jpg";
addBookToLibrary(book1);
addBookToLibrary(book2);


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
   // alert(`${myLibrary.length-1}`)
    displayBooks.appendChild(bookTemplate);
    const bookInfo = document.createElement("div");
    bookInfo.className = "book-info";
    bookTemplate.appendChild(bookInfo);
    const bookCover = document.createElement("img");
    bookCover.className = "book-cover";
    bookCover.setAttribute("src", `${e.picture}`);
    bookTemplate.appendChild(bookCover);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "delete";
    deleteBtn.setAttribute("data-place", `${myLibrary.length-1}`);
    bookTemplate.appendChild(deleteBtn);
    const para = document.createElement("p");
    bookInfo.appendChild(para);

    deleteBtn.addEventListener("click",(e) => {
      let place = e.target.getAttribute('data-place');
      remove(place);
    });

    para.textContent = `${e.info()}`
}


addBookBtn.addEventListener("click", () => {
  document.getElementById("book-form").style.display = "block";
});

addBtn.addEventListener("click", () => {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").value;
  let img = document.getElementById("img").value;
  let place = `${myLibrary.length}`

  let book = new Books(title, author, pages, read);
  book.place = place;
  book.picture = img;
  addBookToLibrary(book)
  document.getElementById("book-form").style.display = "none";
  resetFormValue();
});

cancelBtn.addEventListener("click", () => {
  document.getElementById("book-form").style.display = "none";
  resetFormValue();
});

//const deleteBtn = document.querySelectorAll(".delete");
//deleteBtn.forEach( (remove) => {
//  remove.addEventListener("click", (e) => {
    function remove(place) { 
    //let place = e.target.getAttribute('data-place');
    myLibrary.splice(place, 1);
    let div = document.querySelector(`div[data-place="${place}"]`)
    displayBooks.removeChild(div);
    }
  //});
 //});

function resetFormValue() {
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