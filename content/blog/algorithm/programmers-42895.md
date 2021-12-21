---
title: '[프로그래머스] N으로 표현 c++ '
date: 2021-12-21 20:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 5️⃣
---

# 문제 제목

주어진 N을 몇 번 활용해서 주어진 number를 만들 수 있는지 찾는 문제이다. 표현할 수 있는 방법중 가장 최소 횟수를 리턴하고, 사칙연산만을 통해 연산한다.

## 풀이 및 코드

### 풀이

DP를 활용해서 푸는 문제이다. i회 사용해서 number를 만드는 방법은
1회 사용하여 수들 (사칙연산) i-1회 사용하여 만든 수
2회 사용하여 수들 (사칙연산) i-2회 사용하여 만든 수
...
i-1회 사용하여 수들 (사칙연산) 1회 사용하여 만든 수
들로 나타낼 수 있다.

N과 number가 같다면 1회로 나타낼 수 있으므로 1을 리턴하고, 8회 이내로 만들 수 없는 수는 -1을 리턴한다.

arr이라는 이차원 벡터를 생성하였고, arr[i]는 i회로 만들 수 있는 숫자를 넣었다.
사칙 연산 없이 연달아서 표현할 수 있는 수들도 있으므로 처음에 초기화 시켜준다. (5,55,555,5555...)

### 코드

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

int solution(int N, int number) {
    int answer = 0;
    vector<vector<int>> arr(9);
    if(N==number) return 1;
    arr[1].push_back(N);
    int num=N;
    for(int i=2;i<=8;i++){
        num=num*10+N;
        if(num==number)return i;
        arr[i].push_back(num);

    }

   for(int i=2;i<=8;i++){
       for(int j=1;j<i;j++){
           for(auto op1:arr[j]){
               for(auto op2:arr[i-j]){
                   arr[i].push_back(op1+op2);
                   arr[i].push_back(op1-op2);
                   arr[i].push_back(op1*op2);
                   if(op2!=0)
                    arr[i].push_back(op1/op2);
               }
           }
       }
        auto it = find(arr[i].begin(),arr[i].end(),number);
       if(it!=arr[i].end()) return i;
   }
    return -1;
}
```
