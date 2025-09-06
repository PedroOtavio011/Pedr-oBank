// Botão depositar
function depositar(){
    let contaCorrente = document.getElementsByClassName("dinheiro")[0]
    let valor = parseFloat(prompt('Qual valor deseja depositar?'))
    

    if(isNaN(valor) || valor <= 0){
        alert('Por favor, insira um valor válido');
    }else{

   //Pega valor atual exibido, e converte em número
    let valorAtual = parseFloat(contaCorrente.textContent.replace('R$', '').replace(',', '.').trim()) || 0;

    //Soma o valor depositado
    valorTotal = valorAtual + valor

    //Atualiza o elemento
    contaCorrente.textContent = `R$ ${valorTotal.toFixed(2)}`

    bancoTotal = localStorage.setItem('ValorTotal', valorTotal)   
    }
}   

//Botão sacar
function sacar(){
    let contaCorrente = document.getElementsByClassName("dinheiro")[0]
    let controle = document.getElementsByClassName("controle")[0]
    let sacar = parseFloat(prompt("Qual valor você deseja sacar?"))

    if(isNaN(sacar) || sacar <= 0){
        alert('Valor inválido')    
    }else{
        let saldoAtual = parseFloat(contaCorrente.textContent.replace('R$', '').replace(',', '.').trim())
        if(sacar > saldoAtual){
            alert('Saldo insuficiente.')
            return
        }

        //Atualuza o saldo da conta corrente subtraindo o valor sacado
        let saldoAtualizado = saldoAtual - sacar
        contaCorrente.textContent = `R$ ${saldoAtualizado.toFixed(2).replace('.', ',')}`


        //Acumula o valor que ja foi sacado
        let gastoAtual = parseFloat(controle.textContent.replace('-', '').replace('R$', '').replace(',', '.'))

        //Soma o valor acumalado sacado com o atual
        let gastoTotal = gastoAtual += sacar


        //Retorna no navegador o valor que ja foi sacado.
        controle.innerHTML = `R$ -${gastoTotal.toFixed(2)}`
        
        localStorage.setItem('ValorTotal', saldoAtualizado)
        localStorage.setItem('TotalSacado', gastoTotal)
    }

}

// Simular
function simular(){
    let totalSimulação = document.getElementsByClassName("invest")[0]
    let capitalInicial = parseFloat(prompt('Digite sua capital inical:'))
    let taxaDeJuros = 0.15
    let tempo = parseFloat(prompt('Digite o tempo de investimento em anos.'))
    
    if(isNaN(capitalInicial) || isNaN(tempo) || tempo < 1 || capitalInicial < 0){
        alert('Houve um erro')
    }else{
        let montante = capitalInicial * (1 + taxaDeJuros) * tempo
        totalSimulação.innerHTML = `R$ ${montante.toFixed(2)}`

    }
}

window.onload = function(){
    let contaCorrente = document.getElementsByClassName("dinheiro")[0]
    let controle = document.getElementsByClassName("controle")[0]

    let bancoTotal = localStorage.getItem('ValorTotal')
    let bancoSacar = localStorage.getItem('TotalSacado')

    if(bancoTotal !== null){
        let valorFormatado = parseFloat(bancoTotal).toFixed(2).replace('.', ',')
        contaCorrente.textContent = `R$ ${valorFormatado}`
    }
    if(bancoSacar !== null){
        let valorFormatado = parseFloat(bancoSacar).toFixed(2).replace('.', ',')
        controle.textContent = `R$ -${valorFormatado}`
    }
}


