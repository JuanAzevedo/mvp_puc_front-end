let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');

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

//function getRequest() {
//
//    return fetch(configs.apiUrl).then((response) => {
//        return response.json();
//   }).catch((e) => {
//
//    })
//
//}

function getRequest() {
    return fetch(configs.apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados das reservas');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
}

function deleteResquest(id) {
    return fetch(`${configs.apiUrl}?id=${id}`, { method: 'DELETE' }).then((response) => {
        return response.json();
    }).catch((e) => {

    })

}

async function deleteItem(id) {
    console.log(id)
    let response = await deleteResquest(id);
    console.log(response)
}

async function renderTable() {

    configs.tableDiv.innerHTML = "";

    let data = await getRequest();
    console.log(data)
    data.forEach((data, index) => {

        configs.tableDiv.innerHTML += `
            <tr>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-500">${index + 1}
                </div>
            </td>
            <td class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900">${data.numero_quarto}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-500">${data.data_checkin}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900">${data.data_checkout}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900">${data.numero_pessoas}</div>
            </td>
            <td
                class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div class="text-slate-900">${data.cliente.nome + " " + data.cliente.sobrenome}</div>
            </td>
            <td class="px-5 py-3 border-b border-slate-200 first:pl-3 last:pr-3 last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <button class="text-xs bg-green-500 text-white p-2 rounded-sm mr-2" onclick="editModal(${data.id})">Alterar</button>
                <button class="text-xs bg-red-500 text-white p-2 rounded-sm mr-2" onclick="delModal(${data.id})">Deletar</button>
            </td>
        </tr>`
    })



}


function createModal() {
    modal.classList.toggle('active');
    modalContent.innerHTML = ` <div class="h-fit bg-white text-black">
    <div class="px-4 py-2 border-b-[1px] border-gray-600">Cadastrar</div>
    <div class="px-4 py-4 flex flex-col gap-4">
        <div>
            <label class="mr-4" for="">Nome</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="text">
        </div>
        <div>
            <label class="mr-4" for="">Sobrenome</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="text">
        </div>
        <div>
            <label class="mr-4" for="">Telefone</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="tel">
        </div>
        <div>
            <label class="mr-4" for="">Email</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="email">
        </div>
        <div class="mt-4 flex justify-between">
            <button class="text-xs bg-green-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="deleteItem()">Cadastrar</button>
            <button class="text-xs bg-red-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="modalClose()">Cancelar</button>
        </div>
    </div>
</div>`
}
function editModal(id) {

    modal.classList.toggle('active');
    modalContent.innerHTML = ` <div class="h-fit bg-white text-black">
    <div class="px-4 py-2 border-b-[1px] border-gray-600">Alterar</div>
    <div class="px-4 py-4 flex flex-col gap-4">
        <div>
            <label class="mr-4" for="">Nome</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="text">
        </div>
        <div>
            <label class="mr-4" for="">Sobrenome</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="text">
        </div>
        <div>
            <label class="mr-4" for="">Telefone</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="tel">
        </div>
        <div>
            <label class="mr-4" for="">Email</label>
            <input class="bg-gray-200 outline-none border-black border-[1px] rounded-md px-2 py-1" type="email">
        </div>
        <div class="mt-4 flex justify-between">
            <button class="text-xs bg-green-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="deleteItem(${id})">Alterar</button>
            <button class="text-xs bg-red-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="modalClose()">Cancelar</button>
        </div>
    </div>
</div>`
}

function delModal(id) {
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

modal.addEventListener('click', (e) => {
    if (e.target == modal) modalClose();
})

function modalClose() {
    modal.classList.toggle('active')
}
