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
let isCal = false;//isCal解决连续输入符号问题
const display = document.querySelector('.display');
function changeNumber(){
  const container = document.querySelector('.calculator')
  container.addEventListener('click',(e)=>{
    const button = e.target.closest('button')
    if(!button) return;
    const value = button.dataset.value;
    //输入数字
    if('0123456789.'.includes(value)){
      isCal=false;
      number1S=isnumber1?number1S+value:number1S
      number1 =isnumber1?Number(number1S):number1;
      number2S=isnumber1?number2S:number2S+value
      number2 =isnumber1?number2:Number(number2S)
    }
    //输入符号
    if('/*-+'.includes(value)&&number1S!==''&&isCal===false){
      isCal= true;
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
    //输入负数
    if(value==='-'&&number1S===''){
      isCal= true;//负号也是符号
      number1S=isnumber1?number1S+value:number1S

    }
    if('='.includes(value)){
      if(number1S!==''&&number2S!==''){
        number1 = operate(number1,number2,currentCal);
        number2 = 0;
        number1S = String(number1);
        number2S = '';
        isnumber1 = true
        currentCal = ''
      }
    }
    //清空
    if('c'.includes(value)){
      number1S = '';//数字1的字符串
      number2S= '';
      number1 = 0;
      number2 = 0;
      isnumber1 = true;
      currentCal = ''
    }
    //删除
    if('d'.includes(value)){
      if(isnumber1){//删数字1还是2
        number1S = number1S.slice(0,-1);
        number1 = Number(number1);
      }else{
        if(number2S!==''){//如果删2的时候为空，说明刚刚输入过符号
          number2S = number2S.slice(0,-1);
          number2 = Number(number2);
        }else{//处理运算字符
          currentCal = ''
          isnumber1=!isnumber1;
        }
      }
    }

    //显示内容
    
    display.textContent = number1S+' '+changeCurrentcal(currentCal)+' '+number2S
    console.log('number1S', number1S);
    console.log('number2S', number2S);
    console.log('number1', number1);
    console.log('number2', number2);
  })
}
function changeCurrentcal(currentcal){
  if(currentcal==='*') return '×';
  if(currentcal==='/') return '÷';
  return currentcal;
}
changeNumber();