var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");

var operand1 = 0;
var operand2 = null;
var operator= null;
for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click',function(){
        var value = this.getAttribute('data-value');
        if(value == '+'){
            operator = '+';
            operand1 = parseFloat(display.textContent);
            display.innerText = null;
        }
        else if(value == '-'){
            operator = '-';
            operand1 = parseFloat(display.textContent);
            display.innerText = null;
        }
        else if(value == 'x'){
            operator = '*';
            operand1 = parseFloat(display.textContent);
            display.innerText = null;
        }
        else if(value == '/'){
            operator = '/';
            operand1 = parseFloat(display.textContent);
            display.innerText = null;
        }
        else if(value == '='){
            operand2 = parseFloat(display.textContent);
            display.innerText = eval(operand1 + " " + operator + " " + operand2);
        }
        else if(value == 'AC'){
            operand1 = 0;
            operand2 = null;
            operator= null;
            display.innerText = null;
        }
        else if(value == 'C'){
            display.innerText = parseInt(display.innerText/10);
        }
        else if(value == '%'){
            operator = '/';
            operand1 = parseFloat(display.textContent);
            display.innerText = operand1/100;
        }
        else{
            display.innerText += value;
        }
    });
}