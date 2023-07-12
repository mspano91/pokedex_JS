
//dom
const contPoke = document.querySelector('.pokemonContainer')

//funcion para consumir la api
function takePokemon(numero){
    fetch( `https://pokeapi.co/api/v2/pokemon/${numero}/`)
    .then((response) => response.json())
    .then((pokemon) => {
        console.log(pokemon)
        CreatePokemon(pokemon)
    });
}


function takePokemons(number){
    for( let i=1; i<=number; i++){
        takePokemon(i);
    }
}



//creamos la card pokemon

function CreatePokemon(pokemon){

    const card = document.createElement("div");
    card.classList.add("pokemon-block")

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.classList.add("number");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    contPoke.appendChild(card);

}
//  fetchPokemon(151)
//  fetchPokemons(1)

const inputPoke = document.querySelector("#inputPoke");
const formPoke = document.querySelector("#formPoke");

//buscamos por formulario el pokemon acorde a su numero
formPoke.addEventListener("submit", (event) =>{
    event.preventDefault();
    takePokemon(inputPoke.value)
});