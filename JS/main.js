
//conectamos div para crear la card
const contPoke = document.querySelector('.pokemonContainer')

//funcion para crear la card
function takePokemon(numero){
    fetch( `https://pokeapi.co/api/v2/pokemon/`+ numero)
    .then((response) => response.json())
    .then((pokemon) => {
        contPoke.innerHTML = `
        <div class="pokemon-block">

                 <h1 class="name">#${pokemon.id.toString().padStart(4, 0)} - ${pokemon.name.toUpperCase()}</h1>
                 <img src="${pokemon.sprites.front_default}"/>

            <div class="pokemon-skills">
                    <p class="skills"> Weight: ${pokemon.weight}Lbs </p>
                    <p class="skills"> Height: ${pokemon.height}"
                    <p class="skills"> HP: ${pokemon.stats[0].base_stat}</p>
                    <p class="skills"> Type: ${pokemon.types.map(el=>el.type.name)}</p>
                    <p class="skills"> Ability: ${pokemon.abilities[0].ability.name}</p>
            </div>

        </div>
       `;

    });
}



// function takePokemons(number){
//     for( let i=1; i<=number; i++){
//         takePokemon(i);
//     }
// }



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
    takePokemon(random)
    })

//funcion para traer pokemones random por tipo
    function getRandomTypePokemon(type) {
        let max = 1010;
        let min = 1;
        let random = Math.floor((Math.random() * (max - min + 1)) + min);
      
            return fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
            .then((response) => response.json())
            .then((pokemon) => {
                if (pokemon.types.some(el => el.type.name === type)) {
                return takePokemon(random);
                } else {
                return getRandomTypePokemon(type);
                }
          });
      }

 // Función para manejar el evento click en los botones
      function handleButtonClick(event) {
        event.preventDefault();
        const type = event.target.id;
        getRandomTypePokemon(type);
      }

      const buttons = document.querySelectorAll(".id-btn");
      buttons.forEach(button => button.addEventListener("click", handleButtonClick));



