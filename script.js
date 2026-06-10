let vetorCavalos = [];
function apostar() {
    resultadoConteudo.innerHTML = '';

    let vetorTemposTotais = [];
    let vetorPodio = [];
    let cavaloEscolhido = document.querySelector('input[name="opcao"]:checked');
    let valorApostar = Number(iptValorAposta.value);

    if (cavaloEscolhido == 0) {
        alert('Escolha um cavalo.');
    } else if (valorApostar <= 0 || valorApostar == '') {
        alert('Escolha um valor válido para apostar.');
    } else if (valorApostar > creditosTotais) {
        alert('Você não pode apostar mais do que os créditos totais.');
    } else {
        divEscolherCavalo.style.display = 'none';
        resultado.style.display = 'block';
        for (let i = 0; i < 7; i++) {
            let numAleatorio1 = ((Math.random() * 2) + 7).toFixed(1);
            let numAleatorio2 = ((Math.random() * 2) + 7).toFixed(1);
            let numAleatorio3 = ((Math.random() * 2) + 7).toFixed(1);
            let numAleatorio4 = ((Math.random() * 2) + 7).toFixed(1);
            let numAleatorio5 = ((Math.random() * 2) + 7).toFixed(1);

            vetorCavalos[0].voltas.push(numAleatorio1);
            vetorCavalos[1].voltas.push(numAleatorio2);
            vetorCavalos[2].voltas.push(numAleatorio3);
            vetorCavalos[3].voltas.push(numAleatorio4);
            vetorCavalos[4].voltas.push(numAleatorio5);

            vetorCavalos[0].tempoTotal += Number(numAleatorio1);
            vetorCavalos[1].tempoTotal += Number(numAleatorio2);
            vetorCavalos[2].tempoTotal += Number(numAleatorio3);
            vetorCavalos[3].tempoTotal += Number(numAleatorio4);
            vetorCavalos[4].tempoTotal += Number(numAleatorio5);

            resultadoConteudo.innerHTML += `
                <br> Volta ${i + 1} <br>
                Cavalo ${vetorCavalos[0].numCavalo} - Tempo da Volta: ${vetorCavalos[0].voltas[i]} - Tempo total: ${(vetorCavalos[0].tempoTotal).toFixed(1)} <br>
                Cavalo ${vetorCavalos[1].numCavalo} - Tempo da Volta: ${vetorCavalos[1].voltas[i]} - Tempo total: ${(vetorCavalos[1].tempoTotal).toFixed(1)} <br>
                Cavalo ${vetorCavalos[2].numCavalo} - Tempo da Volta: ${vetorCavalos[2].voltas[i]} - Tempo total: ${(vetorCavalos[2].tempoTotal).toFixed(1)} <br>
                Cavalo ${vetorCavalos[3].numCavalo} - Tempo da Volta: ${vetorCavalos[3].voltas[i]} - Tempo total: ${(vetorCavalos[3].tempoTotal).toFixed(1)} <br>
                Cavalo ${vetorCavalos[4].numCavalo} - Tempo da Volta: ${vetorCavalos[4].voltas[i]} - Tempo total: ${(vetorCavalos[4].tempoTotal).toFixed(1)} <br>
                `;

        }


        let primeiro_ind = 0;
        let segundo_ind = 0;
        let terceiro_ind = 0;



        for (let i = 0; i < vetorCavalos.length; i++) {
            vetorTemposTotais.push(vetorCavalos[i].tempoTotal);
        }

        let primeiro = 100;
        let segundo = 100;
        let terceiro = 100;


        for (let i = 0; i < vetorCavalos.length; i++) {
            if (primeiro > vetorTemposTotais[i]) {
                primeiro = vetorTemposTotais[i];
                primeiro_ind = i;
            }
        }


        for (let i = 0; i < vetorCavalos.length; i++) {
            if (i != primeiro_ind && segundo > vetorTemposTotais[i]) {
                segundo = vetorTemposTotais[i];
                segundo_ind = i;
            }
        }


        for (let i = 0; i < vetorCavalos.length; i++) {
            if (i != primeiro_ind && i != segundo_ind && terceiro > vetorTemposTotais[i]) {
                terceiro = vetorTemposTotais[i];
                terceiro_ind = i;
            }
        }

        if (primeiro == segundo) {
            if (primeiro == terceiro) {
                if (vetorCavalos[segundo_ind].voltas[6] < vetorCavalos[primeiro_ind].voltas[6] && vetorCavalos[segundo_ind].voltas[6] < vetorCavalos[terceiro_ind].voltas[6]) {
                    primeiro = vetorCavalos[segundo_ind].tempoTotal;
                    primeiro_ind = segundo_ind;
                } else if (vetorCavalos[terceiro_ind].voltas[6] < vetorCavalos[primeiro_ind].voltas[6] && vetorCavalos[terceiro_ind].voltas[6] < vetorCavalos[segundo_ind].voltas[6]) {
                    primeiro = vetorCavalos[terceiro_ind].tempoTotal;
                    primeiro_ind = terceiro_ind;
                }
            }
        } else if (segundo == terceiro) {
            if (vetorCavalos[terceiro_ind].voltas[6] < vetorCavalos[segundo_ind].voltas[6]) {
                segundo = vetorCavalos[terceiro_ind].tempoTotal;
                segundo_ind = terceiro_ind;

                terceiro = 100;
                for (let i = 0; i < vetorCavalos.length; i++) {
                    if (i != primeiro_ind && i != segundo_ind && terceiro > vetorTemposTotais[i]) {
                        terceiro = vetorTemposTotais[i];
                        terceiro_ind = i;
                    }
                }
            }
        }

        vetorPodio.push(primeiro);
        vetorPodio.push(segundo);
        vetorPodio.push(terceiro);
        resultadoConteudo.innerHTML += `<br> Primeiro: Cavalo 0${vetorCavalos[primeiro_ind].numCavalo} | Tempo Total: ${(vetorPodio[0]).toFixed(1)}  <br>
           Segundo: Cavalo 0${vetorCavalos[segundo_ind].numCavalo} | Tempo Total: ${(vetorPodio[1]).toFixed(1)} <br>
           Terceiro: Cavalo 0${vetorCavalos[terceiro_ind].numCavalo} | Tempo Total: ${(vetorPodio[2]).toFixed(1)} <br>`;

        if (cavaloEscolhido == primeiro_ind + 1) {
            resultadoConteudo.innerHTML += `<br> Parabéns, você ganhou R$ ${(valorApostar * 2).toFixed(2)}.`;
            creditosTotais += valorApostar;
            spanCreditos.innerHTML = creditosTotais;
        } else {
            resultadoConteudo.innerHTML += `<br> Que pena, você perdeu R$ ${(valorApostar).toFixed(2)}.`;
            creditosTotais -= valorApostar;
            spanCreditos.innerHTML = creditosTotais;
        }
    }
}

