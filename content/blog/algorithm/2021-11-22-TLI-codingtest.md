---
date: 2021-11-22 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 전화 번호 목록'
emoji: ☎️
---

해시 문제

# 전화번호 목록

[문제 출처 : 프로그래머스 전화번호 목록](https://programmers.co.kr/learn/courses/30/lessons/42577)

전화 번호부에 적힌 번호중, 한 번호가 다른 번호의 접두어인 경우를 체크한다.

## 풀이 및 코드

입력 받은 전화번호들을 해시테이블에 기록해 둔다.
이후 각 번호 마다 앞에서 부터 한문자씩 늘려가며 해시테이블에 존재하는지 확인한다.

```cpp
#include <iostream>
using namespace std;

bool solution(vector<string> phone_book) {
    bool answer = true;
    unordered_map<string,int> h;
    unordered_map<string,int> :: iterator it;
    for(int i=0;i<phone_book.size();i++){
        h[phone_book[i]]++;
    }

    for(int i=0;i<phone_book.size();i++){
        string tmp="";
        for(int j=0;j<phone_book[i].size()-1;j++){
            tmp+=phone_book[i][j];
            if(h[tmp]) return false;
        }
    }
    return answer;
}
```
