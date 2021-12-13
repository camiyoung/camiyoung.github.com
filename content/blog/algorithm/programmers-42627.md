---
title: '[프로그래머스] 디스크 컨트롤러 '
date: 2021-12-13 18:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🕹
---

## 디스크 컨트롤러

우선순위 큐를 활용하는 문제. 작업의 요청부터 종료까지 걸린 시간들의 평균을 가장 줄이는 방법으로 작업을 진행하면 평균이 얼마가 되는지 리턴한다.

## 풀이 및 코드

### 풀이

- 진행할 작업을 선별할 때 작업 소요 시간이 적은것부터 진행해야 한다. ( 이는 간단한 숫자 몇개로 대입해보면 알 수 있음)
- 현재 진행중인 작업이 없으면 시간상 먼저 요청된 작업을 진행해야 한다. -> 큐에 작업시간 순으로 넣음.
- 계속해서 소요시간이 작은걸 선별해야 하므로 우선순위 큐를 활용해서 계속해서 최솟값을 찾으면 된다.

**풀이 아이디어 구상**

한 작업이 끝나기 전에 들어온 요청들이 있다면 -> 작업 소요시간이 작은것부터 진행
끝나기 전에 들어온 요청이 없다면 -> 큐에서 차례대로
이 개념을 세우고 나면 이후는 그냥 코드로 구현하면 끝이다.

**코드 구상**

1. 작업 목록을 요청 시간을 기점으로 오름차순 정렬한 후 차례로 큐에 넣는다. ( 현재 아무 작업도 안할 경우 요청된 순으로 진행하기 때문)
2. 큐에서 작업을 하나씩 뽑아서 시간을 계산한다.
3. 작업 진행중에 들어온 요청들의 작업들을 처리한 우선순위를 구한다.
4. 큐의 작업을 모두 진행할때 까지 반복한다.(작업을 끝낼 때 마다 작업의 카운트를 올려준다. 이 카운트가 작업의 개수와 동일하면 종료)

---

![](https://images.velog.io/images/anji00/post/dee03c5e-a84e-448b-b130-b0e0ded2cfdd/image.png)
![](https://images.velog.io/images/anji00/post/8e6d36ed-8eea-4d4f-86d8-458236a79225/image.png)
![](https://images.velog.io/images/anji00/post/6e8ea933-3d7f-40e7-9038-c87f494450e3/image.png)
![](https://images.velog.io/images/anji00/post/c75df505-e2b6-46d6-9328-069d0df972dc/image.png)

### 코드(C++)

```cpp
#include<bits/stdc++.h>

using namespace std;

struct Task{
    int enter_time;
    int take_time;
    Task(int et,int tt){
        enter_time=et;
        take_time=tt;
    }
      bool operator<(const Task &t) const {
        return take_time > t.take_time;
    }
};

int solution(vector<vector<int>> jobs) {
    int answer = 0;
    priority_queue<Task> TQ;
    queue<Task> Q;
    vector<int> res_times;

    sort(jobs.begin(),jobs.end());


    for(auto& j:jobs){
        Q.push(Task(j[0],j[1]));
    }


    TQ.push(Q.front()); //첫번째 작업 우선순위 큐에 삽입
    Q.pop();

    int current_time=0;
    int cnt=0;//완료한 작업의 개수

    while(cnt!=jobs.size()){

        if(TQ.empty()){
            TQ.push(Q.front());
            Q.pop();

        }else{
        //우선순위 큐의 루트노드인 작업 진행하기
            Task now=TQ.top();
            TQ.pop();
            int tmp_time;
            if(current_time<now.enter_time){
                tmp_time=now.take_time;
                current_time+=(now.enter_time-current_time)+now.take_time;

            }else{
                tmp_time=current_time-now.enter_time+now.take_time;
                current_time+=now.take_time;
            }
            answer+=tmp_time;
            cnt++;
        }

        while(!Q.empty() && Q.front().enter_time<=current_time){
        //작업 진행중에 들어온 요청들 우선순위 큐 삽입
            TQ.push(Q.front());
            Q.pop();
        }


    }
    answer/=jobs.size();
    return answer;

}
```

![](https://images.velog.io/images/anji00/post/0ed9e758-0ee9-4bf8-9c9e-4adb072f3bd1/image.png)

개인적으로 우선순위 큐를 활용할 때 `pair` 보다는 구조체를 활용하게 된다.
구조체 내부에서 변수명을 자유롭게 사용 가능하고, 생성자와 구조체 내에서의 연산자 오버로딩으로 보기가 더 편한듯 한 느낌.

[문제 출처 : 프로그래머스 디스크 컨트롤러](https://programmers.co.kr/learn/courses/30/lessons/42627)
