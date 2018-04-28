const display = document.querySelector('.display');
function write(str) {
  display.textContent = str;
}
const calc = {
  input: '', // 입력 문자열
  acc: '', // 누적 문자열
  save: '' // 계속되는 계산을 위한 저장 표현식
};

// ac 모든 계산값이 초기화
document.querySelector('.op-ac').addEventListener('click', () => {
  calc.input = '';
  calc.acc = 0;
  calc.save = 0;
  write(calc.acc);
});

// neg 
document.querySelector('.op-neg').addEventListener('click', () => {
  if(calc.input === '') {
    calc.acc = calc.acc * -1;
    write(calc.acc);
  } else {
    calc.input = calc.input * -1;
    write(calc.input);
  }
});

// percent
// document.querySelector('.op-percent').addEventListener('click', () => {
//   if(calc.input === '') {
//     calc.input = calc.acc * (1 / 100);
//     write(calc.input);
//     console.log('입력이 없으면', calc.input);
//   } else {
//     calc.acc = eval(calc.input * (1 / 100))
//     write(calc.acc);
//     console.log('입력이 있으면', calc.input);
//     calc.input = '';
//   }
// });

// plus
document.querySelector('.op-plus').addEventListener('click', () => {
  // 누적값이 없으면
  if (!calc.acc) {
    calc.save = calc.input + '+';  
    calc.acc = eval(calc.save.slice(0,  -1));
    console.log(`누적값이 없으면${calc.save}`);
    write(calc.acc);
    // 누적값이 있으면.
  } else if(calc.input === '' && !/\d/.test(calc.save.slice(-1))){
    calc.save = calc.save.slice(0,  -1) + '+'; 
    write(calc.acc);
    console.log(`입력이 없으면: ${calc.acc}`);
    // 누적값은 있고 입력은 없고, 'save +'이런식으로 되어 있지 않을때 
  } else {
    console.log(`입력이 있으면: ${calc.save}${calc.input}`);
    calc.acc =  eval(`${calc.save}${calc.input}`);
    calc.save = calc.acc + '+'; 
    console.log(calc.save);
    write(calc.acc);
  }
  calc.input = '';
});

// minus
document.querySelector('.op-minus').addEventListener('click', () => {
  if (calc.acc === '') {
    calc.save = calc.input + '-';  
    calc.acc = eval(calc.save.slice(0,  -1));
    console.log(`누적값이 없으면${calc.save}`);
    write(calc.acc);
    // 누적값이 있으면.
  } else if(calc.input === '' && !/\d/.test(calc.save.slice(-1))){
    calc.save = calc.save.slice(0,  -1) + '-'; 
    write(calc.acc);
    console.log(`입력이 없으면: ${calc.acc}`);
  }  else {
    console.log(`입력이 있으면: ${calc.save}${calc.input}`);
    calc.acc =  eval(`${calc.save}${calc.input}`);
    calc.save = calc.acc + '-'; 
    console.log(calc.save);
    write(calc.acc);
  }
  calc.input = '';
});

// multi
document.querySelector('.op-multi').addEventListener('click', () => {
  if (calc.acc === '') {
    calc.save = calc.input + '*';    
    calc.acc = eval(calc.save.slice(0,  -1));
    console.log(`누적값이 없으면${calc.save}`);
    write(calc.acc);
    // 누적값이 있으면.
  } else if(calc.input === '' && !/\d/.test(calc.save.slice(-1))){
    calc.save = calc.save.slice(0,  -1) + '*'; 
    write(calc.acc);
    console.log(`입력이 없으면: ${calc.acc}`);
  }  else {
    console.log(`입력이 있으면: ${calc.save}${calc.input}`);
    calc.acc =  eval(`${calc.save}${calc.input}`);
    calc.save = calc.acc + '*'; 
    console.log(calc.save);
    write(calc.acc);
  }
  calc.input = '';
});

// divide
document.querySelector('.op-divide').addEventListener('click', () => {
  if (calc.acc === '') {
    calc.save = calc.input + '/';    
    calc.acc = eval(calc.save.slice(0,  -1));
    console.log(`누적값이 없으면${calc.save}`);
    write(calc.acc);
    // 누적값이 있으면.
  } else if(calc.input === '' && !/\d/.test(calc.save.slice(-1))){
    calc.save = calc.save.slice(0,  -1) + '/'; 
    write(calc.acc);
    console.log(`입력이 없으면: ${calc.acc}`);
  }  else {
    console.log(`입력이 있으면: ${calc.save}${calc.input}`);
    calc.acc =  eval(`${calc.save}${calc.input}`);
    calc.save = calc.acc + '/'; 
    console.log(calc.save);
    write(calc.acc);
  }
  calc.input = '';
});
document.querySelector('.op-eql').addEventListener('click', () => {


});



// 임시 숫자 키패드
document.querySelector('.num-1').addEventListener('click', () => {
  calc.input += '1';
  write(calc.input);
});
document.querySelector('.num-2').addEventListener('click', () => {
  calc.input += '2';
  write(calc.input);
});
document.querySelector('.num-3').addEventListener('click', () => {
  calc.input += '3';
  write(calc.input);
});
document.querySelector('.num-4').addEventListener('click', () => {
  calc.input += '4';
  write(calc.input);
});
document.querySelector('.num-5').addEventListener('click', () => {
  calc.input += '5';
  write(calc.input);
});
document.querySelector('.num-6').addEventListener('click', () => {
  calc.input += '6';
  write(calc.input);
});
document.querySelector('.num-7').addEventListener('click', () => {
  calc.input += '7';
  write(calc.input);
});
document.querySelector('.num-0').addEventListener('click', () => {
  calc.input += '0';
  write(calc.input);
});