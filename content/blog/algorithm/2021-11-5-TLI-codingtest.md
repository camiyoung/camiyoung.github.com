---
title: '[프로그래머스] 숫자 문자열과 영단어, 완주하지 못한 선수'
date: 2021-11-5 16:23:13
category: 'algorithm'
draft: false
---

6Level 1 문제

- [숫자 문자열과 영단어](#숫자-문자열과-영단어)
  - [반복문 사용 풀이](#반복문-사용-풀이)
  - [정규표현식 사용 풀이](#정규표현식-사용-풀이)
- [완주하지 못한 선수](#완주하지-못한-선수)
  - [정렬 후 반복문 풀이](#정렬-후-반복문-풀이)
  - [해시 사용 풀이](#해시-사용-풀이)

---

# 숫자 문자열과 영단어

[문제 출처 : 프로그래머스 숫자 문자열과 영단어](https://programmers.co.kr/learn/courses/30/lessons/81301)
영단어로 작성된 숫자들과 숫자가 함께 있는 문자열이 주어진다. 이 문자열을 모두 숫자로 변환한 값을 리턴하는 문제.

문자열을 처음부터 돌면서 숫자인 문자는 그대로 출력.
문자가 나타나면 해당 문자와 바로 다음에 오는 문자 두글자를 사용해서 숫자로 변환한다.
두 글자를 사용하는 이유 : 0~9까지의 영단어들은 처음 두글자를 가지고서 모두 구분 가능.
영단어의 시작부터 끝까지를 모두 사용하려고 한다면 한 문자마다 매칭되는 숫자가 있는지 계속해서 판별해야 한다.

반복문을 사용해서 문자가 나오면 숫자로 변환하며 변환을 진행했다.
그러나 이런 문제는 정규 표현식을 사용하면 간편하게 변환이 가능하다.

## 반복문 사용 풀이

```cpp
#include <string>
#include <vector>

using namespace std;

int solution(string s) {
    int answer = 0;
    int ch;
    int pos=0;
    string ret;
    string tmp;
    while(pos<=s.size()-1){
        if(s[pos]>='0' && s[pos] <='9'){
            ret+=s[pos];
            pos++;
        }else if(s[pos]>='a' && s[pos]<='z'){
            tmp.push_back(s[pos]);
           tmp.push_back(s[pos+1]);
            if(tmp=="ze"){
                pos+=4;
                ret+='0';
                tmp.clear();
            }
            else if(tmp=="on"){
                pos+=3;
                ret+='1';
                tmp.clear();
            }
            else if(tmp=="tw"){
                pos+=3;
                ret+='2';
                tmp.clear();
            }
            else if(tmp=="th"){
                pos+=5;
                ret+='3';
                tmp.clear();
            }
            else if(tmp=="fo"){
                pos+=4;
                ret+='4';
                tmp.clear();
            }
            else if(tmp=="fi"){
                pos+=4;
                ret+='5';
                tmp.clear();
            }
            else if(tmp=="si"){
                pos+=3;
                ret+='6';
                tmp.clear();
            }
            else if(tmp=="se"){
                pos+=5;
                ret+='7';
                tmp.clear();
            }
            else if(tmp=="ei"){
                pos+=5;
                ret+='8';
                tmp.clear();
            }
            else if(tmp=="ni"){
                pos+=4;
                ret+='9';
                tmp.clear();
            }
        }
    }
    answer=stoi(ret);
    return answer;
}
```

## 정규표현식 사용 풀이

```cpp
#include <bits/stdc++.h>
using namespace std;

int solution(string s) {
    s = regex_replace(s, regex("zero"), "0");
    s = regex_replace(s, regex("one"), "1");
    s = regex_replace(s, regex("two"), "2");
    s = regex_replace(s, regex("three"), "3");
    s = regex_replace(s, regex("four"), "4");
    s = regex_replace(s, regex("five"), "5");
    s = regex_replace(s, regex("six"), "6");
    s = regex_replace(s, regex("seven"), "7");
    s = regex_replace(s, regex("eight"), "8");
    s = regex_replace(s, regex("nine"), "9");
    return stoi(s);
}
```

---

# 완주하지 못한 선수

[문제 출처 : 프로그래머스 완주하지 못한 선수](https://programmers.co.kr/learn/courses/30/lessons/42576)
마라톤을 참가자 배열과 완주자 배열이 주어진다. 참가자중에 한명의 낙오자가 있다. 참가자, 완주자 배열을 갖고 낙오자를 찾는 문제.

해시 카테고리의 문제였는데 문자열을 정렬해서 풀었다.
참가자, 완주자 배열을 정렬 하고 각 배열에서 한명씩 뽑아 비교한다. 이름이 다르다면 참가자 배열에 있는 사람이 완주하지 못한 사람이다.

sort 를 두번 사용 O(nlogn), 배열 요소들을 하나씩 검색 (n) 의 최악의 케이스를 고려 해 보아도 시간복잡도가 크지 않으므로 고려해볼만한 풀이 인듯하다.

## 정렬 후 반복문 풀이

```cpp
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

string solution(vector<string> participant, vector<string> completion) {
    sort(participant.begin(),participant.end());
    sort(completion.begin(),completion.end());
    for(int i=0;i<participant.size();i++){
        if(participant[i]!=completion[i]) return participant[i];
    }
}
```

## 해시 사용 풀이

참가자들을 해시 테이블에 넣고 완주자들이 해당 테이블에 존재하는지 찾는다.

```cpp
#include <string>
#include <vector>
#include <unordered_set>
using namespace std;

string solution(vector<string> participant, vector<string> completion) {
    string answer = "";
    unordered_multiset<string> names;

    for(int i = 0; i < participant.size(); i++)
    {
        names.insert(participant[i]);
    }

    for(int i = 0; i < completion.size(); i++)
    {
        unordered_multiset<string>::iterator itr = names.find(completion[i]);
        names.erase(itr);
    }

    return *names.begin();
}
```
