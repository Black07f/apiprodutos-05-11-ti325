require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs')
// path = caminho
const path = require ('path');

//1. Define o caminho do arquivo produto
const arquivosProdutos = path.join(__dirname, 'database', 'produtos.json');


app.post('/produtos', (req, res) =>{
    const {codigo, nome, qtde, preco} = req.body;
    

    //2. Transformar e calcular os dados
    const novoProduto ={
        codigo,
        nome: String(nome).toLocaleUpperCase(),
        quantidade: Number(qtde),
        preco: Number(preco),
        total: Number(qtde) * Number(preco)
    }
    //3. Çer o arquivo produtos.json
const conteudoTexto = fs.readFileSync(arquivosProdutos, 'utf-8');
console.log(conteudoTexto);
const ListaProdutos = JSON.parse(conteudoTexto); // converte texto em array JS


//4.Adicionar o novo produto na lista
ListaProdutos.push(novoProduto);

//5.Salvar
fs.writeFileSync(arquivosProdutos, JSON.stringify(ListaProdutos, null, 2))

    return res.json({
        mensagem:"produto recebido com sucesso!",
        dadosOriginais: {codigo, nome, qtde, preco}
    })
})





const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`servidor rodando na porta ${PORT}`)

})
// app.listen(port, function nome(){
//})