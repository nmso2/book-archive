const searchBook = () => {
    const searchField = document.getElementById('bookInput');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('search-result').textContent = '';
    document.getElementById('search-result-count').innerText = '';


    if (searchText === '') {
        //Error massege if nothing is typed
        document.getElementById("errorMessage1").classList.remove("d-none");
        console.log(searchText)
    }
    else {
        document.getElementById("errorMessage1").classList.add("d-none");
        document.getElementById("spinner").classList.remove("d-none");
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    }
}

//Displaying books
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    if (books.numFound === 0) {
        //Error massege if no book found
        document.getElementById('search-result-count').innerText = `No book found!`
        document.getElementById('search-result-count').classList.add("fs-3");
        document.getElementById("spinner").classList.add("d-none");
    }
    else {
        document.getElementById('search-result-count').innerText = `Displaying 20 of ${books.numFound} books...`
        document.getElementById("spinner").classList.add("d-none");
        document.getElementById('search-result-count').classList.remove("fs-3");
    }

    books.docs.slice(0, 20).forEach(element => {
        console.log(element);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="No Image">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">Author: ${element.author_name ? element.author_name : 'Not Specified'}</p>
                <p class="card-text">Publisher: ${element.publisher ? element.publisher.slice(0, 3) : 'Not Specified'}</p>
                <p class="card-text">First Published: ${element.first_publish_year ? element.first_publish_year : 'Not Specified'}</p>
            </div>               
        </div>`;
        searchResult.appendChild(div);
    });
}


