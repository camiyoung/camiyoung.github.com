---
title: '[백준] 1759 암호 만들기'
date: 2021-12-1 09:30:33
category: 'algorithm'
thumbnail: { thumbnailSrc }
draft: false
emoji: 🔒
---

# 백준 1759 - 암호 만들기

[문제 출처 : 백준 1759 ](https://www.acmicpc.net/problem/1759)

주어진 알파벳들로 조건에 맞는 암호를 생성하는 문제
조건: 완성된 암호가 오름차순으로 나타나도록 생성해야 한다.
abc는 가능하지만 bac는 불가.

## 풀이 및 코드

DFS로 알파벳을 하나씩 추가하며 주어진 길이에 도달하면 출력한다.
알파벳들을 미리 정렬 하고 현재 길이와 현재의 알파벳을 dfs함수에 넘겨준다.
현재 알파벳 값보다 뒤에 있는 알파벳들만 추가로 붙일 수 있게 한다.

```cpp
#include<bits/stdc++.h>
using namespace std;
string str;
int L,C;
char mm[5]={'a','e','i','o','u'};
string tmp;
void dfs(int len,int position){
	if(len>=L){
		int mm_cnt=0;
			for(int i=0;i<L;i++){
				if (tmp[i] == 'a' || tmp[i] == 'e' || tmp[i] == 'i'
				|| tmp[i] == 'o' || tmp[i] == 'u'){
				mm_cnt++;
			}
			}
		if(mm_cnt>=1 && tmp.size()-mm_cnt>=2){
			cout<<tmp<<endl;
		}

		return;
	}
	for(int i=position;i<C;i++){
			tmp.push_back(str[i]);
			dfs(len+1,i+1);
			tmp.pop_back();
	}
}
int main(){
	ios_base::sync_with_stdio(false);

	cin>>L>>C;
	for(int i=0;i<C;i++){
		char tmp;
		cin>>tmp;
		str.push_back(tmp);
	}

	sort(str.begin(),str.end());
	cout<<str<<endl;

	dfs(0,0);

	return 0;
}
```
