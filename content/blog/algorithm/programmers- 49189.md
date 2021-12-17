---
title: '[프로그래머스] 가장 먼 노드 c++ '
date: 2021-12-17 23:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 📏
---

# 가장 먼 노드

1번 노드에서 가장 멀리 떨어진 노드의 개수를 구하는 문제이다. 가장 멀리 떨어진것은 1번을 루트인 트리로 보았을 떄 가장 말단 노드들의 개수를 구하는 것이다.

## 풀이 및 코드

### 풀이

bfs로 한 레벨씩 탐색하면 된다. 한 레벨의 탐색이 종료하기 전까지 그 이전,다음 레벨의 노드는 탐색되지 않는다. 따라서 모든 레벨 마다 해당 레벨의 노드들의 개수를 세어주고, 다음 레벨로 넘어가면 또 그 레벨의 개수를 세어준다. 가장 마지막 레벨의 노드를 마지막에 세어주게 되므로 count변수에 갖고있는 답이 해가 된다.

### 코드

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <queue>
using namespace std;

int solution(int n, vector<vector<int>> edge) {
    int max_level=0;
    vector<vector<int>> edges(n+1);
    vector<int> visited(n+1);
    queue<pair<int,int>> Q;

    for(auto e:edge){
        edges[e[0]].push_back(e[1]);
        edges[e[1]].push_back(e[0]);
    }

    Q.push(make_pair(1,1));
    visited[1]=1;

    int cnt=0;
    while(!Q.empty()){
        int node=Q.front().first;
        int level=Q.front().second;
        Q.pop();

       if(level>max_level){
           max_level=level;
           cnt=0;
       }
        cnt++;
        for(auto v:edges[node]){
            if(visited[v]==0){
                 Q.push(make_pair(v,level+1));
                visited[v]=1;
            }
        }
    }

    return cnt;
}
```
