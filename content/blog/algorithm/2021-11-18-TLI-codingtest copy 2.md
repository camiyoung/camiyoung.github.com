---
date: 2021-11-17 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 숫자의 표현 c++'
emoji: 🔢
---

# 숫자의 표현

[문제 출처 : 프로그래머스/숫자의 표현](https://programmers.co.kr/learn/courses/30/lessons/12924)

주어진 수를 연속된 자연수의 합으로 나타낼 수 있는 가지수를 구한다.

## 풀이 및 코드

연속해서 더해지는 자연수들중 가장 처음(작은) 수를 a라고 한다면

- 연속한 2자리 더하기
  - a+(a+1)=15 ⇒ 2a=14
  - a= 7일때 7+8=15
- 연속한 3자리
  - a+(a+1)+(a+2)=15 ⇒ 3a=12
  - a=4 일때 4+5+6 =15
- 연속한 4자리
  - a+(a+1)+(a+2)+(a+4)=15 ⇒ 4a=9
  - a=2.xxx 자연수가 아니므로 4자리로는 만들 수 없음.
- 연속한 5자리
  - a+(a+1)+(a+2)+(a+4)+(a+5)=15 ⇒ 5a=5
  - a=1 일때 1+2+3+4+5=15

따라서 n= n-(더할 수의 개수) 의 양상으로 감소하고, n%(더할 수의 개수)==0 이면 시작하는 수a를 구할 수 있으므로 더할 수의 개수로 연속된 자연수들로 표현 할 수 있다.

```cpp
#include <string>
#include <vector>
#include <iostream>
using namespace std;

int solution(int n) {
    int answer = 1; // n=n
    int num=2; //2자리로 되는지 부터 시작.
    n--;
    while(n>0){
        if(n%num==0)answer++;
        n-=num;
        num++;
    }
    return answer;
}
```
