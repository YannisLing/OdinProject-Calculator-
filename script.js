function add(a,b){
  return a+b;
}
function sub(a,b){
  return a-b;
}
function multi(a,b){
  return a*b;
}
function divide(a,b){
  return a/b;
}
function operate(a,b,string){
  switch(string){
    case "+":
      return add(a,b);
    case "-":
      return sub(a,b);
    case "*":
      return multi(a,b);
    case "/":
      return divide(a,b);
  }
}
let number1S = '';//数字1的字符串
let number2S= '';
let number1 = 0;
let number2 = 0;
let string = ''
let isnumber1 = true;
let currentCal = ''
function changeNumber(){
  const container = document.querySelector('.calculator')
  container.addEventListener('click',(e)=>{
    const button = e.target.closest('button')
    if(!button) return;
    const value = button.dataset.value;
    
    if('0123456789.'.includes(value)){
      number1S=isnumber1?number1S+value:number1S
      number1 =isnumber1?Number(number1S):number1;
      number2S=isnumber1?number2S:number2S+value
      number2 =isnumber1?number2:Number(number2S)
    }
    if('/*-+'.includes(value)){
      if(number1S!==''&&number2S!==''){
        number1 = operate(number1,number2,currentCal);
        number2 = 0;
        number1S = String(number1);
        number2S = '';
        isnumber1 = true
      }
      isnumber1=!isnumber1;
      currentCal = value;//计算完成后保存这一次的运算符方便下次运算
    }
    if('='.includes(value)){
      if(number1S!==''&&number2S!==''){
        number1 = operate(number1,number2,currentCal);
        number2 = 0;
        number1S = String(number1);
        number2S = '';
        isnumber1 = true
      }
    }
    console.log('number1S', number1S);
    console.log('number2S', number2S);
    console.log('number1', number1);
    console.log('number2', number2);
  })
}
changeNumber()