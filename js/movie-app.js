const movies = [
    {
        id: 1000,
        title: 'The Godfather',
        genre: 'drama',
        date: 1972,
        score: 5,
        image: 'https://play-lh.googleusercontent.com/ZucjGxDqQ-cHIN-8YA1HgZx7dFhXkfnz73SrdRPmOOHEax08sngqZMR_jMKq0sZuv5P7-T2Z2aHJ1uGQiys',

    },
    {
        id: 1001,
        title: 'God of War',
        genre: 'drama',
        date: 1994,
        score: 2,
        image: 'https://i5.walmartimages.com/asr/5003a7b8-81c5-4803-beee-df5417f06bbe.1f75ffb05ff4e640f976691214312d6a.jpeg'
    },
    {
        id: 1002,
        title: 'the Dark Knight',
        genre: 'accion',
        date: 2008,
        score: 4,
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg'
    },
    {
        id: 1003,
        title: 'The Gladiator',
        genre: 'accion',
        date: 2000,
        score: 4,
        image: 'https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg'
    },
    // {
    //     id: 1004,
    //     title: 'Inception',
    //     genre: 'accion',
    //     date: 2010,
    //     score: 5,
    //     image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'
    // },
    // {
    //     id: 1005,
    //     title: 'django Unchained',
    //     genre: 'western',
    //     date: 2012,
    //     score: 3,
    //     image: 'https://pics.filmaffinity.com/Django_desencadenado-956246347-large.jpg'
    // },
    // {
    //     id: 1006,
    //     title: 'World War Z',
    //     genre: 'terror',
    //     date: 2013,
    //     score: 2,
    //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbdyQYt18ILy67f55TBL9KiPk_42jViTY-3ZE9_RwhVA3vQ8hE0lCzHxNKTP3NWLm1l0&usqp=CAU'
    // }

];

let idEditando = null;


const inputDateNumber = document.getElementById("date");
inputDateNumber.setAttribute("max", new Date().getFullYear());


// Obtener el formulario de carga de películas desde el DOM
const moviesForm = document.getElementById("moviesForm");

const ascTableNameBtn = document.querySelector(".fa-sort-up")
const descTableNameBtn = document.querySelector(".fa-sort-down") //DOM

ascTableNameBtn.addEventListener("click", function() {
    console.log("Ascendente")
    ordenarPeliculas("asc", "title")
})

descTableNameBtn.addEventListener("click", function() {
    console.log("Descendente")
    ordenarPeliculas("desc", "title")
})

// const orderBtns = document.querySelectorAll("[data-order]")

// // 
// orderBtns.forEach(btn => {
//     btn.addEventListener("click", function(evt) {
        
//         const ordenamiento = evt.target.dataset.order;
//         const propiedad = evt.target.dataset.propiedad;

//         ordenarPeliculas(ordenamiento, propiedad)
//     })
// })


function ordenarPeliculas(ordenamiento, propiedad) {

    const sortedMovies = movies.toSorted( (a, b) => {

        if(ordenamiento === "asc") {
            return a[propiedad].localeCompare(b[propiedad])
        }

        if(ordenamiento === "desc") {
            return b[propiedad].localeCompare(a[propiedad])
        }

        
    })

    pintarPeliculas(sortedMovies)
    // condicion para el ordenamiento
        // if( a.title.toLowerCase() > b.title.toLowerCase()) {
        //     return 1;
        // }        
        // if( a.title.toLowerCase() < b.title.toLowerCase()) {
        //     return -1;
        // } 

        // return a.score > b.score ? 1 : -1;

}


pintarPeliculas(movies);




// #Submit del formulario
moviesForm.addEventListener("submit", function(evento) {
    // Evitar que el formulario se envíe
    evento.preventDefault();
    
    const el = evento.target.elements;
    // En base a los datos ingresados por el usuario, crear un objeto de película

    const pelicula = {
        // id: idEditando ? idEditando : Date.now(), 
        id: idEditando || Date.now(),
        title: el.title.value,
        genre: el.genre.value,
        score: el.score.value,
        date: el.date.value,  // 2021-10-10
        image: el.image.value,
    }

    console.log(pelicula)
    // const titulo = evento.target.elements.title.value;

    if(idEditando) {
        // Significa que estoy editando una película
        const index = movies.findIndex(movie => {
            if(movie.id === idEditando) {
                return true;
            }
        })

        movies[index] = pelicula;
        	
    } else {
        // Significa que estoy agregando una película
        // -Agregar la película al array de películas
        movies.push(pelicula);
    }

    moviesForm.reset();
    el.title.focus();
    if(idEditando) {
        idEditando = null;
        moviesForm.classList.remove("bg-success-subtle")
        const btn = moviesForm.querySelector("button[type='submit']")
        btn.innerText = "Cargar";
        btn.classList.remove("btn-success")
        btn.classList.add("btn-primary")
    }
    
    pintarPeliculas(movies);
})

