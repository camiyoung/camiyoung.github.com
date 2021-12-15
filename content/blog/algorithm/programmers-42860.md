---
title: '[프로그래머스] 조이스틱 c++ '
date: 2021-12-14 18:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🕹
---

# 조이스틱

주어진 문자열을 만들수 있는 최소한의 연산 횟수를 구하는 문제

## 풀이 및 코드

### 풀이

- 상하로 움직여서 알파벳을 변경하는 횟수
- 좌우로 자리를 이동하는 횟수

두가지를 더해주면 총 움직인 횟수가 된다.

상하 움직임의 최소 횟수를 구하는것은 간단하게 기준을 A, Z로 정해서 횟수를 구하고 최소를 구하면 된다.
좌우로 이동하는 경우는

- 한 방향으로 순차적으로 가는 경우
- 연속 A를 기점으로 왼쪽을 연산 후 문자열 맨 끝으로 이동하는 경우, 이후 연속 A기점 오른쪽을 연산
- 연속 A를 기점으로 오른쪽을 연산 후 문자열 맨 처음으로 돌아가는 경우, 이후 연속 A기점 왼쪽을 연산
  이렇게 3가지 경우 중 이동 횟수가 최소인 것을 구하면 된다.

- 순차적으로 가는 경우 : 문자열 길이 -1
- 왼쪽 연산후 오른쪽 : 왼쪽 길이 + 왼쪽 길이 + 오른쪽 길이
- 오른쪽 연산 후 왼쪽 : 오른쪽 + 왼쪽 + 왼쪽

### 코드

```cpp
#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;
int solution(string name) {
    int answer=0;
    int move=name.length()-1;
    for(int i=0;i<name.length();i++){
        if(name[i]=='A'){
            int idx=i;
            while(i<name.length()&&name[idx]=='A'){
                idx++;
            }
            int moveLeft= i==0?0:i-1;
            int moveRight=name.length()-idx;
            move=min(move,moveLeft+moveRight+min(moveLeft,moveRight));
        }
    }
    answer+=move;
    for(auto c:name){
        answer+=min(c-'A','Z'-c+1);
    }
    return answer;

}
```
