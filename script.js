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