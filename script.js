let vetorCavalos = [];
function apostar() {
    resultadoConteudo.innerHTML = '';
    for (let i = 0; i < vetorCavalos.length; i++) {
        vetorCavalos[i].voltas = [];
        vetorCavalos[i].tempoTotal = 0;
    }


    let vetorTemposTotais = [];
    let vetorPodio = [];
    let cavaloEscolhido = document.querySelector('input[name="opcao"]:checked');
    let valorApostar = Number(iptValorAposta.value);

    if (cavaloEscolhido == null) {
        alert('Escolha um cavalo.');
    } else if (valorApostar <= 0 || valorApostar == '') {
        alert('Escolha um valor válido para apostar.');
    } else if (valorApostar > creditosTotais) {
        alert('Você não pode apostar mais do que os créditos totais.');
    } else {
        divEscolherCavalo.style.display = 'none';
        resultado.style.display = 'block';
        for (let i = 0; i < qtdVoltas; i++) {
            resultadoConteudo.innerHTML += `<br> Volta ${i + 1} <br>`;

            for (let c = 0; c < vetorCavalos.length; c++) {
                let tempoVolta = Number(((Math.random() * 2) + 7).toFixed(1));

                vetorCavalos[c].voltas.push(tempoVolta);
                vetorCavalos[c].tempoTotal += tempoVolta;

                resultadoConteudo.innerHTML += `
                    ${vetorCavalos[c].nome} - Tempo da Volta: ${tempoVolta.toFixed(1)} - Tempo total: ${vetorCavalos[c].tempoTotal.toFixed(1)} <br>
                `;
            }
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
                if (vetorCavalos[segundo_ind].voltas[qtdVoltas - 1] < vetorCavalos[primeiro_ind].voltas[qtdVoltas - 1] && vetorCavalos[segundo_ind].voltas[qtdVoltas - 1] < vetorCavalos[terceiro_ind].voltas[qtdVoltas - 1]) {
                    primeiro = vetorCavalos[segundo_ind].tempoTotal;
                    primeiro_ind = segundo_ind;
                } else if (vetorCavalos[terceiro_ind].voltas[qtdVoltas - 1] < vetorCavalos[primeiro_ind].voltas[qtdVoltas - 1] && vetorCavalos[terceiro_ind].voltas[qtdVoltas - 1] < vetorCavalos[segundo_ind].voltas[qtdVoltas - 1]) {
                    primeiro = vetorCavalos[terceiro_ind].tempoTotal;
                    primeiro_ind = terceiro_ind;
                }
            }
        } else if (segundo == terceiro) {
            if (vetorCavalos[terceiro_ind].voltas[qtdVoltas - 1] < vetorCavalos[segundo_ind].voltas[qtdVoltas - 1]) {
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
        resultadoConteudo.innerHTML += `<br> Primeiro: Cavalo 0${vetorCavalos[primeiro_ind].nome} | Tempo Total: ${(vetorPodio[0]).toFixed(1)}  <br>
           Segundo: Cavalo 0${vetorCavalos[segundo_ind].nome} | Tempo Total: ${(vetorPodio[1]).toFixed(1)} <br>
           Terceiro: Cavalo 0${vetorCavalos[terceiro_ind].nome} | Tempo Total: ${(vetorPodio[2]).toFixed(1)} <br>`;

        if (Number(cavaloEscolhido.value) == primeiro_ind) {
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
    let nomeCavalo = iptNomeCavalo.value.trim().toUpperCase();

    if (nomeCavalo == "") {
        alert("Por favor, insira o nome do cavalo.");
        return;
    }

    if (vetorCavalos.length >= qtdCavalo) {
        alert("Todos os cavalos já foram adicionados!");
        return;
    }

    vetorCavalos.push({
        nome: nomeCavalo,
        voltas: [],
        tempoTotal: 0
    });

    iptNomeCavalo.value = "";

    div_cavalos.innerHTML = '';
    for (let i = 0; i < vetorCavalos.length; i++) {
        div_cavalos.innerHTML += `
            <div id="cavalo${i + 1}" class="box_menor">
                <div class="cavalo" style="background-image: url(imagens/cavalo${i + 1}.png);"></div>
                <p>Cavalo ${i + 1}: ${vetorCavalos[i].nome}</p>
                <!-- O valor do radio será o índice correspondente ao cavalo no vetor (0, 1, 2...) -->
                <input type="radio" id="aposta_cavalo${i + 1}" value="${i}" name="opcao">
            </div><br>
        `;
    }

    if (vetorCavalos.length == qtdCavalo) {
        divCadastroNome.style.display = 'none';
        iptValorAposta.style.display = 'block';
        document.querySelector('.aposta').style.display = 'block';
    }
}

