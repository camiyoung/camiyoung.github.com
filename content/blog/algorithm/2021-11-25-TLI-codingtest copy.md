---
date: 2021-11-25 16:22:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 베스트 앨범 c++'
emoji: 💿
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
