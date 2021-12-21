---
title: '[프로그래머스] 순위 c++ '
date: 2021-12-18 13:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🥊
---

# 순위

선수의 경기 결과가 주어졌을 때 정확하게 순위를 매길 수 있는 선수의 수를 리턴하도록 하는 문제이다.

## 풀이 및 코드

### 풀이

플루이트 - 워샬 알고리즘을 응용하여 풀면 된다.
i->j 가 true이면 (i가 j를 이긴다면), j->k 일 때 (j가 k를 이길 때 ), i->k(i는 당연히 k를 이긴다 )이다. 이차원 배열에 i가 이길 수 있는 사람을 체크하면서 탐색한다. 최종 이차원 배열에서 i->j 이거나 j->i이면 i와j의 우선순위는 확인 되므로 카운트 1을 한다. 카운트가 n-1이 된다면 다른 모든 선수들과의 우선순위가 정해진것이므로 answer를 1증가한다.

### 코드

```cpp
#include <string>
#include <vector>
#include <unordered_map>
#include <iostream>
#include <algorithm>
using namespace std;
bool res[101][101];
int solution(int n, vector<vector<int>> results) {
   int answer=0;
    if(n==1)return 1;

    for(auto r:results){
        res[r[0]][r[1]]=true;

    }

    for(int k=1;k<=n;k++){
        for(int i=1;i<=n;i++){
            for(int j=1;j<=n;j++){
                if(res[i][k]&&res[k][j]){
                    res[i][j]=true;
                }
            }
        }
    }

    for(int i=1;i<=n;i++){
        int cnt=0;
        for(int j=1;j<=n;j++){
            if(res[i][j]||res[j][i]){
                cnt++;
            }
        }
        if(cnt==n-1) answer++;
    }
    return answer;
}
```

처음엔 삼중 포문의 변수 순서를 i,j,k로 진행 했다. 이렇게 되면
1->4->2 (1이 4를 통해서 2를 이김)인데, 추후 2->5->3(2가 5를 통해 3을 이김) 경로가 생성된다. 1은 2를 통해 5를 이길 수 있는데 다시 처음부터 반복문을 탐색하지 않으므로 갱신이 불가하다.

따라서 포문 변수의 순서를 k,i,j로 진행하도록 바꾸었다. 이렇게 되면 k 노드를 거쳐서 i->j를 갈 수 있는지를 판별하며, k 가 작은것부터 먼저 탐색하므로 추가되는 길을 놓치지 않는다.
