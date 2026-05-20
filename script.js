// ==========================================================================
// 1. SINALIZADOR DA CATEGORIA ATUAL
// ==========================================================================
let categoriaAtual = 'todos';

// ==========================================================================
// 2. CONTROLE DAS ABAS
// ==========================================================================
function alternarAba(elementoBotao) {
    // Remove a classe "ativa" de todos os botões e adiciona no que foi clicado
    document.querySelectorAll('.aba-btn').forEach(btn => btn.classList.remove('ativa'));
    elementoBotao.classList.add('ativa');
    
    // Atualiza a categoria global e roda o filtro combinado
    categoriaAtual = elementoBotao.getAttribute('data-categoria');
    filtrarEBuscar();
}

// ==========================================================================
// 3. SISTEMA COMBINADO (BUSCA + FILTRO DE ABAS)
// ==========================================================================
function filtrarEBuscar() {
    const termoBusca = document.getElementById('input-busca').value.toLowerCase().trim();
    const produtos = document.querySelectorAll('.produto');

    produtos.forEach(produto => {
        const nomeProduto = produto.querySelector('h3').textContent.toLowerCase();
        const descProduto = produto.querySelector('p').textContent.toLowerCase();
        
        // Verifica se o produto pertence à aba que está selecionada
        const pertenceAba = (categoriaAtual === 'todos' || produto.classList.contains(`categoria-${categoriaAtual}`));
        
        // Verifica se o termo digitado está no título ou na descrição do produto
        const correspondeBusca = nomeProduto.includes(termoBusca) || descProduto.includes(termoBusca);

        // O produto só fica visível se atender aos dois critérios ao mesmo tempo
        if (pertenceAba && correspondeBusca) {
            produto.classList.remove('escondido');
        } else {
            produto.classList.add('escondido');
        }
    });
}

// ==========================================================================
// 4. SEU SISTEMA DE NOTIFICAÇÃO DE COMPRA (TOAST)
// ==========================================================================
function comprar(nomeProduto) {
    // Cria uma notificação toast moderna na tela
    const toast = document.createElement('div');

    // Estilização direta via JS para manter o componente isolado
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#111111',
        color: '#ffffff',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        zIndex: '9999',
        fontWeight: '600',
        fontSize: '14px',
        borderLeft: '4px solid #ff3333',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    });

    toast.innerHTML = `🛒 <strong>${nomeProduto}</strong> adicionado ao carrinho!`;
    document.body.appendChild(toast);

    // Animação de entrada
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);

    // Animação de saída e remoção automática após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