function voltar() {
    resultado.style.display = 'none';
    result.style.display = 'none';
    divEscolherCavalo.style.display = 'block';
}
let qtdCavalo = 0
let qtdVoltas = 0

function avancarProximaDiv() {
    qtdCavalo = Number(ipt_quant_cavalos.value.trim())
    qtdVoltas = Number(ipt_quant_voltas.value.trim())
    if (!qtdCavalo || !qtdVoltas) {
        alert("Preencha todos os campos")
    }
    else if (qtdCavalo > 6) {
        alert("O numero de cavalos deve ser entre 2 e 6")
    }
    else if (qtdCavalo < 2) {
        alert("O numero de cavalos deve ser entre 2 e 6")
    }
    else if (qtdVoltas > 10) {
        alert("O numero de voltas deve ser entre 5 e 10")
    }
    else if (qtdVoltas < 5) {
        alert("O numero de voltas deve ser entre 5 e 10")
    }
    else {
        divEscolherCavalo.style.display = 'block';
        dados_da_corrida.style.display = 'none';
    }
}


function adicionarCavalo() {
    let nomeCavalo = (iptNomeCavalo.value.trim()).toUpperCase();
    if (vetorCavalos == qtdCavalo) {

    }
    else {
        vetorCavalos.push({
            nome: nomeCavalo,
            voltas: [],
            tempoTotal: 0
        })
        div_cavalos += vetorCavalos[vetorCavalos.length-1].nome

        for (let i = 0; i < vetorCavalos.length; i++) {
            cavalo1.innerHTML = `${i + 1} - ${vetorCavalos[i]}<br>`
        }
       
    }

     if(getComputedStyle(dados_da_corrida).display == "block" && vetorCavalos.length == 2)
        {
        fala1.style.display = "none";   
        fala2.style.display = "block";}
      
}
