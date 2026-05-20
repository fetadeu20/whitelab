let carrinho = [];

/* =========================
   NOTIFICAÇÃO
========================= */

function mostrarNotificacao(texto) {

    const notificacao = document.createElement("div");

    notificacao.classList.add("notificacao");

    notificacao.innerText = texto;

    document.body.appendChild(notificacao);

    setTimeout(() => {

        notificacao.classList.add("mostrar");

    }, 100);

    setTimeout(() => {

        notificacao.classList.remove("mostrar");

        setTimeout(() => {

            notificacao.remove();

        }, 500);

    }, 2500);
}

/* =========================
   COMPRAR PRODUTO
========================= */

function comprar(produto) {

    carrinho.push(produto);

    atualizarCarrinho();

    mostrarNotificacao(produto + " adicionado ao carrinho 🛒");
}

/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

    console.clear();

    console.log("🛒 CARRINHO");
    console.log("----------------");

    carrinho.forEach((item, index) => {

        console.log((index + 1) + " - " + item);

    });

    console.log("----------------");
    console.log("Total: " + carrinho.length);
}

/* =========================
   LIMPAR CARRINHO
========================= */

function limparCarrinho() {

    if (carrinho.length === 0) {

        mostrarNotificacao("Carrinho já está vazio!");

        return;
    }

    carrinho = [];

    mostrarNotificacao("Carrinho limpo 🗑");
}

/* =========================
   FINALIZAR COMPRA
========================= */

function finalizarCompra() {

    if (carrinho.length === 0) {

        mostrarNotificacao("Seu carrinho está vazio!");

        return;
    }

    mostrarNotificacao("Compra finalizada com sucesso ✅");

    carrinho = [];
}

/* =========================
   PESQUISAR PRODUTO
========================= */

function pesquisarProduto() {

    let pesquisa = prompt("Digite o nome do produto:");

    if (pesquisa === null || pesquisa === "") {
        return;
    }

    let produtos = document.querySelectorAll(".produto");

    let encontrou = false;

    produtos.forEach((produto) => {

        let nome = produto.querySelector("h3").innerText;

        if (nome.toLowerCase().includes(pesquisa.toLowerCase())) {

            produto.style.display = "block";

            encontrou = true;

        } else {

            produto.style.display = "none";
        }

    });

    if (encontrou) {

        mostrarNotificacao("Produto encontrado 🔍");

    } else {

        mostrarNotificacao("Nenhum produto encontrado ❌");
    }

}

/* =========================
   MOSTRAR TODOS
========================= */

function mostrarTodos() {

    let produtos = document.querySelectorAll(".produto");

    produtos.forEach((produto) => {

        produto.style.display = "block";

    });

    mostrarNotificacao("Todos os produtos exibidos 📦");
}

/* =========================
   FAVORITAR
========================= */

function favoritar(botao) {

    if (botao.innerHTML == "🤍") {

        botao.innerHTML = "❤️";

        mostrarNotificacao("Produto favoritado ❤️");

    } else {

        botao.innerHTML = "🤍";

        mostrarNotificacao("Produto removido dos favoritos");
    }
}

/* =========================
   LOADING
========================= */

window.onload = function() {

    mostrarNotificacao("White Lab carregado 🔥");
}