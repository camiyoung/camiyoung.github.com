---
date: 2021-11-15 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 멀쩡한 사각형, 124 나라의 숫자 '
emoji: 📅
---

Level 2 문제

- [멀쩡한 사각형](#멀쩡한-사각형)
  - [풀이](#풀이)
  - [최종 코드](#최종-코드)
- [124 나라의 숫자](#124-나라의-숫자)
  - [풀이 코드](#풀이-코드)

---

# 멀쩡한 사각형

[문제 출처 : 프로그래머스 베스트앨범](https://programmers.co.kr/learn/courses/30/lessons/62048)

직사각형의 가로, 세로 길이가 주어진다. 직사각형의 대각선 꼭짓점을 이어서 직선을 긋는다. 직선이 침범하지 않는 1x1사각형을 멀쩡한 사각형이라고 할 때 멀쩡한 사각형의 개수를 구한다.

- 처음 예제를 설명하는 그림을 보고 생각한 풀이
  - y절편이 h이고 x절편이 w인 직선을 만든다. x=0,1일 때 y의 값의 차이를 구하고 그 값이 직선이 지나가는 사각형의 숫자라고 생각했다.

그런데..
아래 그림 처럼 그림을 조금만 확장 시켜 본다면 이 방식이 잘못되었다는 것을 알 수 있다.

따라서 그림만 보고 추측하는것이 아닌 (이건 가설에 가깝지..), 타당한 규칙을 찾아야 했다.

규칙을 찾아 프로그래밍을 해야 하는데 자꾸 직관적인 '느낌'에 의존하려는 습관이 있다.
효율적으로 풀이를 하려면 항상 논리적인 사고로 규칙을 찾아야 함을 깨달은 문제.

## 풀이

→ w,h가 최대 공약수가 1인 경우는 w+h-1개의 사각형이 제거된다. (가로로 이동+세로이동-중복1)

→ w,h의 최대 공약수가 1이 넘는다면 (w+h-1)\*최대 공약수를 해 주면 된다.

최대공약수가 있다면 (w/g,h/g)좌표마다 계속 반복되는 형상이기 때문.

## 최종 코드

```cpp
#include <bits/stdc++.h>
using namespace std;

int gcd(int a,int b){
	int c;
	while(b!=0)
	{
		c=a%b;
		a=b;
		b=c;
	}
	return a;
}

long long solution(int w,int h) {
    long long answer ;
    answer=(double)w*(double)h;

    int g=gcd(w,h);

    long long num=w+h-g;
    answer-=num;
    return answer;

}
```

---

# 124 나라의 숫자

[문제 출처 : 프로그래머스 124나라의 숫자](https://programmers.co.kr/learn/courses/30/lessons/12899);

주어진 정수를 124만 사용해서 숫자를 나타낸다.

하나씩 해 보면서 반복되는 규칙을 찾을 수 있다.
n을 3으로 나눈 나머지가 가장 마지막의 숫자가 된다.
3으로 나눈 몫을 계속 3으로 나누어 주면서 차례로 앞자리로 붙여주면 된다.
이 때 나머지가 3이라면 4로 대치한다.
또한 나머지가 0으로 나누어 떨어지면 -1한 값을 3으로 나눈 몫을 변환한 값을 사용한다.

예시
n=4인 경우
4%3 = 1 이므로 가장 마지막 숫자는 1 -> answer=1
4/3= 1이고 1은 124나라 숫자 규칙으로 변환하면 1이 된다. 이값을 앞자리에 넣는다. answer= 1 + 1 = 11

n=12 인 경우
12%3 =0 , answer= 4
나머지가 0이므로
(12-1=11)/3 = 3이다. 3을 124나라 규칙으로 변환하면 4이므로 이걸 맨 앞자리에 넣어주면 answer=44

## 풀이 코드

```cpp
#include <string>
#include <vector>

using namespace std;
string solution(int n) {
    string answer = "";
    while(n>3){
      int tmp=n%3;
        if(tmp==0) tmp=4;
        answer.insert(0,to_string(tmp));
        if(n%3==0) n=(n-1)/3;
        else n=n/3;
    }
    if(n==3) answer.insert(0,to_string(4));
    else answer.insert(0,to_string(n));

    return answer;
}
```
