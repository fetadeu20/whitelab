// ========================================
// CARRINHO
// ========================================

let carrinho = [];


// ========================================
// PRODUTOS
// ========================================

const produtos = {

    "Whey Protein": {
        preco: 129.90,
        imagem: "whey.jpeg"
    },

    "BCAA": {
        preco: 89.90,
        imagem: "bcaa.jpeg"
    },

    "Pré-Treino": {
        preco: 99.90,
        imagem: "pretreino.jpeg"
    },

    "Barrinha Proteica": {
        preco: 14.90,
        imagem: "barrinha.jpeg"
    },

    "Creatina": {
        preco: 119.90,
        imagem: "creatina.jpeg"
    },

    "Glutamina": {
        preco: 79.90,
        imagem: "glutamina.jpeg"
    }
};


// ========================================
// COMPRAR PRODUTO
// ========================================

function comprar(nome) {

    carrinho.push(nome);

    atualizarCarrinho();

    mostrarNotificacao(nome + " adicionado ao carrinho!");
}


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho");

    const contador =
        document.getElementById("contador-carrinho");

    const total =
        document.getElementById("total-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach((produto, index) => {

        valorTotal += produtos[produto].preco;

        lista.innerHTML += `

            <div class="item-carrinho">

                <div class="info-carrinho">

                    <img 
                        src="${produtos[produto].imagem}" 
                        alt="${produto}"
                        class="miniatura-carrinho"
                    >

                    <div>

                        <h4>${produto}</h4>

                        <p>
                            R$ ${produtos[produto].preco.toFixed(2)}
                        </p>

                    </div>

                </div>

                <button onclick="removerProduto(${index})">
                    X
                </button>

            </div>

        `;
    });

    contador.innerText = carrinho.length;

    total.innerText = valorTotal.toFixed(2);
}


// ========================================
// REMOVER PRODUTO
// ========================================

function removerProduto(index) {

    const nome = carrinho[index];

    carrinho.splice(index, 1);

    atualizarCarrinho();

    atualizarResumoCompra();

    mostrarNotificacao(nome + " removido!");
}


// ========================================
// LIMPAR CARRINHO
// ========================================

function limparCarrinho() {

    carrinho = [];

    atualizarCarrinho();

    atualizarResumoCompra();

    mostrarNotificacao("Carrinho limpo!");
}


// ========================================
// ABRIR CARRINHO
// ========================================

function abrirCarrinho() {

    document
        .getElementById("painel-carrinho")
        .classList.add("ativo");
}


// ========================================
// FECHAR CARRINHO
// ========================================

function fecharCarrinho() {

    document
        .getElementById("painel-carrinho")
        .classList.remove("ativo");
}


// ========================================
// FINALIZAR COMPRA
// ========================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        mostrarNotificacao("Seu carrinho está vazio!");

        return;
    }

    abrirFinalizacao();

    atualizarResumoCompra();
}


// ========================================
// ABRIR FINALIZAÇÃO
// ========================================

function abrirFinalizacao() {

    document
        .getElementById("painel-finalizacao")
        .classList.add("ativo");
}


// ========================================
// FECHAR FINALIZAÇÃO
// ========================================

function fecharFinalizacao() {

    document
        .getElementById("painel-finalizacao")
        .classList.remove("ativo");
}


// ========================================
// RESUMO DA COMPRA
// ========================================

function atualizarResumoCompra() {

    const resumo =
        document.getElementById("resumo-compra");

    const totalFinal =
        document.getElementById("valor-final");

    if (!resumo) return;

    resumo.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

        total += produtos[produto].preco;

        resumo.innerHTML += `

            <div class="item-finalizacao">

                <img 
                    src="${produtos[produto].imagem}"
                    class="miniatura-finalizacao"
                >

                <div class="texto-finalizacao">

                    <h4>${produto}</h4>

                    <p>
                        R$ ${produtos[produto].preco.toFixed(2)}
                    </p>

                </div>

                <button onclick="removerFinalizacao(${index})">
                    X
                </button>

            </div>

        `;
    });

    totalFinal.innerText = total.toFixed(2);
}


