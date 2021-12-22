---
title: '[프로그래머스] 등굣길 c++ '
date: 2021-12-22 16:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🏫
---

# 등굣길

집부터 학교까지 갈 수 있는 최단 거리를 구하는 문제. 이동 방향은 오른쪽과 아래쪽으로만 가능하다.

## 풀이 및 코드

### 풀이

dp를 사용하는 문제. 해당 좌표로 올 수 있는 경우의 수는 좌표의 왼쪽 값 + 윗쪽 값 이다. 왼쪽과 위로 되돌아올 수는 없기 때문에 간단하다.

제출후 오류가 두번 발생했다.

1. 장애물의 좌표가 (컬럼,행)으로 주어졌는데 순서를 바꾸어서 장애물을 체크해서 생긴 오류
2. 모듈러 연산을 최종 값에만 해줬는데 각 좌표의 값마다 해 주어야 한다(솔직히 문제가 애매하게 서술되어있다고 생각한다.)

### 코드

```cpp
#include<vector>
#include<iostream>
using namespace std;
int dx[2]={0,-1};
int dy[2]={-1,0};
int arr[101][101];
int solution(int m, int n, vector<vector<int>> puddles) {
    int answer = 0;

    for(auto p:puddles){
        arr[p[1]][p[0]]=-1;
    }
    arr[1][1]=1;


    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(arr[i][j]==-1) continue;
            for(int k=0;k<2;k++){

                int x=i+dx[k];
                int y=j+dy[k];

                if(arr[x][y]<0) continue;

                arr[i][j]+=arr[x][y];

            }
               arr[i][j]%=1000000007;
        }

    }


    answer=arr[n][m];
    return answer;
}

```
