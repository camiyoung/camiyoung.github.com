---
title: '[프로그래머스] 네트워크 c++'
date: 2021-11-30 17:11:58
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 📡
---

level 3, DFS/BFS 카테고리의 문제이다.

---

# 네트워크

[문제 출처: 프로그래머스 네트워크](<[https://programmers.co.kr/learn/courses/30/lessons/43162](https://programmers.co.kr/learn/courses/30/lessons/43162)>)

연결된 노드는 하나의 집합으로 보고 몇개의 집합이 생기는지 찾는다고 생각하면 쉽다.

## 풀이 및 코드

DFS로 각 노드를 순회하면서 연결된 노드들을 모두 방문한다. 방문한 노드는 다시 방문하지 않도록 0으로 만든다.
한 노드에서 연결된 노드까지 모두 순회를 마치고 나면 답을 1 증가 시킨다.

연결 되지 않은 노드는 새롭게 탐색을 시작한다.

```cpp
#include <string>
#include <vector>

using namespace std;
vector<vector<int>> coms;
bool dfs(vector<vector<int>>&computers,int n){
    if(computers[n][n]==0) return false;
    computers[n][n]=0;
    for(int i=0;i<computers[0].size();i++){
        if(computers[n][i]==1) dfs(computers,i);
    }
    return true;
}

int solution(int n, vector<vector<int>> computers) {
    int answer = 0;
    coms=computers;
    for(int i=0;i<computers.size();i++){
        if(computers[i][i]&&dfs(computers,i)) answer++;
    }
    return answer;
}

```
