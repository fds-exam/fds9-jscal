# FDS9 Javascript Calculator

프론트엔드개발스쿨 9 기 자바스크립트 계산기 만들기 실습용 저장소 입니다.

| 일자 | 수정 내용 |
| --- | ---- |
| 180428 | 윈도우 계산기처럼 `2 + 2 * 3` 이런 연산에서 순서대로 `2 + 2`, `4 * 3`으로 계산되어 결과값이 `12`가 나오게 만들었는데 아이폰에서는 `2 + 2 * 3`의 경우 중간에 출력되는 값(`4`) 없이 연산 우선순위대로 `2 + (2 * 3)`으로 연산을 수행해 `8`이 결과값으로 나오는 걸 확인해서 다시 수정해야 함...(목표는 아이폰 계산기처럼 동작이었으므로...) |

## 테스트

아이폰 계산기의 최대 표기 가능 수는 억단위 임   
소수점 입력 가능한 자리수도 `0.00000001`까지

`%`버튼을 계속 누르면 `0.00000001`이하로는 지수 표기법으로 변환 됨
+ [`numObj.toExponential()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential)
```js
(0.0000000001).toExponential();
// "1e-10"
```

화면에 결과 출력할 때 세자리 수에 `,` 출력하는 부분 
```js
function write(str) {
	const acc = '' + eval(str);
	return [...acc].reduce((acc, item, index, arr) => index % 3 === (arr.length % 3) && index !== 0 ? acc + ',' + item : acc + item, '');
}
write('3 * (10 ** 9)')
// "3,000,000,000"

write('3 * (10 ** 8)')
// "300,000,000"
```