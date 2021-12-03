---
date: 2021-11-25 16:20:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 주식 가격'
emoji: 📉
---

Level 2,3문제를 각각 하나씩 풀었다.

- [베스트 앨범](#베스트-앨범)
  - [풀이](#풀이)
  - [최종 코드](#최종-코드)
- [주식 가격](#주식-가격)
  - [반복문 사용 풀이](#반복문-사용-풀이)
  - [스택 사용 풀이](#스택-사용-풀이)

---

# 베스트 앨범

[문제 출처 : 프로그래머스 베스트앨범](https://programmers.co.kr/learn/courses/30/lessons/42579)
프로그래머스 해시 카테고리의 레벨3 문제이다.
레벨 2를 다 풀고 3을 풀어야겠단 생각으로 그동안 레벨 3은 풀지 않았는데 생각보다 어렵지 않아서 놀라웠다. 난이도 분류의 기준은 알다가도 모르겠다. 😅

map 자료 구조를 사용하면 키:값 쌍으로 생성이 가능 하다. 처음 이 문제를 풀 땐 map도 벡터 처럼 2차원으로 선언 가능한걸 몰랐다. 그래서 각 노래들은 vector에 담고 장르 구분은 category 테이블을 만들어서 (마치 데이터베이스 사용하는 것 처럼) 사용했다.
![](https://images.velog.io/images/anji00/post/dd69154d-0036-4332-aad5-3cfacb0303fe/image.png)

이후 map을 2차원으로 사용하여서 category 맵은 필요 없게 되었다.

## 풀이

속한 노래가 많이 재생된 장르 순서를 찾기 위해 priority queue를 사용 한다.

- total_times 맵을 선언해서 각 장르별 재생 횟수를 구해서 우선순위 큐를 만든다.
- PQ의 루트값에 해당하는 장르의 상위2개 인덱스를 찾는다. (장르에 속한 노래가 1개라면 1개만)

## 최종 코드

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Song{
    int id;
    int playTime;
    Song(int idx,int pt){
        id=idx;
        playTime=pt;
    }
    bool operator<(const Song &s) const {
        if(playTime!=s.playTime) return playTime>s.playTime;
        else return id<s.id;
    }
};

vector<int> solution(vector<string> genres, vector<int> plays) {
    vector<int> answer;
    priority_queue<pair<int,string>> PQ;
    map <string,int> total_times;
    map <string,int> ::iterator it;
    map <string,vector<Song>> playList;
    map <string,vector<Song>> :: iterator pit;

    for(int i=0;i<genres.size();i++){
       total_times[genres[i]]+=plays[i];
        playList[genres[i]].push_back(Song(i,plays[i]));
    }

      for(it=total_times.begin();it!=total_times.end();it++){
        PQ.push(make_pair(it->second,it->first));
    }


    for(pit=playList.begin();pit!=playList.end();pit++){
        sort(playList[pit->first].begin(),playList[pit->first].end());
    }


     while(!PQ.empty()){
        string gen = PQ.top().second;
        answer.push_back(playList[gen][0].id);
         if(playList[gen].size()>1) {
            answer.push_back(playList[gen][1].id);
            }
        PQ.pop();
    }
    return answer;
}
```

![](https://images.velog.io/images/anji00/post/459a707b-aa4f-4064-8a5e-baa2f80d2283/image.png)

---

# 주식 가격

[문제 출처 : 프로그래머스 주식 가격](https://programmers.co.kr/learn/courses/30/lessons/42584)

## 반복문 사용 풀이

스택/큐 카테고리에 있는 레벨 2 문제이다. 하지만 스택이나 큐를 이용하지 않고 이중 반복문으로 풀고 테스트를 통과했다.
주어진`prices[i]`의 증가하는 초인 `answer[i]`를 찾기 위해서

- `j=i+1`부터 배열의 끝까지 순회 한다.
- 만약 `prices[j]<prices[i]`라면 증가가 끝난 경우이다.
- i와 j 의 차를 계산하면 이것이 `answer[i]`이다.

```cpp
#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<int> prices) {
    vector<int> answer;

    for(int i=0;i<prices.size()-1;i++){
        int tmp=prices.size()-1-i;
        for(int j=i+1;j<prices.size();j++){
            if(prices[j]<prices[i]) {
                answer.push_back(j-i);
                break;
            }
        }
        if(answer.size()==i){
            answer.push_back(tmp);
        }
    }
    answer.push_back(0);
    return answer;
}

```

이중 for문이라서 시간 복잡도가 걱정이 되었지만 안쪽의 for문은 i가 증가함에 따라서 반복 횟수가 줄어들기 때문에 시간 초과의 문제는 없었다.
![이중 for문 테스트](https://images.velog.io/images/anji00/post/a160fb2a-7229-43dc-90d3-e3e5a6876fe9/image.png)

스택으로 푸는 방법이 궁금해서 다른 사람의 풀이를 찾아 보았다.

## 스택 사용 풀이

```cpp
//출처 : https://programmers.co.kr/learn/courses/30/lessons/42584/solution_groups?language=cpp
#include <string>
#include <vector>
#include <stack>

using namespace std;

vector<int> solution(vector<int> prices) {
    vector<int> answer(prices.size());
    stack<int> s;
    int size = prices.size();
    for(int i=0;i<size;i++){
        while(!s.empty()&&prices[s.top()]>prices[i]){
            answer[s.top()] = i-s.top();
            s.pop();
        }
        s.push(i);
    }
    while(!s.empty()){
        answer[s.top()] = size-s.top()-1;
        s.pop();
    }
    return answer;
}

```

이전의 값보다 현재 값이 증가하면 스택에 넣고, 감소한다면 answer배열에 기록한다.

배열을 다 돌면 스택에는 증가 하는 인덱스들만 남아 있는데, 하나씩 인덱스부터 배열의 끝 까지 몇개가 있는지 계산해 주면 된다.

그러나 경과 시간은 이중 for문을 사용한 것과 큰 차이가 없다.
![stack사용 테스트](https://images.velog.io/images/anji00/post/030e02a8-d636-4fd1-935f-d2e6abe3af65/image.png)

구글링을 해보니 많은 사람들이 이 문제를 보고 바로 스택을 써야겠단 생각이 들지 않았다고 한다. 나 역시 굳이 이걸 스택을 써야만 하나? 라는 생각으로 이중 반복문을 썼다. 문제의 분류가 굳이 스택이 아니어도 될 듯 하다..

그리고 프로그래머스의 레벨의 기준이 궁금하다. 같은 레벨 2 문제도 어떤건 아주 간단하게 풀리고 어떤건 복잡하던데 말이지..
