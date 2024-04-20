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
    dados.append('numero', document.querySelector('input[name="numero"]').value);
    dados.append('capacidade_maxima', document.querySelector('input[name="capacidade"]').value);
    dados.append('valor_diaria', document.querySelector('input[name="valor"]').value);
    //dados.append('status', document.querySelector('input[name="status"]').value);


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
    dados.append('capacidade_maxima', document.querySelector('input[name="capacidade"]').value);
    dados.append('valor_diaria', document.querySelector('input[name="valor"]').value);  


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
                <div class="text-slate-500" >${index + 1}
                </div>
            </td>
            <td class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900 ">${data.numero}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-500" id="capacidadeColuna">${data.capacidade_maxima}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900" id="valorColuna">${data.valor_diaria}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900" id="statusColuna">${data.vago == true ? "Vago" : "Ocupado"}</div>
            </td>
            <td class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <button class="text-xs bg-green-500 text-white p-2 rounded-sm mr-2" onclick="editModal(this,${data.id})">Alterar</button>
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
            <label class="mr-4" for="">Nº Quarto</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1"  name="numero">
        </div>
        <div>
            <label class="mr-4" for="">Capacidade</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" name="capacidade">
        </div>
        <div>
            <label class="mr-4" for="">Valor</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1"  name="valor">
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
            <label class="mr-4" for="">Capacidade</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" value="${parent.querySelector('#capacidadeColuna').innerText}" name="capacidade" type="text">
        </div>
        <div>
            <label class="mr-4" for="">Valor</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" value="${parent.querySelector('#valorColuna').innerText}" name="valor" type="number">
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

modal.addEventListener('click',(e)=> {
    if(e.target == modal) modalClose();
})

function modalClose(){
    modal.classList.toggle('active')
}
