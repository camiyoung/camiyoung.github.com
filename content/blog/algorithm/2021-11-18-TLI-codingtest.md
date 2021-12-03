---
date: 2021-11-17 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 괄호 변환'
emoji: ↔️
---

# 괄호 변환

[문제 출처 : 프로그래머스/괄호 변환](https://programmers.co.kr/learn/courses/30/lessons/60058)

주어진 규칙에 따라서 괄호를 변환 하면 올바른 괄호 문자열이 나온다. 주어진 규칙을 잘 구현하는 문제이다.

- 균형잡힌 괄호 문자열 : `(`의 개수와 `)`의 개수가 같은 문자열
- 올바른 괄호 문자열 : 균형 잡힌 문자열 이면서 괄호의 짝이 맞는 문자열.

주어진 변환 과정이 재귀적으로 이루어짐을 알려주기 때문에 재귀함수로 풀면 간단하게 풀 수 있다.

```cpp
#include <bits/stdc++.h>

using namespace std;
bool isCorrect(string s){ // 올바른 괄호 문자열인지 확인
    stack<char> st;
    st.push(s[0]);
    for(int i=1;i<s.size();i++){
        if(s[i]=='('){
            st.push(s[i]);
        }else if(s[i]==')'){
            if(st.empty()) return false;
            if(st.top()=='(') st.pop();
            else return false;
        }
    }
    if(st.empty()) return true;
    else return false;
}
string change(string s){ // 규칙 4번에 따라 문자열을 변환하는 함수
    s.erase(0,1);
    s.pop_back();
    for(int i=0;i<s.size();i++){
        if(s[i]=='(') s[i]=')';
        else s[i]='(';
    }
    return s;
}
string res(string s){ // 문자열을 변환하는 함수. u와 v로 나누어서 변환 과정을 거친다.
    string u,v;
    string res="";
    int cntLeft=0,cntRight=0;
    if(s.size()==0) return "";
        for(int i=0;i<s.size();i++){
            if(s[i]=='(') cntLeft++;
            else cntRight++;
            if(cntLeft==cntRight){
                u=s.substr(0,i+1);
                s.erase(0,i+1);
                v=s;
                break;
            }
        }

    if(isCorrect(u)){
        res+=u+res(v);
    }
    else res="("+res(v)+")"+change(u);

  return res;
}

string solution(string p) {
    string answer = "";

    if(isCorrect(p)) return p;
    answer=res(p);

    return answer;
}
```
