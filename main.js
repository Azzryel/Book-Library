const displayBooks = document.querySelector(".display-books");
const addBookBtn = document.querySelector("#add-book");
const addBtn = document.querySelector("#add");
const cancelBtn = document.querySelector("#cancel");
const form = document.querySelector("#book-form");

let myLibrary = [];

if (storageAvailable('localStorage') && (JSON.parse(localStorage.getItem('myLibrary')) == null)) {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))

}
else if (storageAvailable('localStorage')) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'))

//used a place holder for element positions, so since they get out of synch 
//deleted elements in array and removed the null ones out of them

  myLibrary = myLibrary.filter(function (el) {
    return el != null;
  });

  let n = 0;
  myLibrary.forEach ((e) => {
    myLibrary[n].place = n;
    createTemplate(e, n)
    n++;
  });
}


if (myLibrary == "") {
  //test books
const book1 = new Books('Eisenhorn', 'Dan Abnett', "768", "did")
const book2 = new Books('Ravenor', 'Dan Abnett', "900", "did")
const book3 = new Books('The Ultramaries', 'Graham McNeill', "989", "didNot")
const book4 = new Books('Pariah', 'Dan Abnett', "408", "didNot")
book1.img = "https://images-na.ssl-images-amazon.com/images/I/51iQf9TinNL._SX324_BO1,204,203,200_.jpg";
book2.img ="https://images-na.ssl-images-amazon.com/images/I/71tm70Ez1HL.jpg";
book3.img = "https://dave430.files.wordpress.com/2015/10/ultramarined-omnibus.jpg";
book4.img = "https://sonsofcorax.files.wordpress.com/2013/09/eisenhorn-ravenor-01-pariah.jpg";
addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
addBookToLibrary(book4)
}



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
}

function addBookToLibrary(book) {
  myLibrary.push(book);

  if (storageAvailable('localStorage')) {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  }

  renderLast(book);
}


function renderLast(e) {
  n = myLibrary.length-1;
  createTemplate(e, n)
}

function createTemplate (e, n) {
    const bookTemplate = document.createElement("div");
    bookTemplate.className = "books";
    bookTemplate.setAttribute("data-place", n);
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
    deleteBtn.setAttribute("data-place", n);
    bookTemplate.appendChild(deleteBtn);
    const readBtn = document.createElement("button");
    readBtn.setAttribute("data-place", n);
    readBtn.id = "read";
    readBtn.textContent = "read";
    bookTemplate.appendChild(readBtn);
    const readStatus = document.createElement("img");
    readStatus.id = "read-status";
    readStatus.setAttribute("src", "./img/checkbox.png");
    if (myLibrary[n].read == "didNot") readStatus.style.display="none";
    bookTemplate.appendChild(readStatus);
    const para = document.createElement("p");
    bookInfo.appendChild(para);

    para.textContent = `${e.title} by ${e.author}, ${e.pages} pages`;

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
        e.target.nextSibling.style.display = "block";
      }     
      
      if (storageAvailable('localStorage')) {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
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

cancelBtn.addEventListener("click", () => {
  resetFormValue();
});

function remove(place) { 
    delete myLibrary[place];

    if (storageAvailable('localStorage')) {
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    }
  
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

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}