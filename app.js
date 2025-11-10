const OMDB_API_KEY = 'COLOQUE UA CHAVE';
cons listaFilmesContainer = document.querySelector(`.lista-filmes`);
const searchInput = document.querySelector (`.search-imput`);

// --- A. Função para Criar o HTML do Card ---
/** 
 * 
* @param {Object} filme */

function criarCarFilme(filme) {
    const card = document.createElement(`div`);
    card.classList.add(`card-filme`);
    card.dataset.imbId = filme.imbId;


const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}` : `⭐ N/A`;

}