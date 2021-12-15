---
title: '[프로그래머스] 이중 우선순위 큐 c++ '
date: 2021-12-14 13:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: ↔️
---

# 이중 우선순위 큐

![](https://images.velog.io/images/anji00/post/f7cf765d-5c7f-4764-a99a-9a82da84dd72/image.png)

우선순위 큐는 max heap 혹은 min heap을 사용해서 배열에서 계속해서 최댓값 혹은 최솟값을 계산해야 할 때 유용한 자료구조다.
이 문제에서는 최댓값과 최솟값을 동시에 다루어 줘야 한다.

## 풀이 및 코드

### 풀이

입력되는 숫자들을 배열에 저장하고 숫자가 삭제되면 이 배열에서 삭제되었다고 체크해준다.

max heap과 min heap 을 둘 다 사용했다.
최댓값을 삭제할 땐 max heap에서 최댓값을 삭제, 최솟값을 삭제할 때는 min heap에서 삭제한다.
삭제를 할 때 마다 삭제 카운트를 센다. 이 카운트가 입력된 숫자들의 개수와 동일하면 현재 삭제할 노드가 없다는 뜻이다. 따라서 카운트가 0이 아닐때만 삭제를 해 주면 된다.

연산이 모두 끝난 후에 삭제되지 않은 숫자들중에서 최댓값, 최솟값을 구해주면 된다.

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

![](https://images.velog.io/images/anji00/post/12f53656-a6f8-4b9a-be66-b7141cc1c908/image.png)

### 큐를 사용하지 않는 풀이

이 문제는 큐를 사용하지 않고도 풀 수 있다.
set 자료구조는 중복을 허용하지 않고 넣을때 마다 오름차순으로 정렬된다.
따라서 최댓값을 삭제할 때는 가장 앞의 값을 삭제, 최솟값을 삭제할 때는 끝의 값을 삭제하면 된다.

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <set>

using namespace std;

vector<int> solution(vector<string> arguments) {
    vector<int> answer = {0, 0};
    set <int> pq;
    for (auto s : arguments){
        if (s[0] == 'I'){
            int num = stoi(s.substr(2, s.size()));
            pq.insert(num);
        }
        else{
            if (s[2] == '1'){
                auto it = pq.end();
                if (it != pq.begin()){
                    it--;
                    pq.erase(it);
                }
            }
            else{
                auto it = pq.begin();
                if (it != pq.end()){
                    pq.erase(it);
                }
            }
        }
    }
    if (pq.size() > 0){
        answer[0] = *pq.rbegin();
        answer[1] = *pq.begin();
    }
    return answer;
}
```

![](https://images.velog.io/images/anji00/post/30dd0fbf-c8b3-410f-8438-dd6de2b7a580/image.png)

#### set 삭제 시간 복잡도

set을 사용한 코드에서 최솟값을 삭제할 때 계속 0번째 값을 삭제하고 이후 값들을 복사해야 하니까 시간이 많이 소요될것이라고 생각했다.

하지만 set은 배열이 아니라 `red-black trees`를 기반으로 하기 때문에 탐색, 삽입, 삭제에 대한 시간 복잡도가 O(logN)이다.

알고리즘 문제를 빠르고 효율적으로 풀기 위해서는 자주 사용되는 라이브러리에 대해 잘 알고 있어야겠다고 생각했다.
