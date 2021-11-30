---
date: 2021-11-23 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 프린터'
---

스택/큐 카테고리의 문제

# 프린터

[문제 출처 : 프로그래머스 프린터 ](https://programmers.co.kr/learn/courses/30/lessons/42587)

프린트 하는 우선순위가 담긴 배열과 찾고자 하는 index값인 location이 주어진다. 우선순위가 높은 것부터 출력하게 될 때 location의 항목은 몇번째에 출력 되는지 리턴해야 한다.

## 풀이 및 코드

주어진 `priorities` 배열을 사용해 우선순위 큐를 만든다.

현재 대기하고있는 작업들 중 우선순위가 가장 높은 작업만 출력 되고, 아닌 것은 대기큐의 맨뒤로 들어가야한다.

따라서 계속해서 가장 높은 우선순위에 있는지 체크할 필요가 있어서 우선순위 큐를 사용했다.

출력 가능한 문서가 (맨 앞에 있는 문서) 최고 우선순위라면 출력한 개수를 +1해주고, 최고 우선 순위가 아니라면 대기열의 맨 뒤로 넣어준다.

출력을 할 때 해당 문서가 우리가 찾고자 하는 location의 인덱스와 같다면 바로 출력하는 순서를 리턴하고 종료한다.

```cpp
#include<bits/stdc++.h>
using namespace std;

int solution(vector<int> priorities, int location) {
    int answer = 1;
    queue <pair<int,int> > Q;

    for(int i=0;i<priorities.size();i++){
       Q.push(make_pair(i,priorities[i]));

    }
    while(!Q.empty()){
        int maxx=*max_element(priorities.begin(),priorities.end());
        auto it=find(priorities.begin(),priorities.end(),maxx);
        if(Q.front().second==maxx){
           if(Q.front().first==location) return answer;
            answer++;
            Q.pop();
            priorities.erase(it);
        }else{
            pair<int,int> tmp = Q.front();
            Q.pop();
            Q.push(tmp);
        }
    }

    return answer;

}
```

## 댜른 방법

인덱스만 담긴 큐를 생성한다. `priorities` 배열의 최댓값을 이용해서 인덱스가 담인 큐를 조작한다. 인덱스번째의 값이 최대값이 아니면 해당 인덱스를 큐의 맨뒤로 보낸다. 최댓값이면 출력순서를 담는 배열에 인덱스를 삽입한다.

최종적으로 만들어진 출력순서를 담는 배열에서 `location`이 몇번째에 나오는지 구하면 된다.

```cpp
#include <string>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

int solution(vector<int> priorities, int location) {
    queue<int> printer;                         //queue에 index 삽입.
    vector<int> sorted;                         //정렬된 결과 저장용
    for(int i=0; i<priorities.size(); i++) {
        printer.push(i);
    }
    while(!printer.empty()) {
        int now_index = printer.front();
        printer.pop();
        if(priorities[now_index] != *max_element(priorities.begin(),priorities.end())) {
            //아닌경우 push
            printer.push(now_index);
        } else {
            //맞는경우
            sorted.push_back(now_index);
            priorities[now_index] = 0;
        }
    }
    for(int i=0; i<sorted.size(); i++) {
        if(sorted[i] == location) return i+1;
    }
}
```
