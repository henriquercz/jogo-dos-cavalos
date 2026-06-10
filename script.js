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



        let podio = [];
        for (let i = 0; i < vetorCavalos.length; i++) {
            podio.push({
                ind: i, 
                tempo: vetorCavalos[i].tempoTotal, 
                ultima: vetorCavalos[i].voltas[qtdVoltas - 1]
            });
        }

        for (let i = 0; i < podio.length - 1; i++) {
            for (let j = 0; j < podio.length - 1 - i; j++) {
                let atual = podio[j];
                let proximo = podio[j + 1];
                let trocar = false;

                if (atual.tempo > proximo.tempo) {
                    trocar = true;
                } else if (atual.tempo == proximo.tempo) {
                    if (atual.ultima > proximo.ultima) {
                        trocar = true;
                    }
                }

                if (trocar) {
                    let aux = podio[j];
                    podio[j] = podio[j + 1];
                    podio[j + 1] = aux;
                }
            }
        }

        for (let i = 0; i < podio.length && i < 3; i++) {
            resultadoConteudo.innerHTML += `<br> ${i + 1}º Lugar: Cavalo ${vetorCavalos[podio[i].ind].nome} | Tempo Total: ${(podio[i].tempo).toFixed(1)} <br>`;
        }

        if (Number(cavaloEscolhido.value) == podio[0].ind) {
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

    for (let i = 0; i < vetorCavalos.length; i++) {
        if (vetorCavalos[i].nome == nomeCavalo) {
            alert("Já existe um cavalo com este nome!");
            return;
        }
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
        iptValorAposta.style.display = 'block';
        document.querySelector('.aposta').style.display = 'block';
    }
}

