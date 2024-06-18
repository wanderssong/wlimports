let carrinho = [];

function adicionarAoCarrinho(nome, valor) {
    carrinho.push({ nome, valor: parseFloat(valor.replace(',', '.')) });
    atualizarCarrinho();
    showToast(); // Chama a função de notificação
}

function atualizarCarrinho() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = carrinho.length;

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.valor;
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - R$ ${item.valor.toFixed(2).replace('.', ',')} <button onclick="removerDoCarrinho(${index})">Remover</button>`;
        cartItems.appendChild(li);
    });

    const totalValue = document.getElementById('total-value');
    total += 10; // Adiciona taxa de entrega de R$ 10,00
    totalValue.innerText = total.toFixed(2).replace('.', ',');
}

function mostrarCarrinho() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
}

function fecharCarrinho() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

function toggleTroco() {
    const pagamentoForma = document.getElementById('pagamento-forma').value;
    const trocoContainer = document.getElementById('troco-container');
    if (pagamentoForma === 'Dinheiro') {
        trocoContainer.style.display = 'block';
    } else {
        trocoContainer.style.display = 'none';
    }
}

function enviarPedido() {
    const numeroTelefone = '5566996967406'; // Substitua pelo número de telefone da loja com código do país e DDD
    const nomeCliente = document.getElementById('cliente-nome').value;
    const enderecoCliente = document.getElementById('cliente-endereco').value;
    const formaPagamento = document.getElementById('pagamento-forma').value;
    let mensagem = `Olá, meu nome é ${nomeCliente} e gostaria de fazer um pedido:\n`;
    
    carrinho.forEach(item => {
        mensagem += `Produto: ${item.nome}, Valor: R$ ${item.valor.toFixed(2).replace('.', ',')}\n`;
    });

    mensagem += `\nTaxa de entrega: R$ 10,00`;
    let total = carrinho.reduce((acc, item) => acc + item.valor, 10); // Soma total dos produtos mais taxa de entrega
    mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    mensagem += `\nEndereço para entrega: ${enderecoCliente}`;
    mensagem += `\nForma de Pagamento: ${formaPagamento}`;

    if (formaPagamento === 'Dinheiro') {
        const troco = document.getElementById('troco').value;
        if (troco) {
            mensagem += `\nPrecisa de troco para: R$ ${troco}`;
        }
    }

    const url = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function abrirProdutoModal(nome, preco, imagem, descricao) {
    document.getElementById('modal-product-name').innerText = nome;
    document.getElementById('modal-product-price').innerText = "Preço: R$ " + preco;
    document.getElementById('modal-product-image').src = imagem;
    document.getElementById('modal-product-description').innerText = descricao;

    document.getElementById('product-modal').style.display = "block";
}

function fecharProdutoModal() {
    document.getElementById('product-modal').style.display = "none";
}

function filtrarProdutos() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

// Função para mostrar o toast
function showToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}