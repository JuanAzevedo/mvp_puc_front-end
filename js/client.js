let modal = document.querySelector('.modal');
let modalContent =  document.querySelector('.modal-content');

let configs = {
    apiUrl: "",
    quantidade: 0,
    tableDiv: null
}


function init( table ,{ apiUrl, quantidade = 10 }){
    configs.apiUrl = apiUrl;
    configs.quantidade = quantidade;

    configs.tableDiv = document.querySelector(`${table}`);
    
    renderTable();
    
}

function postRequest(){

    var dados = new URLSearchParams();
    dados.append('nome', document.querySelector('input[name="nome"]').value);
    dados.append('sobrenome', document.querySelector('input[name="sobrenome"]').value);
    dados.append('celular', document.querySelector('input[name="telefone"]').value);
    dados.append('email', document.querySelector('input[name="email"]').value);


   return fetch(configs.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Indica que estamos enviando como formulário
        },
        body: dados // Passa os dados diretamente como um objeto URLSearchParams
      }).then((response)=> {
        return response.json();
    }).catch((e)=> {

    })
}   


function putRequest(id){

    var dados = new URLSearchParams();
    dados.append('nome', document.querySelector('input[name="nome"]').value);
    dados.append('sobrenome', document.querySelector('input[name="sobrenome"]').value);
    dados.append('celular', document.querySelector('input[name="telefone"]').value);
    dados.append('email', document.querySelector('input[name="email"]').value);


   return fetch(`${configs.apiUrl}?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Indica que estamos enviando como formulário
        },
        body: dados // Passa os dados diretamente como um objeto URLSearchParams
      }).then((response)=> {
        return response.json();
    }).catch((e)=> {

    })
}   

function getRequest(){

    return fetch(configs.apiUrl).then((response)=> {
        return response.json();
    }).catch((e)=> {

    })

}

function deleteResquest(id) {
    return fetch(`${configs.apiUrl}?id=${id}`, { method: 'DELETE' }).then((response) => {
        return response.json();
    }).catch((e) => {

    })

}

async function createItem(){

    let response = await postRequest();
    
    resultModal(response.message);

}

async function alterarItem(id){

    let response = await putRequest(id);
    
    resultModal(response.message);

}


async function deleteItem(id){
    console.log(id)
    let response = await deleteResquest(id);
    resultModal(response.message);
}

async function renderTable(){
    
    configs.tableDiv.innerHTML = "";

    let data = await getRequest();
    console.log(data)
    data.forEach((data, index)=> {

        configs.tableDiv.innerHTML += `
            <tr>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-500">${index + 1}
                </div>
            </td>
            <td class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900" id="nomeColuna">${data.nome}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-500" id="sobrenomeColuna">${data.sobrenome}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900" id="celularColuna">${data.celular}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900" id="emailColuna">${data.email}</div>
            </td>
            <td class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <button class="text-xs bg-green-500 text-white p-2 rounded-sm mr-2" onclick="editModal(this, ${data.id})">Alterar</button>
                <button class="text-xs bg-red-500 text-white p-2 rounded-sm mr-2" onclick="delModal(${data.id})">Deletar</button>
            </td>
        </tr>`
    })



}


function createModal(){
    modal.classList.toggle('active');
    modalContent.innerHTML = ` <div class="h-fit bg-white text-black">
    <div class="px-4 py-2 border-b-[1px] border-gray-600">Cadastrar</div>
    <div class="px-4 py-4 flex flex-col gap-4">
        <div>
            <label class="mr-4" for="">Nome</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="text" name="nome" required> 
        </div>
        <div>
            <label class="mr-4" for="">Sobrenome</label>
            <input class="bg-gray-200 outline-none  border-black border-[1px] rounded-md px-2 py-1" type="text" name="sobrenome" required>
        </div>
        <div>
            <label class="mr-4" for="">Telefone</label>
            <input class="bg-gray-200 outline-none  border-black border-[1px] rounded-md px-2 py-1" type="tel"  name="telefone" required>
        </div>
        <div>
            <label class="mr-4" for="">Email</label>
            <input class="bg-gray-200 outline-none  border-black border-[1px] rounded-md px-2 py-1" type="email" name="email" required>
        </div>
        <div class="mt-4 flex justify-between">
            <button class="text-xs bg-green-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="createItem()">Cadastrar</button>
            <button class="text-xs bg-red-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="modalClose()">Cancelar</button>
        </div>
    </div>
</div>`
}
function editModal(item, id){ 
    
    let parent = item.parentNode.parentNode

    console.log(parent);
    modal.classList.toggle('active');
    modalContent.innerHTML = ` <div class="h-fit bg-white text-black">
    <div class="px-4 py-2 border-b-[1px] border-gray-600">Alterar</div>
    <div class="px-4 py-4 flex flex-col gap-4">
        <div>
            <label class="mr-4" for="">Nome</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" value="${parent.querySelector('#nomeColuna').innerText}" name="nome" type="text">
        </div>
        <div>
            <label class="mr-4" for="">Sobrenome</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" value="${parent.querySelector('#sobrenomeColuna').innerText}" name="sobrenome" type="text">
        </div>
        <div>
            <label class="mr-4" for="">Telefone</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" value="${parent.querySelector('#celularColuna').innerText}" name="telefone" type="tel">
        </div>
        <div>
            <label class="mr-4" for="">Email</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" value="${parent.querySelector('#emailColuna').innerText}" name="email" type="email">
        </div>
        <div class="mt-4 flex justify-between">
            <button class="text-xs bg-green-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="alterarItem(${id})">Alterar</button>
            <button class="text-xs bg-red-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="modalClose()">Cancelar</button>
        </div>
    </div>
</div>`
}

function delModal(id){
    console.log(id);
    modal.classList.toggle('active');
    modalContent.innerHTML = `<div class="w-[250px] h-fit bg-white text-black">
    <div class="px-4 py-2 border-b-[1px] border-gray-600">Deletar</div>
    <div class="px-4 py-4">
        <p>Deseja remover este item? </p>
        <div class="mt-4 flex justify-between">
            <button class="text-xs bg-green-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="deleteItem(${id})">Confirmar</button>
            <button class="text-xs bg-red-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="modalClose()">Cancelar</button>
        </div>
    </div>
</div>`;
}

function resultModal(message){

    modalContent.innerHTML = `<div class="w-[250px] h-fit bg-white text-black">
    <div class="px-4 py-2 border-b-[1px] border-gray-600">Resultado</div>
    <div class="px-4 py-4">
        <p>${message}</p>
        <div class="mt-4 flex justify-between">
            <button class="text-xs bg-green-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="modalClose()">Confirmar</button>
        </div>
    </div>
</div>`;

    renderTable();
}

modal.addEventListener('click',(e)=> {
    if(e.target == modal) modalClose();
})

function modalClose(){
    modal.classList.toggle('active')
}
