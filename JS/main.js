
//conectamos div para crear la card
const contPoke = document.querySelector('.pokemonContainer')

//funcion para consumir la api
function takePokemon(numero){
    fetch( `https://pokeapi.co/api/v2/pokemon/`+ numero)
    .then((response) => response.json())
    .then((pokemon) => {
        contPoke.innerHTML = `
        <div class="pokemon-block"> 
          <h1 class="name">#${pokemon.id.toString().padStart(4, 0)} - ${pokemon.name.toUpperCase()}</h1>
          <img src="${pokemon.sprites.front_default}" />
          <p>Weight: ${pokemon.weight} Lbs |
          Height: ${pokemon.height}"<br>
          HP: ${pokemon.stats[0].base_stat} | 
          Type: ${pokemon.types.map(el=>el.type.name)} | <br>
          Abilities: ${pokemon.abilities.map(el=>el.ability.name)}
          </p>
        </div>
       `;
       console.log(pokemon)
    });
}


function takePokemons(number){
    for( let i=1; i<=number; i++){
        takePokemon(i);
    }
}

//buscamos por formulario el pokemon acorde a su numero
const inputPoke = document.querySelector("#inputPoke");
const formPoke = document.querySelector("#formPoke");

formPoke.addEventListener("submit", (event) =>{
    event.preventDefault();
    takePokemon(inputPoke.value)
    
});

//boton seleccion random
const btnSurprice = document.querySelector("#random");
btnSurprice.addEventListener("click",(event) => {
    event.preventDefault();
    let max = 1010;
    let min = 1;
    let random = Math.floor((Math.random() * (max - min + 1)) + min);
    console.log(random);
    takePokemon(random)
}
   
  )