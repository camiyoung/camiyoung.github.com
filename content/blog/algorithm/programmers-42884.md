---
title: '[프로그래머스] 단속카메라 c++ '
date: 2021-12-17 20:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 📸
---

# 단속 카메라

단속 카메라를 최소한으로 설치하는 개수를 구하는 문제. 교집합이 생기는 개수대로 카메라를 설치하면 된다.

## 풀이 및 코드

### 풀이

수직선상에 진입,진출 시점이 표시되어있다고 생각하고 각각의 경로가 겹치는 부분이 있는지 체크한다. 진입 시점으로 오름차순으로 정렬하고 앞에서부터 하나씩 차례대로 찾는다.
첫 번째, 두번째 경로가 교집합이 생기지 않는다면 세번째 경로가 첫번째 경로랑 교집합이 생길 수 없다.
따라서 현재 교집합과 교집합이 생기지 않는 경로부터는 새롭게 교집합을 찾으면 된다.

### 코드

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solution(vector<vector<int>> routes) {
    int answer = 1;

    sort(routes.begin(),routes.end());
    vector<int> intersection={routes[0][0],routes[0][1]};

    for(auto r:routes){
        if(r[0]<=intersection[1]){
            intersection[0]=r[0];
            intersection[1]= r[1]<intersection[1]?r[1]:intersection[1];
        }else{
            answer++;
            intersection=r;
        }
    }

    return answer;
}
```

### 진출 시점으로 정렬하면 더 간단하게 작성 가능

진입 시점으로 정렬하면 계속해서 교집합의 시작,끝 위치를 수정해 주어야 한다.
그러나 진출 시점으로 정렬을 하게 된다면 진출 시점만 기록 해 두고 비교하면 된다.

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
bool cmp(vector<int> a,vector<int> b){
    return a[1]<b[1];
}
int solution(vector<vector<int>> routes) {
    int answer = 1;

    sort(routes.begin(),routes.end(),cmp);
    int limit=routes[0][1];

    for(auto r:routes){
        if(r[0]>limit){
            answer++;
            limit=r[1];
        }
    }

    return answer;
}
```
