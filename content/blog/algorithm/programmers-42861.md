---
title: '[프로그래머스] 섬 연결하기 c++ '
date: 2021-12-16 15:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🏝
---

# 섬 연결하기

모든 노드를 연결할 수 있는 간선들을 최소비용이 되도록 선택하는 문제.

## 풀이 및 코드

### 풀이 (프림 알고리즘)

프림 알고리즘을 이용하여 풀었다.프림 알고리즘은 그래프에서 최소 스패닝 트리를 찾는 알고리즘이다. 트리를 하나 생성하고 그 트리에 속하지 않은 노드들 중 간선의 가중치가 최소인 노드를 트리에 삽입 한다.
이 떄 가중치를 오름차순으로 정렬해서 가중치가 낮은 순으로 탐색한다.

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;

vector<int> solution(vector<string> operations) {
    vector<int> answer={0,0};
    vector<pair<int,int>> number;
    priority_queue<pair<int,int>> maxQ;
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> minQ;
    int deleteCnt=0;
    for(auto& a:operations){
        int num=stoi(a.substr(2,a.size()));

        if(a[0]=='I'){
            number.push_back(make_pair(num,0));
            maxQ.push(make_pair(num,number.size()-1));
            minQ.push(make_pair(num,number.size()-1));
        }
        else {
            if(a[2]=='1'){
                if(deleteCnt==number.size())continue;
                int deleteIdx=maxQ.top().second;
                number[deleteIdx].second=1;
                maxQ.pop();
                deleteCnt++;
            }else{
              if(deleteCnt==number.size())continue;
                int deleteIdx=minQ.top().second;
                number[deleteIdx].second=1;
                minQ.pop();
                deleteCnt++;
            }

        }

    }
    if(deleteCnt==number.size()){ // 큐가 비었다면 [0,0] 리턴
        return answer;
    }
    vector<int> tmp;

    for(auto& num:number){
        if(num.second==0){ // 삭제되지 않은 숫자만 따로 추출
            tmp.push_back(num.first);
        }
    }
    int maxVal= *max_element(tmp.begin(),tmp.end());
    int minVal= *min_element(tmp.begin(),tmp.end());
    answer[0]=maxVal;
    answer[1]=minVal;

    return answer;
}
```

### 풀이 (유니온 파인드)

노드들을 한 집합에 계속 병합하는 방식
간선을 오름차순으로 정렬해서 병합한다.

```cpp
#include <string>
#include <vector>
#include <algorithm>
using namespace std;
int d[101];

int getParent(int node){
    if(node == d[node]){
        return node;
    }
    else return d[node] = getParent(d[node]);
}

bool compare(vector<int> a, vector<int> b){
    return a[2] < b[2];
}

int solution(int n, vector<vector<int>> costs) {

    int answer = 0;
    for(int i =0; i<n; i++){
        d[i] = i;
    }
    sort(costs.begin(), costs.end(), compare);
    for(int i=0; i<costs.size(); i++){
        int start = getParent(costs[i][0]);
        int end = getParent(costs[i][1]);
        int cost = costs[i][2];

        if(start != end){
            d[end] = start;

            answer += cost;
        }
    }


    return answer;
}
```
