

//criando a estrutura de classe ES6
class Calculator {
  constructor() {
    this.upperValue = document.querySelector('#upper-number');
    this.resultValue = document.querySelector('#result-number');
    this.reset = 0;
  }

  clearValues() {
    this.upperValue.textContent = '0';
    this.resultValue.textContent = '0';
  }

  //checa se o último dígito é mais um sinal. Se for, ele não será digitado na tela
  //!reg.test(input) testa se não é um número
  //!reg.test(upperValue.substr(upperValue.length -1) testa se já tem um sinal extra, e então não realiza a ação, retornando true

  checkLastDigit(input, upperValue, reg) {
    if((!reg.test(input) && !reg.test(upperValue.substr(upperValue.length -1)))) {
      return true;
    } else {
      return false;
    }
}

//método de soma
sum(n1, n2) {
  return parseFloat(n1) + parseFloat(n2)
}

//método de subtração
subtraction(n1, n2) {
  return parseFloat(n1) - parseFloat(n2)
}

//método de multiplicação
multiplication(n1, n2) {
  return parseFloat(n1) * parseFloat(n2)
}

//método de divisão
division(n1, n2) {
  return parseFloat(n1) / parseFloat(n2)
}

//atualiza valores
refreshValues(total) {
  this.upperValue.textContent = total;
  this.resultValue.textContent = total;
}

// resolve a operação
resolution() {
  
  // explode uma string em um array
  let upperValueArray = (this.upperValue.textContent).split(" ");
  // resultado da operação
  let result = 0;

  for(let i = 0; i <= upperValueArray.length; i++) {

    let operation = 0;
    let actualItem = upperValueArray[i];

    // faz a multiplicação
    if(actualItem == "x") {
      result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
      operation = 1;
    // faz a divisão
    } else if(actualItem == "/") {
      result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
      operation = 1;
    // checa se o array ainda tem multiplicação e divisão a ser feita
    } else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')) {
      // soma e subtração
      if(actualItem == "+") {
        result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
      } else if(actualItem == "-") {
        result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
      }
    }

    // atualiza valores do array para proxima iteração
    if(operation) {
      // indice anterior no resultado da operação
      upperValueArray[i - 1] = result;
      // remove os itens já utilizado para a operação
      upperValueArray.splice(i, 2);
      // atualizar o valor do índice
      i = 0;
    }

  }

  if(result) {
    calc.reset = 1;
  }

  // atualizar os totais
  calc.refreshValues(result);

}

  

  btnPress() {
  
    //textContent é o texto que tem dentro do botão
    let input = this.textContent;
    let upperValue = calc.upperValue.textContent;
    //verificar se tem só números com regex
    var reg = new RegExp('^\\d+$');

    //se for número e o reset estiver preenchido, limpa o display
    if(calc.reset && reg.test(input)) {
      upperValue = '0';
    }

    //limpa a prop de reset
    calc.reset = 0;

    //ativa o método de limpar a tela
    if(input == 'AC') {
      calc.clearValues();
      operatorSound.play();

    } else if (input == '=') {
      calc.resolution();
      operatorSound.play();
    } else {
    //checa se precisa adicionar ou não 
    if (calc.checkLastDigit(input, upperValue, reg)) {
      return false;
    }

    //adiciona espaços quando o que for digitado não for número
    if (!reg.test(input)) {
      input = ` ${input} `; //concatenação dando os espaços antes e depois do sinal
      operatorSound.play();
    }

    //eu que adicionei este para tocar quando for número
    if (reg.test(input)) {
      numberSound.play();
    }

    if (upperValue == '0') {
      if(reg.test(input)) {
        calc.upperValue.textContent = input;
      }  
    } else {
      calc.upperValue.textContent += input;
      
      }
    }
  }
}

//criando o objeto calc sendo instância de Calculator
let calc =  new Calculator;

//selecionando todos os botões
let buttons = document.querySelectorAll('.btn');

//criando evento de click para todos os botões
for (let i = 0; buttons.length > i; i++) {
  buttons[i].addEventListener('click', calc.btnPress);
}


//eu que fiz daqui pra baixo e um reg.test(input) pra tocar som de número
//selecionando o áudio dos números
let numberSound = document.querySelector('#number-sound');

//selecionando o áudio dos operadores
let operatorSound = document.querySelector('#operator-sound');