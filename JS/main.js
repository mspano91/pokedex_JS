
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
                 </div>

            <div class="pokemon-skills pokemon-block">
                    <p class="skills"> Weight: ${pokemon.weight}Lbs </p>
                    <p class="skills"> Height: ${pokemon.height}"
                    <p class="skills"> HP: ${pokemon.stats[0].base_stat}</p>
                    <p class="skills"> Type: ${pokemon.types.map(el=>el.type.name)}</p>
                    <p class="skills"> Ability: ${pokemon.abilities[0].ability.name}</p>
            </div>

        </div>
       `;
       console.log(pokemon)
    });
}


//buscamos por formulario el pokemon acorde a su numero
const inputPoke = document.querySelector("#inputPoke");
const formPoke = document.querySelector("#formPoke");

// Función para verificar si el nombre del Pokémon existe
function correctWord(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        if (!response.ok) {
          // Si ocurre un error (404), se muestra el mensaje de error
          contPoke.innerHTML = `
            <div>
              <p>Error #404</p>
              <img class="error404" src="../img/tangela.png"/>
              <p>This Pokémon doesn't exist...</p>
            </div>
          `;
          throw new Error('Pokémon not found');
        }
        return response.json();
      })
      .then((pokemon) => {
        // Si se encuentra el Pokémon, se llama a la función takePokemon
        takePokemon(pokemon.id);
      })
      .catch((error) => {
        // En caso de cualquier otro error, se muestra un mensaje de error genérico
        console.error(error);
        contPoke.innerHTML = `
        <div>
          <p>Error #404</p>
          <img class="error404" src="../img/tangela.png"/>
          <p>This Pokémon doesn't exist...</p>
        </div>
      `;
      });
  }

  // Evento submit para el formulario
  formPoke.addEventListener("keyup", (event) => {
    event.preventDefault();
    const inputName = inputPoke.value.trim().toLowerCase(); // Convertir a minúsculas y eliminar espacios al principio y al final
    correctWord(inputName);
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



