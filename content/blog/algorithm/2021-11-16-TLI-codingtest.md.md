---
date: 2021-11-16 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 기능 개발, 더 맵게, 타겟 넘버, 짝지어 제거하기 c++'
emoji: ⚙️
---

Level 2문제

- [기능 개발](#기능-개발)
  - [코드](#코드)
- [더 맵게](#더-맵게)
  - [코드](#코드-1)
- [타겟 넘버](#타겟-넘버)
  - [코드](#코드-2)
- [짝지어 제거하기](#짝지어-제거하기)
  - [코드](#코드-3)

---

# 기능 개발

[문제 출처 : 프로그래머스 기능 개발](https://programmers.co.kr/learn/courses/30/lessons/42586)
각 작업들의 진도의 배열, 하루당 진척되는 작업 속도의 배열이 주어진다. 하루당 해당 속도만큼의 진도가 증가된다. 첫 번째 작업이 완료되는 날부터 하루마다 몇개의 작업이 100이 되는지 개수를 담은 배열을 리턴한다.
뒷 순서에 있는 작업이 먼저 100에 도달하는 경우가 있지만 앞의 작업들이 다 끝나야만 배포가 가능하다.

작업이 완료될 날을 구해서 큐에 넣은 후에 큐의 front값 이하로 걸리는 작업들의 개수를 센다.

## 코드

```cpp
#include <string>
#include <vector>
#include <queue>
#include <iostream>
using namespace std;

vector<int> solution(vector<int> progresses, vector<int> speeds) {
    vector<int> answer;
    queue <int> Q;
    for(int i=0;i<progresses.size();i++){
        int tmp=100-progresses[i];
        if(tmp%speeds[i]==0){
            Q.push(tmp/speeds[i]);
        }else{
            Q.push(tmp/speeds[i]+1);
        }

    }

    int day=Q.front();
    int cnt=0;
    while(!Q.empty()){

        if(Q.front()<=day){
            Q.pop();
            cnt++;
        }else{
            answer.push_back(cnt);
            cnt=1;
            day=Q.front();
            Q.pop();
        }
    }

    answer.push_back(cnt);

    return answer;
}
```

---

# 더 맵게

[문제 출처 : 프로그래머스 더 맵게](https://programmers.co.kr/learn/courses/30/lessons/42626)

주어진 스코빌 지수들을 제시된 공식을 이용해 새로운 스코빌 지수를 만든다. 모든 스코빌 지수 값이K이상으로 만들어지도록 음식들을 계속 섞는다. 섞은 횟수를 리턴한다.

계속해서 최소값들을 찾아야 하므로 우선순위 큐에 작은값을 루트로 오도록 넣어서 최소값 2개를 찾는다. 우선순위 큐의 루트 값이 K이상이면 횟수를 리턴한다.
우선순위 큐에 남은 노드가 1개인데 스코빌 지수가 K미만이면 그것은 스코빌 지수를 K로 만들 수 없으므로 -1을 리턴한다

## 코드

```cpp
#include <string>
#include <vector>
#include <queue>
#include <iostream>
using namespace std;

int solution(vector<int> scoville, int K) {
    int answer = 0;
    priority_queue<int> Q;
    for(int i=0;i<scoville.size();i++) Q.push(-scoville[i]);
    int cnt=0;
    while(-Q.top()<K && Q.size() >= 2){

        int min1=-Q.top();
        Q.pop();
        int min2=-Q.top();
        Q.pop();

        int new_scoville=min1+(min2*2);
        Q.push(-new_scoville);
        cnt++;

    }
    if(-Q.top()<K ) return -1;
    return cnt;
}
```

---

# 타겟 넘버

[문제 출처 : 프로그래머스 타겟 넘버](https://programmers.co.kr/learn/courses/30/lessons/43165)
숫자가 담긴 배열과 타겟 넘버가 주어진다. 배열의 값들을 더하거나 빼서 타겟넘버를 만드ㅡㄴ 방법의 가지수를 리턴한다.

간단한 완전 탐색 문제. DFS를 이용하면 된다.

## 코드

```cpp
#include <string>
#include <vector>
#include <iostream>
using namespace std;
int cnt=0;
vector<int> arr;
int t;
void DFS(int L,int sum){
   if(L==arr.size()){
       if(sum == t) cnt++;
       return ;
   }else{
       DFS(L+1,sum+arr[L]);
       DFS(L+1,sum-arr[L]);
   }
}

int solution(vector<int> numbers, int target) {
    arr=numbers;
    t=target;
    DFS(0,0);
    return cnt;
}
```

---

# 짝지어 제거하기

[문제 출처 : 프로그래머스 짝지어 제거하기](https://programmers.co.kr/learn/courses/30/lessons/43165)

올바른 괄호 찾는 문제와 유사하다. 괄호의 짝을 찾는것을 같은 문자 짝을 찾는것으로 바꾸면 된다. 짝지어 제거 가능한 문자라면 1을 , 짝지어서 제거하지 못하는 문자라면 0을 리턴한다.

## 코드

```cpp
#include <iostream>
#include<string>
#include <stack>
using namespace std;

int solution(string s)
{   stack<int> st;

    for(int i=0;i<s.size();i++){
        if(st.empty()) st.push(s[i]);
        else{
            if(s[i]==st.top()){
                st.pop();
            }
            else st.push(s[i]);
        }
    }
    if(st.empty()) return 1;
    else return 0;
}
```
