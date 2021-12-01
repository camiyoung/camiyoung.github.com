---
title: '[백준] 2583 영역구하기'
date: 2021-12-1 09:30:33
category: 'algorithm'
thumbnail: { thumbnailSrc }
draft: false
emoji: 🗺
---

# 2583 영역 구하기

모눈 종이에 주어진 좌표를 이용해 사각형을 그리고 분리된 영역의 개수와 각 영역의 크기를 구한다.

## 풀이 및 코드

모눈종이 크기만큼 2차원 배열을 생성한다. 사각형의 영역에는 1을 아닌 곳은 0을 할당한다.
모눈종이를 처음부터 끝까지 탐색하면서 0인곳을 찾는다.
0인곳 부터 BFS로 0의 영역을 구한다. 이때 하나씩 탐색하며 방문한 칸은 1로 만들어 다시 방문할 일이 없도록 한다.
BFS가 끝나면 해당 영역 탐색이 끝난것이므로 영역의 크기를 배열에 넣는다.
모든 탐색이 끝나면 크기들이 담긴 배열을 정렬하고 오름차순으로 출력한다.

x와 y의 좌표가 평소 프로그래밍하던 방식과 반대라서 주어진 좌표로 배열을 생성하면 90도 돌아간 그림이 되지만 영역의 크기만 구하면 되므로 문제는 없다.

```cpp
#include<bits/stdc++.h>
using namespace std;
int m[101][101];
int dx[4]={1,-1,0,0};
int dy[4]={0,0,-1,1};
int main(){
	ios_base::sync_with_stdio(false);
	// freopen("./input.txt", "rt", stdin);
	queue<pair<int,int> > Q;
	vector<int> res;
	int N,M,K;
	cin>>M>>N>>K;

	for(int i=0;i<K;i++){
		int x1,y1,x2,y2;
		cin>>x1>>y1>>x2>>y2;
		for(int x=x1;x<x2;x++){
			for(int y=y1;y<y2;y++){
				m[x][y]=1;
			}
		}
	}
	for(int i=0;i<N;i++){
		for(int j=0;j<M;j++){
			if(m[i][j]==0){
				int cnt=0;
				Q.push(make_pair(i,j));
				m[i][j]=1;
				cnt++;
				while(!Q.empty()){
					pair<int,int> now(Q.front());
					Q.pop();
					for(int k=0;k<4;k++){
						int x=now.first+dx[k];
						int y=now.second+dy[k];
						if(x<0 || x>=N || y<0||y>=M) continue;
						if(m[x][y]==0){
							Q.push(make_pair(x,y));
							cnt++;
							m[x][y]=1;
						}
					}
				}
				res.push_back(cnt);
			}
		}
	}

	sort(res.begin(),res.end());
	cout<<res.size()<<endl;
	for(auto& r:res){
		cout<<r<<" ";
	}

	return 0;
}
```
