---
date: 2021-11-22 16:22:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 위장 c++'
emoji: 👕
---

해시를 사용한 문제

# 위장

[문제 출처 : 프로그래머스 위장](https://programmers.co.kr/learn/courses/30/lessons/42578)

한 종류의 카테고리에서 하나의 아이템만 착용할 수 있는 모든 경우의수를 찾으면 된다.

## 풀이 및 코드

한 카테고리내에서 선택하지 않는 경우도 있기 떄문에 카테고리의 아이템 개수 +1을 한 값으로 경우의수를 구한다. 모두 선택하지 않는 경우는 없으니 결과값은 경우의수 -1이 된다.

```cpp
#include<bits/stdc++.h>

using namespace std;

int solution(vector<vector<string>> clothes) {
    int answer = 1;
    unordered_map<string,int> hash;
    unordered_map<string,int> :: iterator it;

    for(int i=0;i<clothes.size();i++){
        hash[clothes[i][1]]++;
    }
    for(it=hash.begin();it!=hash.end();it++){
        hash[it->first]++;
        answer*=it->second;
    }
    answer--;
    return answer;
}
```
