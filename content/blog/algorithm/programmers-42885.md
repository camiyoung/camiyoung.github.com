---
title: '[프로그래머스] 구명보트 c++ '
date: 2021-12-15 18:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🚤
---

# 구명보트

최대 탑승 인원 2명이고 무게 제한이 있는 구명보트를 사용하는 최소 개수를 구한다.

## 풀이 및 코드

### 풀이

주어진 배열을 정렬 후 투포인터 알고리즘으로 풀었다.
최대 몸무게 + 최소 몸무게가 보트의 limit을 넘는다면 최대 몸무게인 사람은 무조건 혼자 1개의 보트를 이용해야 한다.
한 보트에는 최대 2명까지만 탈 수 있기 때문에 2명이상이 되는 경우는 생각 할 필요 없다.

![](https://images.velog.io/images/anji00/post/d5cdcbbc-d0a4-454e-af02-83aa7fb855f1/image.png)

### 코드

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solution(vector<int> people, int limit) {
    int answer = 0;
    sort(people.rbegin(),people.rend());

    int start=0,end=people.size()-1;

    while(start<end){
        if(people[start]+people[end]<=limit)
        {
            end--;
        }

        answer++;
        start++;
    }
    if(start==end)// 남은 사람이 1명 있음
        answer++;
    return answer;
}
```

[문제 출처 : 프로그래머스 구명보트](https://programmers.co.kr/learn/courses/30/lessons/42885)
