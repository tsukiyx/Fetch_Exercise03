const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const infoContainer = document.getElementById("pokemon-info");

const fetchPkmn = async () => {
  try{
    const pkmnNameId = searchInput.value.toLowerCase();
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pkmnNameId}`);
    const data = await response.json();
    pkmnInfo(data)
  } catch (err){
    alert("Pokemon not found")
  }
};

const pkmnInfo = data => {
  const { name, id, weight, height, types, sprites, stats } = data;
  const pkmnType = data.types.map(type => `<span>${type.type.name}</span>`).join(" ")
  const pkmnStats = data.stats.map(stat => `<p>${stat.stat.name}: ${stat.base_stat}</p>`).join(" ")

  infoContainer.innerHTML = `
  <div>
    <h2>${name.toUpperCase()} #${id}</h2>
    <p>Weight: ${weight} Height: ${height}</p>
    <img src="${sprites.front_default}" alt="${name}">
    <div>${pkmnType}</div>
  </div>
  <div>
    <h3>Base Stats</h3>
    ${pkmnStats}
  </div>
  `
}

searchBtn.addEventListener("click", e => {
  e.preventDefault();
  fetchPkmn();
  searchInput.value = ""
});
