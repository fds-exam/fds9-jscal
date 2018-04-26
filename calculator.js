// 아름다운 코드

// 화면에 보이는 숫자는 문자열로.
// 처음 숫자를 누르면 저장, 숫자 뒤 숫자를 누르면 문자열로 뒤에 추가.

// ac
// neg
// percent
// divide
// multi
// minus
// plus
// eql

const calc = {
  display: '',
  accCount: 0,
  beforeCount: 0,
  state: '',
  // common() {
  //   this.beforeCount = Number(this.display);
  //   this.accCount += Number(this.display);
  //   this.display = '';
  // },
  plus() {
    this.beforeCount = Number(this.display);
    this.accCount += Number(this.display);
    this.display = '';
    if(!this.display) {
      display.textContent = this.accCount + '';
    } else {
      this.accCount = (this.accCount + Number(this.display)) + '';
    }
    display.textContent = this.accCount;
  },
  minus() {
    this.beforeCount = Number(this.display);
    this.accCount -= Number(this.display);
    this.display = '';
    if(!this.display) {
      display.textContent = this.accCount + '';
    } else {
      this.accCount = (this.accCount - Number(this.display)) + '';
    }
    display.textContent = this.accCount;
  },
  // multi() {
  //   this.beforeCount = Number(this.display);
  //   this.accCount += Number(this.display);  // 3
  //   this.display = ''; // 0
  //   if(!this.display) {
  //     display.textContent = this.accCount + '';
  //   } else {
  //     this.accCount = (this.accCount * Number(this.display)) + '';
  //   }
  //   display.textContent = this.accCount;
  // },
  // divide() {
  //   this.beforeCount = Number(this.display);
  //   this.accCount += Number(this.display);  // 3
  //   this.display = ''; // 0
  //   if(!this.display) {
  //     display.textContent = this.accCount + '';
  //   } else {
  //     this.accCount = (this.accCount + Number(this.display)) + '';
  //   }
  //   display.textContent = this.accCount;
  // }
}

const display = document.querySelector('.display');

document.querySelectorAll('button').forEach(el => {
  el.addEventListener('click', (e) => {
    // 숫자를 문자열로 display
    if(e.target.classList[0].slice(0, 4) === 'num-') {
      if (e.target.classList[0].slice(4) === 'dot') {
        calc.display += !calc.display.includes('.') ? (!calc.display ? '0.' : '.') : '';
        display.textContent = calc.display;
      } else if (e.target.classList[0].slice(4) === '0' && calc.display === '') {
        display.textContent = '0';
      } else {
        calc.display += e.target.classList[0].slice(4);
        display.textContent = calc.display;
      }
    } 
  });
});

document.querySelectorAll('.op').forEach(el => {
  el.addEventListener('click', (e)=> {
    switch(e.target) {
      case document.querySelector('.op-ac'):
        calc.beforeCount = 0;
        calc.state = '';
        calc.display = '';
        calc.accCount = 0;
        display.textContent = calc.accCount;
        break;
      case document.querySelector('.op-plus'):
        calc.plus();
        calc.state = 'plus';
        break;
      case document.querySelector('.op-minus'):
        calc.minus();
        calc.state = 'minus';
        break;
      case document.querySelector('.op-eql'): 
        switch(calc.state) {
          case 'plus':
            calc.beforeCount = Number(calc.display);
            calc.accCount += calc.beforeCount;
            display.textContent = calc.accCount;
            break;
          case 'minus':
            calc.beforeCount = Number(calc.display);
            calc.accCount -= calc.beforeCount;
            display.textContent = calc.accCount;
            break;
          default:
            display.textContent = calc.accCount;
            break;
        }
        break; 
    }
  });
});
