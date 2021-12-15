---
date: 2021-11-19 16:23:13
category: 'algorithm'
draft: true
title: '[프로그래머스] 거리두기 확인하기 c++'
emoji: 😷
---

# 거리두기 확인하기

[문제 출처 : 프로그래머스 거리두기 확인하기](https://programmers.co.kr/learn/courses/30/lessons/81302)

2차원 배열 내애서 주어진 조건을 만족 하는지 탐색하는 문제이다.

## 풀이 및 코드

배열을 순서대로 탐색 하면서 응시자 (O)가 나오면 그 지점부터 맨해튼 거리 2가 되는 곳 까지 dfs로 탐색한다. 맨해튼 거리 내에 다른 응시자가 있으면 거리두기를 지키고 있지 않고있으므로 0을 담는다.
파티션이 있으면 맨패튼 거리가 2여도 거리두기를 지킨 것이다.
따라서 bfs의 종료 조건은 시작점에서 2칸 이동과 파티션이 있을 경우이다.

```cpp
#include <bits/stdc++.h>
using namespace std;

bool flag;
bool visited[5][5];
const int dy[]={-1,1,0,0};
const int dx[]={0,0,-1,1};

bool inRange(int y, int x){
    return y>=0 && y<5 && x>=0 &&x<5;
}

void dfs(int y, int x, vector<string>& board, int depth){
    if(flag||depth>2) return ;

    if(depth>0 && board[y][x]=='P'){
        flag=true;
        return;
    }
    visited[y][x]=true;
    for(int i=0;i<4;i++){
        int ny=y+dy[i];
        int nx=x+dx[i];
        if(!inRange(ny,nx)||visited[ny][nx]||board[ny][nx]=='X') continue;
        dfs(ny,nx,board,depth+1);
    }
}
bool solve (vector<string>& board){
    vector<pair<int,int>> people;
    for(int i=0;i<board.size();i++)
        for(int j=0;j<board[i].size();j++)
            if(board[i][j]=='P') people.push_back({i,j});
    for(auto pii:people){
        flag=false;
        memset(visited,false,sizeof(visited));
        dfs(pii.first,pii.second,board,0);
        if(flag) return false;
    }
    return true;
}

vector<int> solution(vector<vector<string>> places) {
    vector<int> answer;
    for(auto b:places){
        if(solve(b)) answer.push_back(1);
        else answer.push_back(0);
    }
    return answer;
}
```

함수의 분리가 잘 된 다른 사람의 코드이다.
