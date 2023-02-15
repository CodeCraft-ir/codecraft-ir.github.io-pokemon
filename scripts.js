async function init(number = 72) {
  const pokemonsJsonList = [];
  const url = `https://pokeapi.co/api/v2/pokemon/`;
  for (let i = 1; i <= number; i++) {
    const pokemon = await fetch(url + i).then((res) => res.json());
    pokemonsJsonList.push(pokemon);
  }
  const pokemonTemplate = document.querySelector(
    "#pokemonCart-template"
  ).content;
  const pokemonList = document.querySelector("#pokemons");
  function insertPokemon(element, container) {
    container.appendChild(element);
  }
  pokemonList.textContent='';

  for (const pokemon of pokemonsJsonList) {
    const elPokemon = pokemonTemplate.cloneNode(true);
    elPokemon
      .querySelector(".pokemon")
      .classList.add("bg-" + pokemon.types[0].type.name);
    elPokemon
      .querySelector(".thumbnail")
      .setAttribute("src", pokemon.sprites["front_default"]);
    elPokemon.querySelector(".title").textContent = pokemon.name;
    elPokemon.querySelector(".type").textContent = pokemon.types
      .map((types) => types.type.name)
      .join("/");
    insertPokemon(elPokemon, pokemonList);
  }
}
init();

const searchInput = document.querySelector("input.search");
const searchSelect = document.querySelector("select.search");
searchInput.addEventListener("keyup", searchPokemon);
searchSelect.addEventListener("change", searchPokemon);
function searchPokemon() {
  const nameSearch = searchInput.value;
  const typeSearch = searchSelect.value;
  const pokemonList = document.querySelectorAll("#pokemons>div");
  for (const pokemon of pokemonList) {
    const name = pokemon.querySelector(".title").textContent;
    const types = pokemon.querySelector(".type").textContent;

    if (name.search(nameSearch) < 0 || (types.search(typeSearch) < 0 && typeSearch !='all'   )   ) {
      pokemon.classList.add("hidden");
    } else {
      pokemon.classList.remove("hidden");
    }
  }
}
