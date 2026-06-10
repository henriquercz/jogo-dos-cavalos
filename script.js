let vetorCavalos = [];
function apostar() {
    resultadoConteudo.innerHTML = '';

    for (let i = 0; i < vetorCavalos.length; i++) {
        vetorCavalos[i].voltas = [];
        vetorCavalos[i].tempoTotal = 0;
    }

    let cavaloEscolhido =
        document.querySelector('input[name="opcao"]:checked');

    let valorApostar =
        Number(iptValorAposta.value);

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
    resultado.style.display = 'block';

    for (let volta = 0; volta < qtdVoltas; volta++) {

        resultadoConteudo.innerHTML += `
            <br>
            <b>VOLTA ${volta + 1}</b>
            <br><br>`;

        for (let cavalo = 0; cavalo < vetorCavalos.length; cavalo++) {

            let tempoVolta =
                Number(((Math.random() * 2) + 7).toFixed(1));

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

        let diferenca =
            rankingParcial[1].tempoTotal -
            rankingParcial[0].tempoTotal;

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
            ultima:
                vetorCavalos[i].voltas[qtdVoltas - 1]
        });
    }

    for (let i = 0; i < podio.length - 1; i++) {

        for (let j = 0; j < podio.length - 1 - i; j++) {

            let trocar = false;

            if (podio[j].tempo > podio[j + 1].tempo) {
                trocar = true;
            }
            else if (
                podio[j].tempo ==
                podio[j + 1].tempo
            ) {

                if (
                    podio[j].ultima >
                    podio[j + 1].ultima
                ) {
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

    for (let i = 0; i < podio.length - 2; i++) {

        resultadoConteudo.innerHTML += `
            ${i + 1}º Lugar:
            ${vetorCavalos[podio[i].ind].nome}
            -
            ${podio[i].tempo.toFixed(1)}s <br>`;
    }

    if (Number(cavaloEscolhido.value)== podio[0].ind) {
        resultadoConteudo.innerHTML += `
            <br>
            Você ganhou
            R$ ${(valorApostar * 2).toFixed(2)}
        `;

        creditosTotais += valorApostar;
    }
    else {
        resultadoConteudo.innerHTML += `
            <br>
            Você perdeu
            R$ ${valorApostar.toFixed(2)}
        `;

        creditosTotais -= valorApostar;
    }
    spanCreditos.innerHTML = creditosTotais;
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

