---
title: '[프로그래머스] 여행 경로 '
date: 2021-11-30 17:11:65
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

DFS/BFS 문제.

# 여행 경로

[문제 출처: 프로그래머스 여행 경로](<[https://programmers.co.kr/learn/courses/30/lessons/43164](https://programmers.co.kr/learn/courses/30/lessons/43164)>)
출발지와 목적지가 적힌 티켓들이 주어진다. 모든 티켓들을 사용하도록 경로를 탐색한다.

## 풀이 및 코드

티켓 배열에서 출발지-목적지를 찾아서 각각 방문해보며 완전 탐색한다.
여행 경로가 여러개가 나온다면 오름차순으로 탐색한 경로를 답으로 출력해야 한다.
따라서 티켓 배열을 소팅한 후에 DFS로 경로를 찾는다.

```cpp
#include<bits/stdc++.h>

using namespace std;

int max_cnt=0;
void DFS(string depart,vector<vector<string>>& tickets,vector<bool>& visit,vector<string>& answer,vector<string>& tmp, int cnt){
    tmp.push_back(depart);
    if(max_cnt<cnt){
        max_cnt=cnt;
        answer=tmp;
    }
    for(int i=0;i<tickets.size();i++){
        if(depart==tickets[i][0] && !visit[i]){
            visit[i]=true;
            DFS(tickets[i][1],tickets,visit,answer,tmp,cnt+1);
            visit[i]=false;
        }
    }
    tmp.pop_back();
}

vector<string> solution(vector<vector<string>> tickets) {
   int cnt=0;
    vector<string> answer,tmp;
    vector<bool> visit(tickets.size(),false);
    sort(tickets.begin(),tickets.end());
    DFS("ICN",tickets,visit,answer,tmp,cnt);
    return answer;

}
```

주어진 티켓 배열을 하나씩 방문하면 되는데, 처음에는 map을 사용해서 이차원 배열을 만드려고 했다.
DFS/BFS문제를 많이 풀어보지 않아서 어떤 방법으로 접근해야 하는지 감이 잘 오지 않는다.
내일은 백준에서 DFS/BFS문제를 집중적으로 풀어봐야겠다.
