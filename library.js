let myLibrary = [];
myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

if (myLibrary.length == 0) {
    addBookToLibrary('The Fellowship Of The Ring', 'J.R.R. Tolkien', 480, 'already');
    addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', 350, 'already');
    addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', 432, 'already');
};

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

displayLibrary();

function displayLibrary() {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    for (i = 0; i < myLibrary.length; i++) {
        let card = document.createElement('p');
        str = '"' + myLibrary[i].title + '" by ' + myLibrary[i].author + ', ' + myLibrary[i].pages + ' pages, ' + myLibrary[i].read + ' read.';
        function convertObj(object) {
            return str;
        };
        let cardText = document.createTextNode(convertObj(myLibrary[i]));
        card.appendChild(cardText);

        let rmvBtn = document.createElement('button');
        rmvBtn.innerHTML = 'Remove';
        rmvBtn.setAttribute('class', 'rmvBtn');
        card.appendChild(rmvBtn);

        let toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = 'Toggle Read'
        toggleBtn.setAttribute('class', 'toggleBtn');
        card.appendChild(toggleBtn);
        document.getElementById('booklist').appendChild(card);
    }
    addRmvBtns();
    addToggleBtns();
};

function addRmvBtns() {
    let rmvBtns = document.querySelectorAll('.rmvBtn');
    for(let i = 0; i < rmvBtns.length; i++) {
        rmvBtns[i].addEventListener('click', () => {
            myLibrary.splice(i, 1);
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            while (booklist.firstChild) {
                booklist.removeChild(booklist.firstChild);
            }
            displayLibrary();
        });
    };
};

function addToggleBtns() {
    let toggleBtns = document.querySelectorAll('.toggleBtn');
    for(let i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].addEventListener('click', () => {
            if (myLibrary[i].read == 'already') {
                myLibrary[i].read = 'not yet';
            } else {
                myLibrary[i].read = 'already';
            }
            
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            while (booklist.firstChild) {
                booklist.removeChild(booklist.firstChild);
            }
            displayLibrary();
        });
    };
};

document.querySelector('#addBookBtn').addEventListener('click', () => {
    document.querySelector('#addBookBtn').style.display = 'none';
    let form = document.createElement('form');
    form.setAttribute('class', 'newBookForm');
    form.setAttribute('action', '#');
    document.querySelector('#formContainer').appendChild(form);

    let titleField = document.createElement('input');
    titleField.setAttribute('placeholder', 'Title');
    titleField.setAttribute('required', '');
    titleField.setAttribute('name', 'title')
    form.appendChild(titleField);

    form.appendChild(document.createElement('br'));

    let authorField = document.createElement('input');
    authorField.setAttribute('placeholder', 'Author');
    authorField.setAttribute('required', '');
    authorField.setAttribute('name', 'author')
    form.appendChild(authorField);
    
    form.appendChild(document.createElement('br'));

    let pagesField = document.createElement('input');
    pagesField.setAttribute('placeholder', 'Number of pages');
    pagesField.setAttribute('name', 'pages');
    form.appendChild(pagesField);

    form.appendChild(document.createElement('br'));

    let readForm = document.createElement('form');

    let readBtn = document.createElement('input');
    let readLbl = document.createElement('label');
    readBtn.setAttribute('type', 'radio');
    readBtn.setAttribute('id', 'read');
    readBtn.setAttribute('name', 'read');
    readBtn.setAttribute('value', 'already');
    readBtn.setAttribute('required', '');
    readLbl.setAttribute('for', 'read');
    readLbl.innerHTML = 'Already read';

    let notReadBtn = document.createElement('input');
    let notReadLbl = document.createElement('label')
    notReadBtn.setAttribute('type', 'radio');
    notReadBtn.setAttribute('id', 'not_read');
    notReadBtn.setAttribute('name', 'read');
    notReadBtn.setAttribute('value', 'not yet');
    notReadBtn.setAttribute('required', '');
    notReadBtn.setAttribute('checked', 'checked')
    notReadLbl.setAttribute('for', 'not read');
    notReadLbl.innerHTML = 'Not yet read';

    readForm.appendChild(readBtn);
    readForm.appendChild(readLbl);
    readForm.appendChild(document.createElement('br'));
    readForm.appendChild(notReadBtn);
    readForm.appendChild(notReadLbl);
    form.appendChild(readForm);

    let addBtn = document.createElement('button');
    addBtn.setAttribute('id', 'addBtn');
    addBtn.innerHTML = 'Add';
    form.appendChild(addBtn);

    document.querySelector('#addBtn').addEventListener('click', () => {
        title = titleField.value;
        author = authorField.value;
        pages = pagesField.value;
        read = document.querySelector('input[name="read"]:checked').value;
        if (title == '' || author == '') {
            return;
        };
        addBookToLibrary(title, author, pages, read);
        while (booklist.firstChild) {
            booklist.removeChild(booklist.firstChild);
        }
        displayLibrary();
    });
});