// Crear una función que reciba un array lo recorra y pinte una <tr></tr> por cada película
// #Pintar peliculas
function pintarPeliculas(arrayPeliculas) {

    const tbody = document.querySelector("tbody");

    // Vaciar el tbody
    tbody.innerHTML = "";

    arrayPeliculas.forEach((peli) => {
    
        tbody.innerHTML +=   `<tr>
                            <td class="image-cell">
                                <img loading="lazy" src="${peli.image}" alt="${peli.title} image">
                            </td>
                            <td class="name-cell">
                                <div class="name">
                                    ${peli.title}
                                </div>
                            </td>
                            <td class="genre-cell">
                                <div class="genre">
                                    ${peli.genre}
                                </div>
                            </td>
                            <td class="score-cell">
                                <div class="score">
                                    ${peli.score}
                                </div>
                            </td>
                            <td class="date-cell">
                                <div class="date">
                                    ${peli.date}
                                </div>
                            </td>
                            <td class="actions-cell">

                                <div class="actions">

                                    <button class="btn btn-primary" onclick="editarPelicula(${peli.id})">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>

                                    <button data-bs-toggle="modal" data-bs-target="#detalle-pelicula" class="btn btn-success" onclick="mostrarDetalle(${peli.id})">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>

                                    <button class="btn btn-danger" onclick="eliminarPelicula(${peli.id})">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                    
                                </div>
                            </td>
                            </tr>`

    })

}

// #Borrar película del array
// Vamos a escuchar cuando la persona hace click en el botón eliminar
// Cuando presione el botón envier el ID de la película que queremos borrar
function eliminarPelicula(identificador) {

    // Tengo que buscar en el array la pelicula correspondiente findIndex
    // const index = movies.findIndex(pelicula => identificador === pelicula.id)
    const index = movies.findIndex(pelicula => {

        // El valor que recibí en mi fn "indentificador" sea igual a pelicula.id

        // return identificador === pelicula.id;


        if(identificador === pelicula.id) {

            return true

        } else {

            return false

        }

    })

    const isConfirm = confirm("Realmente desea eliminar la pelicula?")

    if(isConfirm) {
        // Teniendo la posicion o indice de la pelicula
        movies.splice(index, 1);
    
        pintarPeliculas(movies)
    }

}

// #Mostrar el detalle de una pelicula en particular
function mostrarDetalle(ID) {

    // const modalHTML = document.querySelector("#detalle-pelicula");
    const modalTitleHTML = document.querySelector("#detalle-title");
    const modalBodyHTML = document.querySelector("#detalle-body");

    const pelicula = movies.find(movie => {

        return movie.id === ID;

    })

    modalTitleHTML.innerText = pelicula.title;

    modalBodyHTML.innerHTML = `<div class="row">
                                 <div class="col-6">
                                    <img src="${pelicula.image}" class="w-100">
                                 </div>
                                 <div class="col-6">
                                    <span class="badge text-bg-secondary">${pelicula.genre}</span>
                                 </div>
                                </div>
                                `


}


// #Filtro de películas por nombre

// 1- Obtener el input de búsqueda desde el DOM
const searchInput = document.getElementById("search")


// 2- Escuchar el evento de input en el input de búsqueda
searchInput.addEventListener("input", function(evt) {
    // 3- Obtener el texto ingresado por el usuario
    const texto = evt.target.value.toLowerCase(); // god
    console.log(texto)
    // 4- Filtrar las películas en base al texto ingresado por el usuario
    // 4.1 Recorrer el array de peliculas 1 por 1
    const peliculasFiltradas = movies.filter((movie) => {
        
        const movieName = movie.title.toLowerCase() // the godfather
        // 4.2 Por cada película voy a checkear lo que el usuario ingresó en el input respecto al título de la película y en base a esto voy armar un nuevo array con las peliculas cuyo nombre incluya el texto ingresado por el usuario
        return movieName.includes(texto)
    })

    pintarPeliculas(peliculasFiltradas)
});


// -Filtro de películas por género

// #Editar película
function editarPelicula(id) {

    // Buscar la película en el array de películas por su id
    const pelicula = movies.find(peli => {

        // return peli.id === id
        if(peli.id === id) {
            return true
        }

    })
    // Vamos a rellenar el formulario con los datos de la película	
    idEditando = pelicula.id;


    const el = moviesForm.elements;

    el.title.value = pelicula.title;
    el.genre.value = pelicula.genre;
    el.image.value = pelicula.image;
    el.date.value =  pelicula.date;
    el.score.value = pelicula.score;

    // Vamos a cambiar el texto del botón de submit
    const btn = moviesForm.querySelector("button[type='submit']")


    btn.innerText = "Editar";


    // Cambiar clases con JS
    btn.classList.remove("btn-primary")

    btn.classList.add("btn-success");

    moviesForm.classList.add("bg-success-subtle")

    // Toggle activa o desactiva una clase
    // btn.classList.toggle("btn-warning");
    // Contains verifica si un elemento tiene una clase y devuelve un booleano
    // btn.classList.contains("btn")


    // Vamos a cambiar los estilos del formulario para que se vea diferente
    // Vamos a cambiar el evento de submit del formulario para que actualice la película en lugar de agregarla

}







// - Pintar las películas filtradas





// function calcularCuadrado(value) {

//     console.log(Math.pow(value,2))

// }

// const numero = 5;

// calcularCuadrado(numero);

// const numerito = 20;

// calcularCuadrado(numerito);

// calcularCuadrado(100)






// pelicula = {
//     title: 'The Godfather',
//     genre: 'Drama',
//     year: 1972,
//     score: 5,
//     url: 'https://www.imdb.com/title/tt0068646/'
// }
