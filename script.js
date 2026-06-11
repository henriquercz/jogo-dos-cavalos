let vetorCavalos = [];

function apostar() {
    resultadoConteudo.innerHTML = '';

    for (let i = 0; i < vetorCavalos.length; i++) {
        vetorCavalos[i].voltas = [];
        vetorCavalos[i].tempoTotal = 0;
    }

    let cavaloEscolhido = document.querySelector('input[name="opcao"]:checked');

    let valorApostar = Number(iptValorAposta.value);

    if (cavaloEscolhido == null) {
        alert('Escolha um cavalo.');
        return;
    }

    if (valorApostar <= 0) {
        alert('Escolha um valor válido para apostar.');
        return;
    }

    if (valorApostar > creditosTotais) {
        alert('Você não pode apostar mais do que os créditos totais.');
        return;
    }

    divEscolherCavalo.style.display = 'none';
    divPistaCorrida.style.display = 'flex';

    for (let volta = 0; volta < qtdVoltas; volta++) {
        resultadoConteudo.innerHTML += `
            <br>
            <b>VOLTA ${volta + 1}</b>
            <br><br>`;

        for (let cavalo = 0; cavalo < vetorCavalos.length; cavalo++) {
            let tempoVolta = Number(((Math.random() * 2) + 7).toFixed(1));

            vetorCavalos[cavalo].voltas.push(tempoVolta);
            vetorCavalos[cavalo].tempoTotal += tempoVolta;

            resultadoConteudo.innerHTML += `
                ${vetorCavalos[cavalo].nome}
                -
                Volta: ${tempoVolta.toFixed(1)}
                -
                Total: ${vetorCavalos[cavalo].tempoTotal.toFixed(1)}
                <br>
            `;
        }

        let rankingParcial = [...vetorCavalos];
        rankingParcial.sort(function (a, b) {
            return a.tempoTotal - b.tempoTotal;
        });

        let diferenca = rankingParcial[1].tempoTotal - rankingParcial[0].tempoTotal;

        resultadoConteudo.innerHTML += `
            <br>
            Líder:
            <b>${rankingParcial[0].nome}</b>
            <br>
            Diferença para o 2º:
            ${diferenca.toFixed(1)} segundos
            <br>
            <hr>`;
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
            let trocar = false;

            if (podio[j].tempo > podio[j + 1].tempo) {
                trocar = true;
            } else if (podio[j].tempo == podio[j + 1].tempo) {
                if (podio[j].ultima > podio[j + 1].ultima) {
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

    resultadoConteudo.innerHTML += `<br><h2>RESULTADO FINAL</h2>`;
    for (let i = 0; i < podio.length; i++) {
        resultadoConteudo.innerHTML += `
            ${i + 1}º Lugar:
            ${vetorCavalos[podio[i].ind].nome}
            -
            ${podio[i].tempo.toFixed(1)}s <br>`;
    }

    let ganhouAposta = (Number(cavaloEscolhido.value) == podio[0].ind);
    if (ganhouAposta) {
        resultadoConteudo.innerHTML += `
            <br>
            Você ganhou
            R$ ${(valorApostar * 2).toFixed(2)}
        `;
        creditosTotais += valorApostar;
    } else {
        resultadoConteudo.innerHTML += `
            <br>
            Você perdeu
            R$ ${valorApostar.toFixed(2)}
        `;
        creditosTotais -= valorApostar;
    }

    divPistaCorrida.innerHTML = '';
    for (let i = 0; i < vetorCavalos.length; i++) {
        divPistaCorrida.innerHTML += `
            <div class="raia">
                <span class="nome-cavalo-raia">${vetorCavalos[i].nome}</span>
                <div class="pista-trilho">
                    <img id="cavaloCorrendo${i}" class="cavalo-correndo" src="imagens/cavalo_correndo.gif" style="left: 0%;">
                </div>
            </div>
        `;
    }

    let menorTempoTotal = vetorCavalos[0].tempoTotal;
    for (let i = 1; i < vetorCavalos.length; i++) {
        if (vetorCavalos[i].tempoTotal < menorTempoTotal) {
            menorTempoTotal = vetorCavalos[i].tempoTotal;
        }
    }

    let duracaoBaseSegundos = 5;
    let maiorTempoAnimacao = 0;
    setTimeout(function () {
        for (let i = 0; i < vetorCavalos.length; i++) {
            let elementoCavalo = document.getElementById(`cavaloCorrendo${i}`);
            let tempoAnimacao = duracaoBaseSegundos * (vetorCavalos[i].tempoTotal / menorTempoTotal);

            if (tempoAnimacao > maiorTempoAnimacao) {
                maiorTempoAnimacao = tempoAnimacao;
            }

            elementoCavalo.style.transition = `left ${tempoAnimacao}s linear`;
            elementoCavalo.style.left = '85%';
        }
    }, 50);

    setTimeout(function () {
        divPistaCorrida.style.display = 'none';
        divPodioFinal.style.display = 'block';
        divApostaEReiniciar.style.display = 'block';
        spanCreditos.innerHTML = creditosTotais;

        exibirPodioEHistorico(podio, ganhouAposta, valorApostar);
    }, (duracaoBaseSegundos * (vetorCavalos[podio[podio.length - 1].ind].tempoTotal / menorTempoTotal) * 1000) + 300);
}

function exibirPodioEHistorico(vetorPodio, ganhouAposta, valorApostar) {
    let htmlPodio = '';
    let limitePodio = vetorPodio.length;
    if (limitePodio > 3) {
        limitePodio = 3;
    }

    htmlPodio += `<h3 style="text-align: center; margin-bottom: 20px; color: #fff; font-size: 14px;">PÓDIO</h3>`;
    htmlPodio += `<div style="display: flex; justify-content: space-around; align-items: flex-end; margin-bottom: 30px;">`;

    let posicoesVisuais = [];
    if (limitePodio == 3) {
        posicoesVisuais = [vetorPodio[1], vetorPodio[0], vetorPodio[2]];
    } else if (limitePodio == 2) {
        posicoesVisuais = [vetorPodio[1], vetorPodio[0]];
    } else {
        posicoesVisuais = [vetorPodio[0]];
    }

    for (let i = 0; i < posicoesVisuais.length; i++) {
        let cavItem = posicoesVisuais[i];
        let originalInd = cavItem.ind;
        let cavaloInfo = vetorCavalos[originalInd];

        let posicaoReal = 0;
        for (let k = 0; k < vetorPodio.length; k++) {
            if (vetorPodio[k].ind == originalInd) {
                posicaoReal = k + 1;
                break;
            }
        }

        let alturaCard = '80px';
        let corPodio = '#CD7F32';
        let tamanhoFonte = '12px';

        if (posicaoReal == 1) {
            alturaCard = '130px';
            corPodio = '#FFD700';
            tamanhoFonte = '16px';
        } else if (posicaoReal == 2) {
            alturaCard = '100px';
            corPodio = '#C0C0C0';
            tamanhoFonte = '14px';
        }

        let imagemUrl = `imagens/cavalo${(originalInd % 5) + 1}.png`;

        htmlPodio += `
            <div style="display: flex; flex-direction: column; align-items: center; width: 30%;">
                <img src="${imagemUrl}" style="width: 50px; height: 50px; border-radius: 50%; border: 3px solid ${corPodio}; background: white;">
                <p style="font-size: 8px; color: #fff; margin: 5px 0; text-align: center; text-transform: uppercase;">${cavaloInfo.nome}</p>
                <div style="background-color: ${corPodio}; height: ${alturaCard}; width: 100%; border-radius: 10px 10px 0 0; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #000; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                    <span style="font-size: ${tamanhoFonte}; font-weight: bold;">${posicaoReal}º</span>
                    <span style="font-size: 8px; margin-top: 5px;">${cavItem.tempo.toFixed(1)}s</span>
                </div>
            </div>
        `;
    }
    htmlPodio += `</div>`;

    podioCavalos.innerHTML = htmlPodio;

    let htmlHistorico = '<h3 style="color: #fff; text-align: center; margin-bottom: 15px; font-size: 14px;">HISTÓRICO DA CORRIDA</h3>';

    for (let i = 0; i < vetorCavalos.length; i++) {
        let cavalo = vetorCavalos[i];
        htmlHistorico += `
            <p style="font-size: 10px; color: #fff; margin-bottom: 12px; line-height: 1.6; background: rgba(255,255,255,0.05); padding: 8px; border-radius: 5px; border: 2px solid #5C3A21;">
                <b>${cavalo.nome}</b> (Total: ${cavalo.tempoTotal.toFixed(1)}s)<br>
        `;

        for (let v = qtdVoltas - 1; v >= 0; v--) {
            htmlHistorico += `Volta ${v + 1}: ${cavalo.voltas[v].toFixed(1)}s`;
            if (v > 0) {
                htmlHistorico += ` | `;
            }
        }

        htmlHistorico += `
            </p>
        `;
    }

    historicoVoltas.innerHTML = htmlHistorico;

    if (ganhouAposta) {
        resultadoMensagemAposta.innerHTML = `
            <div style="text-align: center; margin-top: 10px; margin-bottom: 10px; color: #FFD700; font-size: 12px; font-weight: bold; font-family: 'Press Start 2P', sans-serif;">
                VOCÊ GANHOU R$ ${(valorApostar * 2).toFixed(2)}
            </div>
        `;
    } else {
        resultadoMensagemAposta.innerHTML = `
            <div style="text-align: center; margin-top: 10px; margin-bottom: 10px; color: #FF6347; font-size: 12px; font-weight: bold; font-family: 'Press Start 2P', sans-serif;">
                VOCÊ PERDEU R$ ${valorApostar.toFixed(2)}
            </div>
        `;
    }
}

function reiniciarJogo() {
    divPodioFinal.style.display = 'none';
    divApostaEReiniciar.style.display = 'none';

    for (let i = 0; i < vetorCavalos.length; i++) {
        vetorCavalos[i].voltas = [];
        vetorCavalos[i].tempoTotal = 0;
    }

    divEscolherCavalo.style.display = 'block';
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

