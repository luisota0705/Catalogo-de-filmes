const OMDB_API_KEY = 'f55f96f2';
const listaFilmesContainer = document.querySelector('.lista-filmes');
const searchInput = document.querySelector('.search-input'); // corrigido: era "imput"

// --- A. Função para Criar o HTML do Card ---
/**
 * Cria o card de um filme
 * @param {Object} filme
 */
function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add('card-filme');
    card.dataset.imdbId = filme.imdbID; // corrigido: era "imbId"

    const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}` : `⭐ N/A`;
    card.innerHTML = `
        <img 
            src="${filme.Poster !== 'N/A' ? filme.Poster : 'placeholder.jpg'}"
            alt="${filme.Title}"
            class="poster-filme"
        >
        <span class="avaliacao">${rating}</span>
        <div class="card-detalhes">
            <h3 class="titulo-filme">${filme.Title} (${filme.Year})</h3>
            <button class="botao-adicionar" data-title="${filme.Title}">
                + Minha Lista
            </button>
        </div>
    `;

    // Clicar no card mostra detalhes (ainda não implementado)
    card.addEventListener('click', () => buscarEExibirDetalhes(filme.imdbID));

    return card;
}

// --- B. Função principal de busca ---
/**
 * Busca filmes na OMDb e atualiza o container
 * @param {string} termo - termo de busca
 */
async function buscarFilme(termo) {
    if (!termo) return;

    listaFilmesContainer.innerHTML = `<p style="text-align: center; color: gray;">Carregando...</p>`;

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(termo)}&apikey=${OMDB_API_KEY}`);
        const data = await response.json();

        listaFilmesContainer.innerHTML = '';

        if (data.Response === 'True' && data.Search) {
            // Busca detalhes de cada filme
            for (const filmeBase of data.Search) {
                const filmeDetalhado = await buscarDetalhes(filmeBase.imdbID);
                if (filmeDetalhado) {
                    listaFilmesContainer.appendChild(criarCardFilme(filmeDetalhado));
                }
            }
        } else {
            listaFilmesContainer.innerHTML = `<p style="text-align: center;">Nenhum filme encontrado para "${termo}".</p>`;
        }
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
        listaFilmesContainer.innerHTML = '<p style="text-align: center; color: red;">Erro na conexão com a API.</p>';
    }
}

// --- Função para buscar detalhes de um filme ---
async function buscarDetalhes(imdbId) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${OMDB_API_KEY}`);
        const data = await response.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        return null;
    }
}

// --- Placeholder para detalhes/trailer ---
function buscarEExibirDetalhes(imdbId) {
    alert(`Funcionalidade de Detalhes/Trailer para o ID: ${imdbId} (ainda precisa ser implementada)`);
}

// --- Evento de busca automática com debounce ---
let searchTimeout;
searchInput.addEventListener('input', (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        buscarFilme(event.target.value.trim());
    }, 500);
});

// --- Busca inicial ---
document.addEventListener('DOMContentLoaded', () => {
    buscarFilme('popular');
});
ok