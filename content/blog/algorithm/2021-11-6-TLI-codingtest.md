---
date: 2021-11-6 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 시저 암호'
---

Level 1 시저 암호 문제.

- [테스트 실패 이유](#테스트-실패-이유)
  - [오류 수정](#오류-수정)
- [최종 코드](#최종-코드)

---# 시저 암호

[문제 출처 : 프로그래머스 시저암호 ](https://programmers.co.kr/learn/courses/30/lessons/12926)
문자열 s와 정수 n이 주어진다. s의 각 자리를 n만큼 밀어낸 값의 결과를 리턴한다.
![](https://images.velog.io/images/anji00/post/b65f6dd7-6681-4397-baf6-d7bfa6dccb4c/image.png)
"AB",1 이 주어지면 A와 B를 각각 한칸씩 밀어낸 B와C를 문자열로 리턴한다.
문제 출처 : 프로그래머스 코딩 테스트 연습, https://programmers.co.kr/learn/challenges

각 문자열에 주어진 n을 더해주기만 하면 된다. n을 더한 결과 값이 z 혹은 Z를 넘어서면 26(알파벳의 개수)를 빼주면 된다.

## 테스트 실패 이유

주어진 예제 테스트 케이스는 모두 통과했는데 제출하니 몇개의 테스트 케이스를 통과하지 못했다.
![](https://images.velog.io/images/anji00/post/d26f94c1-3a3c-4bd3-afd8-960f5b2ce23a/image.png)

원인은 잘못된 자료형 사용이다. 다음과 같이 연산의 결과값을 char자료형에 담았다.

```c++
 char c;
        if(s[i]>='a'&&s[i]<='z'){
            c=s[i]+n;
            if(c>'z') c-=26;;
            s[i]=c;
```

char 자료형은 다음과 같이 1byte 자료형이고 표현할 수 있는 최대 정수 범위는 127이다.
![](https://images.velog.io/images/anji00/post/5f37eca0-73c1-4e0d-bd2a-03838efe4707/image.png)

'z'의 아스키 코드 값은 122 인데 여기서 n의 최대 범위 25를 더해주면 자료형 이상의 값이 들어가기 때문에 오류를 발생한다.

### 오류 수정

연산 결과 값을 int형 변수에 저장하고 그것을 다시 문자형으로 변환하니 문제 없이 통과되었다.

## 최종 코드

```c++
#include<bits/stdc++.h>
using namespace std;

string solution(string s, int n) {
    string answer = "";

    for(int i=0;i<s.size();i++){
    int c; // 연산 값을 담을 변수
        if(s[i]>='a'&&s[i]<='z'){
            c=s[i]+n;
            if(c>'z') c-=26;;
            s[i]=(char)c; //int형을 char로 변환.
        }else if(s[i]>='A'&&s[i]<='Z'){
            c=s[i]+n;
            if(c>'Z') c-=26;
            s[i]=(char)c;
        }
    }
    answer=s;
    return answer;
}
```

![](https://images.velog.io/images/anji00/post/f7e84ae6-04cf-477a-a2a6-7e79e2baf50e/image.png)

매우 쉬운 문제라고 생각했는데 예상치 못한 오류때문에 해결 시간이 오래 걸렸다.
앞으로는 자료형도 꼼꼼하게 체크해가면서 문제를 풀어야겠다.

참고로 대략적으로 자료형이 담을수 있는 최대 숫자를 계산 하는 방법은 아래와 같다.

char 자료형은 1byte 자료형인데 1byte는 8개의 bit를 나타낸다.
따라서 8개의 비트로 숫자를 나타내는데 각 비트는 0과 1만을 가지므로 n개의 비트가 주어진다면 2의 n승개의 숫자를 나타 낼 수 있다.
예를 들어 2비트로 나타낼 수 있는 숫자는 00,01,10,11 이렇게 네개가 되는데 이는 10진수로 0,1,2,3을 나타낸다. 모든 비트를 양의 값을 표현하는대로만 쓴다면 2비트의 최대 값은 3이 된다. (2^2-1)

그렇다면 char는 8bit 를 사용하는데 2^8-1인 255가 아니고 왜 127일까?
그 이유는 8비트중 1개의 비트는 부호를 나타내는데 사용한다. 그 말인 즉슨 부호를 사용하여 음수와 양수를 모두 나타낸다는 뜻이다. 따라서 1비트를 제외한 7개의 비트로 나타낼 수 있는 값의 최대값이 127이 된다.
