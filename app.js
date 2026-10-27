//Este arquivo roda no Navegador (Cliente)
//Ele não fala com o NEON: Chama as rotas /api do nosso server.js


const lista = document.getElementById('lista-categorias')
const formulario = document.getElementById('form-categoria')
const campoDescricao = document.getElementById('descricao')
const mensagem = document.getElementById('mensagem')

let categorias = []
let idEmedicao = null

async function  renderizarLista() {
   lista.innerHTML='<li class="lista-vazia"> Careggando....</li>' 

    try {
    const resposta = await fetch('/api/categorias')
     categoria = await resposta.json()

     if(!resposta.ok) throw new Error ( renderizarLista.error)
     renderizarLista( categoria)
      }

    catch(error)
    {
      mensagem.textContent = `Erro ${error.message}`
    }
}
function renderizarLista(){
   lista.innerHTML =''
   if(categorias.length ===0)
   {
      lista.innerHTML =<li class="lista-vazia">Nenhuma categoria cadastrada!</li>
      return
   }
   for(const categoria of categorias)
   {
    lista.appendChild(
      categoria.id_categoria === idEmEdicao? criarItemEdicao(categoria)
      :criarItemVisualizacao(categoria)
    )

   }
}
function criarItemVisualizacao(categoria)
{
   const item = document.createElement('li')
   item.classname='categoria-info'
   info.innerHTML = `<span class="categoria-id">#${categoria.descricao}</span> $
   {categoria.descricao}`

   const btnEditar = document.createElement('button')
   btnEditar.textContent='Editar'
   btnEditar.className='btnm- btn-editar'
   btnEditar.addEventListener('click', ()=>{
      idEmEdicao = categoria.id_categoria
      renderizarLista()
   })

   const btnExcluir = document.createElement('button')
   btnExcluir.textContent='Excluir'
   btnExcluir.className='btnm- btn-excluir'
   btnExcluir.addEventListener('click', ()=>{
      idEmExcluir = categoria.id_categoria
   })

   const acoes = document.createElement('div')
   acoes.className='categoria-acoes'

   acoes.append(btnEditar,btnExcluir)
   item.append(info,acoes)
   return item
}


function montarLista(dados)
{
     lista.innerHTML = '<li>Carregando...</li>'
     if(dados.length === 0)
     {
        lista.innerHTML= '<li>Nenhuma categoria cadastrada...</li>'
        return
     }
     lista.innerHTML = ''
     for(const categoria of dados){
        const item =document.createElement('li')
        item.textContent = `${categoria.id_categoria}` - `${categoria.descricao}^`
        lista.appendChild(item)
     }
}


formulario.addEventListener('submit', async (evento) => {
   evento.preventDefault()

   const resposta = await fetch('api/categorias', {
      method:'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({descricao: campoDescricao.value})
   })
   const dados = await resposta.json()
   
   if (resposta.ok)
   {
      mostrarMensagem(`Categoria "${dados.descricao}" cadastrada!`)
      campoDescricao.value=''
       renderizarLista()
   }
   else{
      mostrarMensagem(`Erro: ${dados.erro}`, 'erro')
   }
})


function criarItemEdicao(categoria)
{
   const item = document.createElement('li')

   item.classList = 'categoria-item categoria-item-edicao'

   const input = document.createElement('input')

   input.type = 'text'
   input.value = categoria.descricao
   input.className ='input-edicao'

   const btnSalvar = document.createElement('button')
   btnSalvar.textContent = 'Salvar'
   btnSalvar.className = 'btn btn-salvar'
   btnSalvar.addEventListener('click',()=> salvarEdicao(categoria,input.value))

   const btnCancelar = document.createElement('button')
   btnCancelar.textContent = 'Cancelar'
   btnCancelar.className = 'btn btn-cancelar'
   btnCancelar.addEventListener('click',()=> {
   idEmEdicao =null
   renderizarLista()
   })

   const acoes = document.createElement('div')
   acoes.className = 'categoria-acoes'
   acoes.append(btnSalvar,btnCancelar)
   item.append(input,acoes)
   input.focus()
   return item

}
function mostrarMensagem(texto, tipo = 'sucesso')
{
   mensagem.textContent = texto
   mensagem.className = `mensagem mensagem-${tipo}`
}

 renderizarLista()