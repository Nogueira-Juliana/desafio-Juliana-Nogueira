class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            { codigo: 'cafe', descricao: 'Café', preco: 3 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', preco: 1.5 },
            { codigo: 'suco', descricao: 'Suco Natural', preco: 6.2 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', preco: 6.5 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', preco: 2 },
            { codigo: 'salgado', descricao: 'Salgado', preco: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', preco: 9.5 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', preco: 7.5 }
        ];
    }
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.validarFormaPagamento(metodoDePagamento)) return "Forma de pagamento inválida!";

        if (itens.length === 0) return "Não há itens no carrinho de compra!";

        let total = 0;
        let itemEncontrado = 0;
        let itensPedido = [];

        itens.map((item) => {
            const [nome, quantidade] = item.split(",");
            const parsedQuantidade = parseInt(quantidade);

            itensPedido.push(nome);

            this.cardapio.map((produto) => {
                if (produto.codigo === nome) {
                    total += produto.preco * parsedQuantidade;
                    itemEncontrado++;
                }
            });
        })

        if (itensPedido.indexOf('chantily') != -1) {
            if (itensPedido.indexOf('cafe') == -1) return "Item extra não pode ser pedido sem o principal";
        } else if (itensPedido.indexOf('queijo') != -1) {
            if (itensPedido.indexOf('sanduiche') == -1) return "Item extra não pode ser pedido sem o principal";
        }

        if (itemEncontrado === 0) return "Item inválido!";

        if (total === 0) return "Quantidade inválida!";

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    validarFormaPagamento(metodoDePagamento) {
        const formasValidas = ['dinheiro', 'debito', 'credito'];
        return formasValidas.includes(metodoDePagamento);
    }
}

export { CaixaDaLanchonete };
