const searchBook = () => {
    const searchField = document.getElementById('bookInput');
    const searchText = searchField.value;
    searchField.value = '';

    if (searchText === '') {
        // please write something to display
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
    }
}

const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    console.log(books.length)
    books.forEach(element => {
        console.log(element);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="No Image">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">Author: ${element.author_name ? element.author_name : 'Not Specified'}</p>
                <p class="card-text">Publisher: ${element.publisher ? element.publisher : 'Not Specified'}</p>
                <p class="card-text">First Published: ${element.first_publish_year ? element.first_publish_year : 'Not Specified'}</p>
            </div>               
        </div>`;
        searchResult.appendChild(div);
    });
}


