---
date: 2021-11-17 16:23:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 괄호 변환, 뉴스 클러스터링, 숫자의 표현'
emoji: 📰
---

프로그래머스에서 레벨2의 문제들을 3개 풀었다.

- [괄호 변환](#괄호-변환)
- [뉴스 클러스터링](#뉴스-클러스터링)
- [숫자의 표현](#숫자의-표현)

---

## 괄호 변환

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

---

## 뉴스 클러스터링

[문제 출처 : 프로그래머스/뉴스 클러스터링](https://programmers.co.kr/learn/courses/30/lessons/17677)

자카드 유사도를 구하는 문제이다.
문제를 대충 읽고 풀었더니 다중 집합에 대해 고려 하지 않아서 오류가 났다.
문제와 조건을 꼼꼼하게 읽는 습관을 들여야 한다..

**주의할 점**

마지막 예제인 경우 str1,str2의 다중집합은 모두 공집합이 된다.
공집합과 공집합의 교집합은 공집합, 합집합도 공집합 이므로 자카드 유사도는 1이 된다.

```cpp
#include <bits/stdc++.h>

using namespace std;

int solution(string a, string b) {
    int answer = 0;
    string str1="",str2="";
    map<string,int> ch1;
    map<string,int> ch2;
    map<string,int>::iterator it;

    for(int i=0;i<a.size();i++){
        if(a[i]>='a'&&a[i]<='z'||a[i]>='A'&&a[i]<='Z'){
            str1.push_back(toupper(a[i]));
        }else {
            str1.push_back(toupper(a[i]));
        }
    }

     for(int i=0;i<b.size();i++){
        if(b[i]>='a'&&b[i]<='z'||b[i]>='A'&&b[i]<='Z'){

            str2.push_back(toupper(b[i]));
        }else{
            str2.push_back(toupper(b[i]));
        }
    }

    string tmp;
    for(int i=0;i<str1.size()-1;i++){

        if(!isalpha(str1[i])|!isalpha(str1[i+1])){
            continue;
        }
        tmp.push_back(str1[i]);
        tmp.push_back(str1[i+1]);
        ch1[tmp]++;
        tmp="";
    }

     for(int i=0;i<str2.size()-1;i++){
        if(!isalpha(str2[i])|!isalpha(str2[i+1])){

            continue;
        }
        tmp.push_back(str2[i]);
        tmp.push_back(str2[i+1]);
        ch2[tmp]++;
        tmp="";
    }

    if(ch1.size()==0&&ch2.size()==0) return 65536;
    int cntIntersection =0,cntUnion=0;

    for(it=ch1.begin();it!=ch1.end();it++){
        if(ch2[it->first]>0){
            cntIntersection += min(ch1[it->first],ch2[it->first]);
            cntUnion+=max(ch1[it->first],ch2[it->first]);
            }else{
               cntUnion+=it->second;
            }
        }
     for(it=ch2.begin();it!=ch2.end();it++){
            if(ch1[it->first]<1) cntUnion+=it->second;
    }

    answer=65536*(float)cntIntersection/(float)cntUnion;

    return answer;
}
```

---

## 숫자의 표현

[문제 출처 : 프로그래머스/숫자의 표현](https://programmers.co.kr/learn/courses/30/lessons/12924)

주어진 수를 연속된 자연수의 합으로 나타낼 수 있는 가지수를 구한다.

연속해서 더해지는 자연수들중 가장 처음(작은) 수를 a라고 한다면

- 연속한 2자리 더하기
  - a+(a+1)=15 ⇒ 2a=14
  - a= 7일때 7+8=15
- 연속한 3자리
  - a+(a+1)+(a+2)=15 ⇒ 3a=12
  - a=4 일때 4+5+6 =15
- 연속한 4자리
  - a+(a+1)+(a+2)+(a+4)=15 ⇒ 4a=9
  - a=2.xxx 자연수가 아니므로 4자리로는 만들 수 없음.
- 연속한 5자리
  - a+(a+1)+(a+2)+(a+4)+(a+5)=15 ⇒ 5a=5
  - a=1 일때 1+2+3+4+5=15

따라서 n= n-(더할 수의 개수) 의 양상으로 감소하고, n%(더할 수의 개수)==0 이면 시작하는 수a를 구할 수 있으므로 더할 수의 개수로 연속된 자연수들로 표현 할 수 있다.

```cpp
#include <string>
#include <vector>
#include <iostream>
using namespace std;

int solution(int n) {
    int answer = 1; // n=n
    int num=2; //2자리로 되는지 부터 시작.
    n--;
    while(n>0){
        if(n%num==0)answer++;
        n-=num;
        num++;
    }
    return answer;
}
```
