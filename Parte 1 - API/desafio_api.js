const axios = require('axios');

// URL base da API
const baseURL = 'https://demoqa.com';

// --- Dados do Usuário ---
const username = `testeqa_${Math.floor(Math.random() * 100000)}`;
const password = 'Password@123!';

// Variáveis para armazenar dados entre as etapas
let userId;
let token;

/**
 * Função para tratar e exibir erros de forma simplificada.
 */
function handleApiError(error, stepMessage) {
  console.error(`O desafio falhou na etapa: ${stepMessage}`);
  if (error.response) {
    // Erro vindo da API (ex: 401, 400, 500)
    console.error(`  - Status: ${error.response.status}`);
    // Exibe a mensagem de erro da API de forma limpa
    const errorMessage = error.response.data.message || 'Sem mensagem detalhada.';
    console.error(`  - Mensagem da API: ${errorMessage}`);
  } else {
    // Erro na requisição (ex: rede)
    console.error(`  - Erro de Rede/Execução: ${error.message}`);
  }
}

/**
 * Função principal assíncrona para executar o desafio de API.
 */
async function runApiChallenge() {
  console.log(`Iniciando desafio com o usuário: ${username}`);
  console.log('--------------------------------------------------');

  try {
    // Passo 1: Criar um usuário
    console.log('Passo 1: Criando usuário...');
    const createUserResponse = await axios.post(`${baseURL}/Account/v1/User`, {
      userName: username,
      password: password,
    });
    userId = createUserResponse.data.userID;
    console.log(`Usuário criado com sucesso. UserID: ${userId}`);
    console.log('--------------------------------------------------');

    // Passo 2: Gerar um token de acesso
    console.log('Passo 2: Gerando token de acesso...');
    const generateTokenResponse = await axios.post(
      `${baseURL}/Account/v1/GenerateToken`,
      {
        userName: username,
        password: password,
      }
    );
    token = generateTokenResponse.data.token;
    console.log('Token gerado com sucesso.');
    console.log('--------------------------------------------------');

    // Passo 3: Confirmar se o usuário criado está autorizado
    console.log('Passo 3: Verificando autorização...');
    const authResponse = await axios.post(
      `${baseURL}/Account/v1/Authorized`,
      {
        userName: username,
        password: password,
      }
    );
    console.log(`Usuário está autorizado: ${authResponse.data}`);
    console.log('--------------------------------------------------');

    // Passo 4: Listar os livros disponíveis
    console.log('Passo 4: Listando livros disponíveis...');
    const listBooksResponse = await axios.get(`${baseURL}/BookStore/v1/Books`);
    const books = listBooksResponse.data.books;
    console.log(`Encontrados ${books.length} livros:`);
    
    // Itera sobre a lista de livros e imprime apenas o Título e o ISBN
    if (books && books.length > 0) {
      books.forEach((book) => {
        console.log(`  - ${book.title} (ISBN: ${book.isbn})`);
      });
      console.log('');
    } else {
      console.log(' - Livros Disponíveis: Nenhum');
    }

    

    // Passo 5: Alugar dois livros de livre escolha
    const bookToRent1 = books[0].isbn;
    const bookToRent2 = books[1].isbn;
    // Escolher os dois primeiros livros da lista
    console.log(`Livros escolhidos para alugar:`);
    console.log(` - ${books[0].title} (ISBN: ${books[0].isbn})`);
    console.log(` - ${books[1].title} (ISBN: ${books[1].isbn})`);
    console.log('--------------------------------------------------');
    console.log('Passo 5: Adicionando livros à conta do usuário...');

    const addBooksResponse = await axios.post(
      `${baseURL}/BookStore/v1/Books`,
      {
        userId: userId,
        collectionOfIsbns: [{ isbn: bookToRent1 }, { isbn: bookToRent2 }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Livros adicionados com sucesso.');
    console.log('--------------------------------------------------');

    // Passo 6: Listar os detalhes do usuário com os livros escolhidos
    console.log('Passo 6: Listando detalhes do usuário...');
    const userDetailsResponse = await axios.get(
      `${baseURL}/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Detalhes do usuário recuperados com sucesso:');

    // --- Início da Visualização Simplificada ---
    const userData = userDetailsResponse.data;
    console.log(` - UserID: ${userData.userId}`);
    console.log(` - Username: ${userData.username}`);

    if (userData.books && userData.books.length > 0) {
      console.log(' - Livros Alugados:');
      // Itera sobre a lista de livros e imprime apenas o ISBN e o Título
      userData.books.forEach((book) => {
        console.log(`   * ${book.title} (ISBN: ${book.isbn})`);
      });
    } else {
      console.log(' - Livros Alugados: Nenhum');
    }
    // --- Fim da Visualização Simplificada ---

    console.log('--------------------------------------------------');
    console.log('Fim do Desafio API (Parte 1)');

  } catch (error) {
    // Trata qualquer erro que ocorra durante a execução
    handleApiError(error, 'Execução Principal');

  } finally {
    // --- Etapa Bônus (Limpeza) ---
    // Deleta o usuário de teste, se ele foi criado
    if (userId && token) {
      console.log('--------------------------------------------------');
      console.log('Etapa de Limpeza: Deletando usuário criado...');
      try {
        await axios.delete(`${baseURL}/Account/v1/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`Usuário ${username} (ID: ${userId}) deletado com sucesso.`);
      } catch (cleanupError) {
        handleApiError(cleanupError, 'Limpeza de Usuário');
      }
    }
  }
}

// Inicia a execução do desafio
runApiChallenge();