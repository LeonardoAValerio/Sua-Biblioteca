const saveBooks = books => localStorage.setItem('books', JSON.stringify(books));
const getBooks = () => JSON.parse(localStorage.getItem('books'));

/* PÁGINA PRINCIPAL */ 
const mainBookcase = (books) => {
    const randomPercent = (min = 0, max = 100) => Math.round(Math.random() * (max - min) + min) //Cri uma porcentagem aleátoria
    const createDivBook = () => { //Cria a Div que vai ser o Book
        const newBook = document.createElement('div'); //Cria a div
        newBook.setAttribute('class', 'book'); //Coloca a classe book
        newBook.style.height = `${randomPercent(85, 95)}%`; //Gera uma porcentagem aleátoria entre 90 e 100
        return newBook; 
    }

    const createTitle = () => { //Cria o elemento do título
        const title = document.createElement('p'); //Cria o P que vai conter o título
        title.setAttribute('class', 'title-book'); //Coloca a classe 'title-book'
        return title;
    }

    const createBook = objBook =>{ //Crio todo o elemento do livro (Recebe um objeto livro)
        const book = createDivBook(); //Pega o livro
        const title = createTitle(); //Pega o titlo
        title.innerText = objBook.title; //Coloca no titulo o texto do livro
        book.appendChild(title); //Coloca o titulo dentro do livor
        return book; 
    }

    const createDivShelf = () => { //Cria o elemento de uma prateleheira
        const newShelf = document.createElement('div'); //Cria a div
        newShelf.setAttribute('class', 'shelf'); //Coloca nela a classe 'shelf'
        return newShelf;
    }

    const createShelf = shelfBooks => { //Cria todo o elemento da estante (Recebe um array de livros)
        const bookcase = document.querySelector('.bookcase'); //Pega bookcase
        const shelf = createDivShelf(); //Cria o elemento shelf
        for(let book of shelfBooks){ //Faz um loop dentro do array de livro pegando o objeto de cada livro
            const newBook = createBook(book); //Cria o livro (Envia o objeto do livro)
            shelf.appendChild(newBook); //Coloca na shelf o novo livro
        };
        bookcase.appendChild(shelf); //No final coloca toda a nova prateleira na estante
    }
    const updateBookcase = books =>{ //Atualiza toda a bookcase (Recebendo um array de objetos(Livros))
        const numShelves = Math.ceil(books.length / 8); //Cálcula quantas shelves vão ter
        for(let i = 0; i <= numShelves; i++){ //Faz um loop com a quantidade de shelves
            const shelfBooks = books.slice(i * 8, (i + 1) * 8); //Pega até 8 livros do totais de livros
            createShelf(shelfBooks); //Cria uma nova estante com os livros pegados
        }
    }

    updateBookcase(books);

}

/* CRIANDO LIVRO */ 
function Book(title = '', author = '', yearPub = '', read = 0, gender = '', synopsis = '', review = '', img = ''){ //Função construtora dos livros
    this.title = title;
    this.author = author;
    this.yearPub = yearPub;
    this.read = read;
    this.gender = gender;
    this.synopsis = synopsis;
    this.review = review;
    this.img = img;
}

const creatingBook = books => {
    const form = document.querySelector('.form-create-book');
    const title = form.querySelector('input[name="title"]');
    const author = form.querySelector('input[name="author"]');
    const yearPub = form.querySelector('input[name="year-pub"]');
    const state = form.querySelector('select[name="state"]');
    const gender = form.querySelector('select[name="gender"]');
    const synopsis = form.querySelector('textarea[name="synopsis"]');
    const review = form.querySelector('textarea[name="review"]');
    const img = form.querySelector('input[name="img"]');

    const resetInputsBook = () =>{
        form.value = '';
        title.value = '';
        author.value = '';
        yearPub.value = '';
        state.value = '';
        gender.value = '';
        synopsis.value = '';
        review.value = '';
        img.value = '';
    }    

    form.addEventListener('submit',e => {
        e.preventDefault();
        const book = new Book(title.value, author.value, yearPub.value, state.value, gender.value, synopsis.value, review.value, img.value);
        books.push(book);
        saveBooks(books);
        alert('Livro salvo com sucesso!');
        resetInputsBook();
    });
}

/* MAIN */
const main = () =>{
    const books = getBooks() || [];
    console.log(books);
    const page = document.querySelector('.title-page');
    if(page.innerText === 'Estante') mainBookcase(books);
    if(page.innerText === 'Adicionar Livro') creatingBook(books);
}
main();