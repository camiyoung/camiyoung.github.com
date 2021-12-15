---
date: 2021-11-9 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 두 개 뽑아서 더하기 c++'
emoji: 🥢
---

Level 1.

- [두 개 뽑아서 더하기](#두-개-뽑아서-더하기)
  - [풀이](#풀이)
  - [반복문 풀이](#반복문-풀이)
  - [set을 이용한 풀이](#set을-이용한-풀이)

---

# 두 개 뽑아서 더하기

[문제 출처 : 프로그래머스 두 개 뽑아서 더하기](https://programmers.co.kr/learn/courses/30/lessons/68644)
정수 배열이 주어진다. 배열에서 서로 다른 인덱스에 있는 두개의 수를 뽑아서 더할 수 있는 모든 수의 배열을 오름차순으로 담아 리턴하는 문제.

## 풀이

2중 for문을 사용하여 풀었다. 주어진 배열의 길이가 최대 100이므로 n제곱인 경우에도 1000번을 수행하므로 시간 초과의 문제가 없었다.

인덱스를 하나씩 증가 시키면서 배열을 돈다. 인덱스 +1 번째부터 배열 끝까지의 값을 각각 더하여 결과 배열에 넣는다.
이 때 결과 값이 중복되는 경우는 한 번만 출력해야 하므로 map을 사용하여 중복값이 없도록 하였다. map에 삽입되면서 자동으로 정렬되기 때문에 정렬작업은 필요하지 않다.

## 반복문 풀이

```cpp
#include <string>
#include <vector>
#include <map>
#include <iostream>
using namespace std;

vector<int> solution(vector<int> numbers) {
    map <int,int> res;
    map<int,int> :: iterator it;
    vector<int> answer;

    int sum;
    for(int i=0;i<numbers.size()-1;i++){
        sum=numbers[i];
        for(int j=i+1;j<numbers.size();j++){
            sum+=numbers[j];
            res[sum]++;
            sum=numbers[i];
        }
    }

      for(it=res.begin();it!=res.end();it++){
        answer.push_back(it->first);
    }
    return answer;
}
```

![](https://images.velog.io/images/anji00/post/459a707b-aa4f-4064-8a5e-baa2f80d2283/image.png)

---

## set을 이용한 풀이

set을 사용하면 중복된 값을 허용하지 않으므로 위의 코드 처럼 추가적인 순화 없이 바로 결과 배열을 만들 수 있다.

```cpp
vector<int> solution(vector<int> numbers) {
    vector<int> answer;
    set<int> st;
    for(int i = 0;i<numbers.size();++i){
        for(int j = i+1 ; j< numbers.size();++j){
            st.insert(numbers[i] + numbers[j]);
        }
    }
    answer.assign(st.begin(), st.end());
    return answer;
}
```
