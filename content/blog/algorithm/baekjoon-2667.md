---
title: '[백준] 2667 단지번호 붙이기'
date: 2021-12-1 10:50:33
category: 'algorithm'
thumbnail: { thumbnailSrc }
draft: false
emoji: 🏡
---

# 2667 - 단지번호붙이기

바로 이전의 영역 구하기와 아주 유사하다. 집이 있는 영역들마다 1부터 단지 번호를 붙여준다.
![](https://images.velog.io/images/anji00/post/7175de2b-fa75-4c71-9802-93bbdd0ebb20/image.png)
1끼리 붙어있는 곳의 영역을 찾으면 된다.

## 풀이 및 코드

영역 구하기와 거의 같은 문제이므로 BFS를 이용한다.
주의할점은 입력 받을 때 숫자마다 구분자가 없으므로 string으로 받아야 한다.

N의 최댓값이 25인데 unsigned long long도 최대 25자리를 만들 수 없기 때문이다.
string으로 받아서 각 string을 하나씩 떼어가며 int배열을 만들었는데 다시 보니 굳이 이렇게 int배열을 생성할 필요 없이 바로 `str[i][j]`와 같이 참조하면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
int m[30][30];
int dx[4]={1,-1,0,0};
int dy[4]={0,0,-1,1};
int main(){
	ios_base::sync_with_stdio(false);
	queue<pair<int,int> > Q;

	vector<int> res;
	int N;
	cin>>N;
	vector<string> inputs(N+1);

	for(int i=0;i<N;i++){
		cin>>inputs[i];
	}
	for(int i=0;i<N;i++){
		string tmp=inputs[i];
		for(int j=N-1;j>=0;j--){
			m[i][j]=tmp[j]-'0';
		}
	}


	vector<int> addr_nums;
	for(int i=0;i<N;i++){
		for(int j=0;j<N;j++){
			if(m[i][j]==1){
				int cnt=0;
				Q.push(make_pair(i,j));
				m[i][j]=0;
				cnt++;
				while(!Q.empty()){
					pair<int,int> now(Q.front());
					Q.pop();
					for(int k=0;k<4;k++){
						int x=now.first+dx[k];
						int y=now.second+dy[k];
						if(x<0 || x>=N || y<0||y>=N) continue;
						if(m[x][y]==1){
							Q.push(make_pair(x,y));
							cnt++;
							m[x][y]=0;
						}
					}
				}

				addr_nums.push_back(cnt);
			}
		}
	}
	cout<<addr_nums.size()<<endl;
	sort(addr_nums.begin(),addr_nums.end());
	for(auto& num:addr_nums){
		cout<<num<<endl;
	}
	return 0;
}
```
