const OMDB_API_KEY = 'f55f96f2';
const listaFilmesContainer = document.querySelector(`.lista-filmes`);
const searchInput = document.querySelector(`.search-imput`);

// --- A. Função para Criar o HTML do Card ---
/** 
 * 
* @param {Object} filme */

function criarCarFilme(filme) {
    const card = document.createElement(`div`);
    card.classList.add(`card-filme`);
    card.dataset.imbId = filme.imbId;


    const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}` : `⭐ N/A`;
    card.innerHTML = `
<img src="${filme.Poster !== 'N/A' ? filme.Poster : 'placeholder.jpg'}"
alt="${filme.Tutle}"
classe="poster-filme">
<span class="avaliacao">${rating}</span>
<div class="card-detalhes">
<h3 class="titulo-filme">${filme.Title} (${filme.Year})</h3>
<button class="botao-adicionar" data-title="${filme.Title}">
 +Minha Lista
 </button>
 <div>
 `;

    card.addEventListener(`click`, () => buscarEExibirDetalhes(filme.imbId));

    return card;


}

// --- B. função principal de busca ---
/**
 * buscar o filme na OMDB e atualizar o container.
 * @param {string} termo - termo
 */

async function buscarFilme(termo) {
    if (!termo) return;

    listaFilmesContainer.innerHTML = `<p style="text-aling: center; color: gray;">Carregando...</p>`;

    try {
        const Response = await fetch(`https://www.omdbapi.com/?s=${termo}&apikey=${OMDB_API_KEY}`);
        const data = await Response.json();

        listaFilmesContainer.innerHTML = '';

        if (data.Response === 'True' && data.Search) {
            data.Search.forEach(async (filmeBase) => {
                const filmeDetalhado = await buscarDetalhes(filmeBase.imbId);
                if (filmeDetalhado) {
                    listaFilmesContainer.appendChild(criarCarFilme(filmeDetalhado));
                }
            });
        } else {
            listaFilmesContainer.innerHTML = `<p style="text-aling: center;">Nenhum filme encontrado para "${termo}".</p>`;
        }
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
        listaFilmesContainer.innerHTML = '<p style="text-aling: center; color: red;">Erro na conexão com a API.</p>';
    }
}

async function buscarDetalhes(imbId) {
    try {
        const Response = await fetch(`https://www.omdbapi.com/?i=${imdbid}&plot=full&apikey=${OMDB_API_KEY}`);
        const data = await renponse.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error("Erro ao buscar detalhes:", error);

    }
}

function buscarEExibirDetalhes(imbId) {
    alert(`funcionalidade de Detalhes/Trailer para o ID: ${imbId} (ainda precisa ser implementada)`);
}

let searchTimeout;
searchInput.addEventListener('input' , (event) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        buscarFilme(event.target.value.trim());


    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    buscarFilme ('popular');
});

