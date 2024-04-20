let obj = {
    "quarto_id": null,
    "data_checkin": null,
    "data_checkout": null,
    "numero_pessoas": null,
    "cliend_id": null
}


async function renderQuartos(){
    
    const quarto_list = document.querySelector('.quarto-list');
    quarto_list.innerHTML = ""

    let quartos = await fetch("http://localhost:5000/quartos_vagos").then((response)=> {
        return response.json();
    })


    quartos.forEach((quarto)=> {
        quarto_list.innerHTML += `
        <div class="quarto-card">
        <input type="radio" name="quarto" value="${quarto.id}" id="quarto-${quarto.id}" class="hidden radio-quarto">
        <label for="quarto-${quarto.id}" class="flex border-[1px] border-gray-500 rounded-md items-center gap-8 w-fit cursor-pointer">
            <img class="w-[250px] h-full object-contain" src="./assets/images/quartos_placeholder.jpg">
            <div class="quarto-details px-12">
                <div>
                    <span>Numero do Quarto: ${quarto.numero}</span>
                </div>
                <div>
                    <span>Capacidade Maxima: ${quarto.capacidade_maxima} Pessoas</span>
                </div>
                <div>
                    <span>R$ ${quarto.valor_diaria}</span>
                </div>
            </div>
        </label>
    </div>
        `
    });
    

}


async function getUsers(){
    

    let email = document.querySelector('input[name="email"]').value;

    let users =  await fetch("http://localhost:5000/clientes").then((response)=> {
        return response.json();
    }).catch((e)=> {

    })


    const user = users.find(user => user.email === email);
    console.log(email)
    if(user){

        document.querySelector('.search-cliente').style.display = "none";
        document.querySelector('input[name="email"]').readOnly = true;

        document.querySelector(".cadastrar-cliente").classList.add('hidden');
        document.querySelector(".btn-finalizar").classList.remove('hidden');
        document.querySelector(".error-not-found").classList.add('hidden');
        document.querySelector('input[name="nome"]').value = user.nome;
       
        document.querySelector('input[name="sobrenome"]').value = user.sobrenome;
        
        document.querySelector('input[name="telefone"]').value = user.celular;
       
        obj.cliend_id = user.id;
        console.log(user);
    }else {
        document.querySelector(".error-not-found").classList.remove('hidden');
        document.querySelector(".cadastrar-cliente").classList.remove('hidden');
        
    }
    

}

async function finalizarReserva(){
    var dados = new URLSearchParams();
    dados.append('quarto_id', obj.quarto_id);
    dados.append('data_checkin', obj.data_checkin);
    dados.append('data_checkout', obj.data_checkout);
    dados.append('numero_pessoas', obj.numero_pessoas);
    dados.append('cliente_id', obj.cliend_id);


   let response = await fetch("http://localhost:5000/reservas", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Indica que estamos enviando como formulário
        },
        body: dados // Passa os dados diretamente como um objeto URLSearchParams
      }).then((response)=> {
        return response.json();
    }).catch((e)=> {
        return e;
    })

    resultModal(response.message ? response.message : response[0].msg);

}


function setQuarto(){
    let radios = document.querySelectorAll('.radio-quarto');
    let selected;

    radios.forEach((elem)=> {
        if(elem.checked){
            selected = elem;
            return
        }
    })

    if(selected){
        obj.quarto_id = selected.value;
        document.querySelector('.step-2').classList.add('hidden');
        document.querySelector('.step-3').classList.remove('hidden');
    }else{
        alert("Selecione um quarto!");
    }
}

function setDate(){

    let checkin = document.querySelector('#data_checkin').value;
    let checkout = document.querySelector('#data_checkout').value;
    let qtdPessoas = document.querySelector('#qtd_pessoas').value;

    if(validarDatas(checkin,checkout) && qtdPessoas > 0){
        obj.data_checkin = checkin;
        obj.data_checkout = checkout;
        obj.numero_pessoas = qtdPessoas;
        document.querySelector('.step-1').classList.add('hidden');
        document.querySelector('.step-2').classList.remove('hidden');

        renderQuartos();

    }else {
        alert("Houve um erro!");
    }
    

    console.log(checkin);
    console.log(obj)

}

function validarDatas(dataInicio,dataFim) {
    

    // Obtém a data atual
    var dataAtual = new Date();
    var diaAtual = dataAtual.getDate();
    var mesAtual = dataAtual.getMonth() + 1; // Os meses são indexados a partir de 0
    var anoAtual = dataAtual.getFullYear();

    // Formata a data atual para o formato YYYY-MM-DD
    var dataAtualFormatada = anoAtual + "-" + (mesAtual < 10 ? '0' : '') + mesAtual + "-" + (diaAtual < 10 ? '0' : '') + diaAtual;

    // Verifica se a data de início é posterior à data atual
    if (dataInicio < dataAtualFormatada) {
        return false;
    }

    // Verifica se a data de fim é posterior à data de início
    if (dataFim <= dataInicio) {
        return false;
    }

    return true;
}

function resultModal(message){

    document.querySelector('.modal').classList.toggle('active');
    document.querySelector('.modal-content').innerHTML = `<div class="w-[250px] h-fit bg-white text-black">
    <div class="px-4 py-2 border-b-[1px] border-gray-600">Resultado</div>
    <div class="px-4 py-4">
        <p>${message}</p>
        <div class="mt-4 flex justify-between">
            <button class="text-xs bg-green-500 text-white py-2 px-4 rounded-sm mr-2"
                onclick="modalClose()">Confirmar</button>
        </div>
    </div>
</div>`;
}

function modalClose(){
    window.location.href = "./index.html";
}