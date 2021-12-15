---
date: 2021-11-12 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 단체사진 찍기 c++'
emoji: 👨‍👩‍👧‍👧
---

Level 2 문제

- [단체사진 찍기](#단체사진-찍기)
  - [next_permutation 풀이](#next_permutation-풀이)
  - [DFS 풀이](#dfs-풀이)

---

# 단체사진 찍기

[문제 출처 : 프로그래머스 단체사진 찍기](https://programmers.co.kr/learn/courses/30/lessons/1835)

문자열 배열을 정렬하는 조건이 주어진다. 조건을 만족하는 배열 경우의 수를 출력한다.

모든 경우의수를 따져 봐야 하므로 DFS 완전탐색을 이용해서 조건을 만족하는 순열을 찾을 수 있다. next_permutation을 사용하여 모든 경우의수를 구하여 조건에 맞는지 판단하도록 하여 조금 더 간단한 구현이 가능하다.

## next_permutation 풀이

```cpp
#include <bits/stdc++.h>

using namespace std;

int solution(int n, vector<string> data) {
    vector<char> name{'A','C','F','J','M','N','R','T'};
     int answer=0;

    cout<<n<<" "<<data.size()<<endl;
    do{

    int cnt=0;
      for(int i=0;i<data.size();i++){

        int n1=data[i][0];
        int n2=data[i][2];
        int cond=data[i][3];
        int dist=data[i][4]-'0'+1;

        int idx1=-1,idx2=-1;
        for(int j=0;j<8;j++){
            if(name[j]==n1) idx1=j;
            if(name[j]==n2) idx2=j;
            if(idx1!=-1&&idx2!=-1) break;
        }
        if(cond=='='&&abs(idx1-idx2)!=dist) break ;
        if(cond=='<'&&abs(idx1-idx2)>=dist) break ;
        if(cond=='>'&&abs(idx1-idx2)<=dist) break ;
        cnt++;
      }
    if(cnt==data.size()) answer++;

    }while(next_permutation(name.begin(),name.end()));

    return answer;

}
```

## DFS 풀이

```cpp
#include <bits/stdc++.h>

using namespace std;

int Answer;
bool Select[8];
char ItoC[8] = { 'A','C','F','J','M','N','R','T' };

void DFS(int Cnt, char Arr[], vector<string>data){
    if(Cnt==8){
        for(int i=0;i<data.size();i++){
            char N1=data[i][0];
            char N2=data[i][2];
            char Cond=data[i][3];
            int Dist=data[i][4]-'0'+1;

            int idx1=-1,idx2=-1;
            for(int j=0;j<8;j++){
                if(Arr[j]==N1) idx1=j;
                if(Arr[j]==N2) idx2=j;
                if(idx1!=-1&&idx2!=-1) break;
            }
            if(Cond=='='&&abs(idx1-idx2)!=Dist) return ;
            if(Cond=='<'&&abs(idx1-idx2)>=Dist) return ;
            if(Cond=='>'&&abs(idx1-idx2)<=Dist) return ;
        }
        Answer++;
        return ;
    }else{
        for( int i=0;i<8;i++){
        if(Select[i]==true) continue;
        Select[i]=true;
        Arr[Cnt]=ItoC[i];
        DFS(Cnt+1,Arr,data);
        Select[i]=false;
    }
    }

}
int solution(int n, vector<string> data) {

    char Arr[8]={'\0',};
    Answer=0;
    DFS(0,Arr,data);
    return Answer;
}
```