// ========================================
// REMOVER FINALIZAÇÃO
// ========================================

function removerFinalizacao(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

    atualizarResumoCompra();

    mostrarNotificacao("Produto removido!");
}


// ========================================
// CONFIRMAR PEDIDO
// ========================================

function confirmarPedido() {

    if (carrinho.length === 0) {

        mostrarNotificacao("Seu carrinho está vazio!");

        return;
    }

    let total = 0;

    carrinho.forEach(produto => {

        total += produtos[produto].preco;
    });

    mostrarNotificacao(
        "Pedido confirmado! Total: R$ " +
        total.toFixed(2)
    );

    carrinho = [];

    atualizarCarrinho();

    atualizarResumoCompra();

    fecharFinalizacao();

    fecharCarrinho();
}


// ========================================
// NOTIFICAÇÃO
// ========================================

function mostrarNotificacao(texto) {

    const notificacao =
        document.getElementById("notificacao");

    notificacao.innerText = texto;

    notificacao.classList.add("mostrar");

    setTimeout(() => {

        notificacao.classList.remove("mostrar");

    }, 3000);
}


// ========================================
// PESQUISA
// ========================================

function filtrarEBuscar() {

    const pesquisa =
        document
        .getElementById("input-busca")
        .value
        .toLowerCase();

    const produtosHTML =
        document.querySelectorAll(".produto");

    produtosHTML.forEach(produto => {

        const nome =
            produto.querySelector("h3")
            .innerText
            .toLowerCase();

        if (nome.includes(pesquisa)) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";
        }
    });
}


// ========================================
// FILTRO DE CATEGORIAS
// ========================================

function alternarAba(botao) {

    const categoria =
        botao.dataset.categoria;

    const botoes =
        document.querySelectorAll(".aba-btn");

    botoes.forEach(btn => {

        btn.classList.remove("ativa");
    });

    botao.classList.add("ativa");

    const produtosHTML =
        document.querySelectorAll(".produto");

    produtosHTML.forEach(produto => {

        if (categoria === "todos") {

            produto.style.display = "block";
        } else if (
            produto.classList.contains(
                "categoria-" + categoria
            )
        ) {

            produto.style.display = "block";
        } else {

            produto.style.display = "none";
        }
    });
}


// ========================================
// MENU RESPONSIVO
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const links =
        document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener("click", function(e) {

            const href =
                this.getAttribute("href");

            if (href === "#") {

                e.preventDefault();

                window.scrollTo({

                    top: 0,
                    behavior: "smooth"
                });
            } else if (href.startsWith("#")) {

                e.preventDefault();

                const destino =
                    document.querySelector(href);

                if (destino) {

                    destino.scrollIntoView({

                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ========================================
    // LOGO COM MESMA COR DO SITE
    // ========================================

    const logoTexto =
        document.querySelector(".logo-area h1");

    if (logoTexto) {

        logoTexto.style.color = "#111111";
    }

    const spanLogo =
        document.querySelector(".logo-area span");

    if (spanLogo) {

        spanLogo.style.color = "#ff3333";
    }

});


// ========================================
// BOTÃO IR PARA PRODUTOS
// ========================================

function irProdutos() {

    document
        .getElementById("produtos")
        .scrollIntoView({

            behavior: "smooth"
        });
}


// ========================================
// MOSTRAR TODOS
// ========================================

function mostrarTodos() {

    const produtosHTML =
        document.querySelectorAll(".produto");

    produtosHTML.forEach(produto => {

        produto.style.display = "block";
    });

    document.getElementById("input-busca").value = "";
}


// ========================================
// ABRIR FECHAR MENU MOBILE
// ========================================

function abrirMenu() {

    document
        .querySelector("nav")
        .classList.toggle("menu-ativo");
}


// ========================================
// INICIAR
// ========================================

atualizarCarrinho();

atualizarResumoCompra();