/*VAR GLOBAIS */

let tempoInicial = $('.tempo-digitacao').text()
let campo = $('.campo-digitacao')
let gabaritoFrase = $('.frase').text()
/* CHAMA FUNÇÕES */
$(function () {
  atualizaTamanhoFrase()
  inicializaContadores()
  inicializaCronometro()
  comparaFrase()
  $('#btn-reiniciar').click(reiniciaJogo)
})

/*Conta o número de paralvras da Frase EXEMPLO*/

function atualizaTamanhoFrase() {
  let contadorTamanhoDaFrase = $('.frase').text().split(' ').length
  $('#textoComOTamanhoDaFrase').text(contadorTamanhoDaFrase)
}

/*Conta o número de palavras e caracteres digitados*/
function inicializaContadores() {
  campo.on('input', function () {
    let conteudoDoCampo = campo.val()
    $('.contator-caracteres-digitados').text(conteudoDoCampo.length)
    $('.contador-palavras-digitadas').text(
      conteudoDoCampo.split(/\S+/).length - 1
    )
  })
}

/*Comparar frase com o digitado */

function comparaFrase() {
  campo.on('input', function () {
    let digitado = campo.val()
    let comparador = gabaritoFrase.substr(0, digitado.length)
    if (digitado == comparador) {
      campo.addClass('campo-borda-verde')
      campo.removeClass('campo-borda-vermelha')
    } else {
      campo.addClass('campo-borda-vermelha')
      campo.removeClass('campo-borda-verde')
    }
  })
}

/*INCIALIZA O CRONOMETRO*/

function inicializaCronometro() {
  let tempoRestante = $('.tempo-digitacao').text()
  campo.one('focus', function () {
    let cronometroID = setInterval(function () {
      tempoRestante--
      $('.tempo-digitacao').text(tempoRestante)
      if (tempoRestante < 1) {
        clearInterval(cronometroID)
        finalizaJogo()
      }
    }, 1000)
  })
}

/*Botão Reiniciar Jogo */

function reiniciaJogo() {
  campo.attr('disabled', false)
  campo.val('')
  $('.contator-caracteres-digitados').text('0')
  $('.contador-palavras-digitadas').text('0')
  $('.tempo-digitacao').text(tempoInicial)
  inicializaCronometro()
  campo.removeClass('campo-desativado')
  campo.removeClass('campo-borda-verde')
  campo.removeClass('campo-borda-vermelha')
}

/**INSERE PLACAR */

function inserePlacar() {
  let corpoTabela = $('.placar').find('tbody')
  let usuario = 'Lakshimi'
  let numeroDePalavrasDigitadas = $('.contador-palavras-digitadas').text()
  let botaoRemover = `<a href=""><i class="small material-icons">delete</i></a>`

  let linha = `<tr>
                <td>${usuario}</td>
                <td>${numeroDePalavrasDigitadas}</td>
                <td>${botaoRemover}</td>
              </tr>`
  corpoTabela.append(linha)
}

/**FINALIZA JOGO */
function finalizaJogo() {
  campo.attr('disabled', true)
  campo.addClass('campo-desativado')
  inserePlacar()
}
