const display = document.querySelector('.display');
// 화면에 입력하는 함수
function write(str) {
  display.textContent = str;
}
// 계산 관련
const calc = {
  input: '', // 입력 문자열
  acc: '', // 누적 문자열
  save: '', // 계속되는 계산을 위한 저장 문자열
  temp_input: '',
  temp_save: '',
  temp_percent: '',
};
/*
 * calc.save는 아이폰 계산기에서 연속되는 입력에는 연산자 속성이 바뀔경우 중간 출력되는 경우를 위함
 * calc.save의 저장은 곱셈, 나눗셈 연산에서만 이뤄짐
 */

// 덧셈과 뺄샘 연산
function calcPlusMinus(op) {
  // 2 + 2 +   3 * 2
  calc.acc = calc.acc + calc.save;
  // 연산자가 재입력되어 바뀔 경우를 위해 calc.save는 임시로 저장하고 비운다.
  calc.temp_save = calc.save; 
  calc.save = '';
  // 만약 입력이 있으면
  if (calc.input !== '') {
    // 입력에 연산자를 더한 문자열은 누적 문자열로 한다.
    calc.acc += calc.input + op;
    // 입력된 숫자는 뒤의 연산자가 바뀔경우를 위해 임시로 저장하고 비운다.
    calc.temp_input = calc.input;
    calc.input = '';
  } else {
    // 만약 없으면 마지막에 더해진 연산자를 제거하고 새로운 연산자를 추가 
    calc.acc = calc.acc.slice(0, -1) + op;
  };
  // 연산자를 빼고 누적 결과의 연산된 결과를 출력한다.
  write(eval(calc.acc.slice(0, -1)));
  console.log(`덧셈 뺄셈의 누적 결과: ${calc.acc}`);
}

// 곱셈과 나눗셈 연산
function calcMultiDivide(op) {
  if (calc.input === '' && calc.save) {
    // 입력은 없고 calc.save가 남아있는 경우 (이전에 입력한 연산이 *나 /)
    // 저장된 calc.save가 우선하므로 임시 save는 지운다.
    // 연산자를 교체한다.
    calc.temp_save = '';
    calc.save = calc.save.slice(0, -1) + op;
  } else if (calc.input === '' && !calc.save) {
    // 입력은 없고, 저장된 calc.save도 없는경우(이전에 연산이 +나 -)
    if (calc.temp_save !== '') {
      // 임시로 저장된 temp_save가 있다는 것은 
      // 예를들어 그 전 문자열이 `2 * 3 +`인경우 `2 *`이 문자열이 저장되어 있음 
      // 누적 문자열에서 그 전에 계산처리된 부분 제거하고 저장 문자열을 연산자를 바꿔 교체
      calc.acc = calc.acc.substr(0, calc.acc.length - calc.temp_save.length - calc.temp_input.length - 1);
      calc.save = calc.temp_save + calc.temp_input + op;
    } else {
      // 임시로 저장된 temp_save가 없고 임시 저장한 temp_input은 있는경우
      // 예를들어 그 전 문자열이 `33 +`인 경우 `33`이 저장되어 있음
      // 누적 문자열에서 그 전에 계산처리된 부분 제거하고 저장 문자열에 새로 담는다.
      calc.acc = calc.acc.substr(0, calc.acc.length - calc.temp_input.length - 1);
      calc.save = calc.temp_input + op;  
    }
  } else {
    // 입력이 있는 경우
    // 임시 저장된 temp_save는 지우고 save에 입력과 연산을 계속 저장한다.
    calc.temp_save = '';
    calc.save += calc.input + op; 
    calc.temp_input = calc.input;
    calc.input = '';
  };
  // 연산자를 지우고 임시 저장된 save 값의 연산 결과를 보여줌
  write(eval(calc.save.slice(0, -1)));
  console.log(`곱셈과 나눗셈의 누적 결과: ${calc.acc} 와 저장 문자열: ${calc.save}`);
}

document.querySelectorAll('[class*="op"]').forEach(item => {
  item.addEventListener('click', e => {
    const itemClass = item.classList;
    if(itemClass.contains('op-plus')) {
      calcPlusMinus('+');
    } else if (itemClass.contains('op-minus')) {
      calcPlusMinus('-');
    } else if (itemClass.contains('op-multi')) {
      calcMultiDivide('*');
    } else if (itemClass.contains('op-divide')) {
      calcMultiDivide('%');
    } else if (itemClass.contains('op-neg')) {
      if(calc.input === '') {
        calc.input = '-';
        write(calc.input + '0');
      } else {
        calc.input = calc.input * -1;
        write(calc.input);
      }
    } else if (itemClass.contains('op-ac')) {
      calc.input = '';
      calc.acc = '';
      calc.save = '';
      calc.temp_input = '';
      calc.temp_save = '';
      write('0');
    } else if (itemClass.contains('op-eql')) {
      if (calc.input === '' && calc.save !== '') {
        // if(calc.temp_save === '') {
        //   calc.acc = calc.save + calc.save;
        //   calc.temp_save = calc.save;
        //   calc.save = '';
        // } else {
        //   calc.acc += calc.temp_save;
        // }
        write(eval(calc.acc.slice(0, -1)));
      } else if (calc.input === '' && calc.save === '') {
        calc.acc += calc.temp_input + calc.acc.slice(-1);
      }
      console.log(`= 결과: ${calc.acc} 와 저장 문자열: ${calc.save}`);
    }
  });
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

// 숫자 키패드
document.querySelectorAll('[class^="num-"]').forEach(el => {
  el.addEventListener('click', e => {
    const num = el.classList[0].slice(4);
    if ( num === 'dot') {
      calc.input += calc.input === '' ? '0.' : '.';
      write(calc.input);
    } else {
      calc.input += num;
      write(calc.input);
    }
  });
});