const display = document.querySelector('.display');
function write(str) {
  display.textContent = str;
}
const calc = {
  input: '', // 입력 문자열
  acc: '', // 누적 문자열
  save: '', // 계속되는 계산을 위한 저장 표현식
  temp_input: '',
  temp_save: '',
  temp_percent: '',
};

// ac 모든 계산값이 초기화
document.querySelector('.op-ac').addEventListener('click', () => {
  calc.input = '';
  calc.acc = '';
  calc.save = '';
  calc.temp_input = '';
  calc.temp_save = '';
  write('0');
});

// neg 
document.querySelector('.op-neg').addEventListener('click', () => {
  if(calc.input === '') {
    calc.input = '-';
    write(calc.input + '0');
  } else {
    calc.input = calc.input * -1;
    write(calc.input);
  }
});

// percent
// document.querySelector('.op-percent').addEventListener('click', () => {
//   if(calc.input === '') {
//     // calc.acc = eval(calc.acc + calc.save.slice(0, -1)) * (1 / 100);
//     // calc.input = calc.temp_input * (1 / 100);
//     // write(calc.acc);
//     console.log(`입력이 없으면 acc: ${calc.acc} input: ${calc.input} save: ${calc.save}`);
//   } else {
//     calc.temp_input = calc.input * (1 / 100)
//     write(calc.temp_input);
//     console.log(`입력이 있으면 acc: ${calc.acc} input: ${calc.input} save: ${calc.save}`);
//     calc.input = '';
//   }
// });

// plus
document.querySelector('.op-plus').addEventListener('click', () => {
  // 입력이 없을때
  // 입력, calc.acc 뒤에 연산자 있을때
  calc.acc = calc.acc + calc.save;
  calc.temp_save = calc.save; 
  console.log(`temp save: ${calc.temp_save}`);
  calc.save = '';
  if (calc.input !== '') {
    calc.acc += calc.input + '+';
  } else {
    // if(calc.temp_input === '') {
      calc.acc = calc.acc.slice(0, -1) + '+';
    // } else {
    //   console.log(`temp_input 동작 이상할 수 있음`);
    //   calc.acc += calc.temp_input + '+';
    // }
  };
  console.log(`minus plus : ${calc.acc}`);
  write(eval(calc.acc.slice(0, -1)));
  calc.temp_input = calc.input;
  calc.input = '';

});

// minus
document.querySelector('.op-minus').addEventListener('click', () => {
  calc.acc = calc.acc + calc.save;
  calc.temp_save = calc.save; 
  console.log(`temp save: ${calc.temp_save}`);
  calc.save = '';
  if (calc.input === '') {
    calc.acc = calc.acc.slice(0, -1) + '-'
  } else {
    calc.acc += calc.input + '-';
  };
  console.log(`minus acc : ${calc.acc}`);
  write(eval(calc.acc.slice(0, -1)));
  calc.temp_input = calc.input;
  calc.input = '';

});

// multi
document.querySelector('.op-multi').addEventListener('click', () => {
  if (calc.input === '' && calc.save) {
    console.log('boo');
    calc.temp_save = '';
    calc.save = calc.save.slice(0, -1) + '*';
    console.log(`calc.save: ${calc.save}, calc.acc: ${calc.acc}`);
  } else if (calc.input === '' && !calc.save) {
    console.log('yoo');
    if (calc.temp_save !== '') {
      console.log(`temp save: ${calc.temp_save}`);
      console.log(calc.acc.substr(0, calc.acc.length - calc.temp_save.length - calc.temp_input.length - 1));
      calc.acc = calc.acc.substr(0, calc.acc.length - calc.temp_save.length - calc.temp_input.length - 1);
      calc.save = calc.temp_save + calc.temp_input + '*';
    } else {
      console.log(calc.acc.substr(0, calc.acc.length - calc.temp_input.length - 1));
      calc.acc = calc.acc.substr(0, calc.acc.length - calc.temp_input.length - 1);
      calc.save = calc.temp_input + '*';  
    }
    // calc.save = calc.acc.slice(0, -1) + '*';
    console.log(`calc.save: ${calc.save}, calc.acc: ${calc.acc}`);
  } else {
    console.log('foo');
    calc.temp_save = '';
    calc.save += calc.input + '*'; 
    console.log(`calc.save: ${calc.save}, calc.acc: ${calc.acc}`);
  };
  // calc.acc = calc.acc + calc.save;
  write(eval(calc.save.slice(0, -1)));
  calc.temp_input = calc.input;
  calc.input = '';
});

// divide
document.querySelector('.op-divide').addEventListener('click', () => {
  if (calc.input === '' && calc.save) {
    console.log('boo');
    calc.temp_save = '';
    calc.save = calc.save.slice(0, -1) + '/';
    console.log(`calc.save: ${calc.save}, calc.acc: ${calc.acc}`);
  } else if (calc.input === '' && !calc.save) {
    console.log('yoo');
    if (calc.temp_save !== '') {
      console.log(`temp save: ${calc.temp_save}`);
      console.log(calc.acc.substr(0, calc.acc.length - calc.temp_save.length - calc.temp_input.length - 1));
      calc.acc = calc.acc.substr(0, calc.acc.length - calc.temp_save.length - calc.temp_input.length - 1);
      calc.save = calc.temp_save + calc.temp_input + '/';
    } else {
      console.log(calc.acc.substr(0, calc.acc.length - calc.temp_input.length - 1));
      calc.acc = calc.acc.substr(0, calc.acc.length - calc.temp_input.length - 1);
      calc.save = calc.temp_input + '/';  
    }
    // calc.save = calc.acc.slice(0, -1) + '/';
    console.log(`calc.save: ${calc.save}, calc.acc: ${calc.acc}`);
  } else {
    console.log('foo');
    calc.temp_save = '';
    calc.save += calc.input + '/'; 
    console.log(`calc.save: ${calc.save}, calc.acc: ${calc.acc}`);
  };
  // calc.acc = calc.acc + calc.save;
  write(eval(calc.save.slice(0, -1)));
  calc.temp_input = calc.input;
  calc.input = '';
});
document.querySelector('.op-percent').addEventListener('click', () => {
  if (calc.input === '' && calc.temp_save) {
    console.log('poo');
    calc.temp_save = eval(calc.temp_save) * (1/100);
    write(eval(calc.temp_save));
  } else if (calc.input === '' && !/\d/.test((calc.acc + calc.save).slice(-1))) {
    console.log('boo');
    calc.temp_save = eval(calc.save.slice(0, -1)) * (1/100);
    write(eval(calc.temp_save));
    console.log(`calc.save: ${calc.save}, calc.acc: ${calc.acc}`);
  } else {
    if(calc.input !== '') {
      console.log('koo');
      calc.temp_input = calc.input;
      calc.temp_precent = calc.save;
    } 
    console.log('joo', calc.temp_precent);
    calc.temp_input = calc.temp_input * (1 / 100);
    calc.save = calc.save.substr(0, calc.temp_precent.length) + calc.temp_input;
    console.log(calc.temp_input, calc.temp_precent);
    write(calc.temp_input);
    console.log(`입력이 있으면 acc: ${calc.acc} input: ${calc.input} save: ${calc.save}`);
    calc.input = '';
  };
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