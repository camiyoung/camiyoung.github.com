---
date: 2021-11-17 16:24:13
category: 'algorithm'
draft: false
title: '[프로그래머스] 뉴스 클러스터링'
emoji: 📰
---

# 뉴스 클러스터링

[문제 출처 : 프로그래머스/뉴스 클러스터링](https://programmers.co.kr/learn/courses/30/lessons/17677)

자카드 유사도를 구하는 문제이다.

## 풀이 및 코드

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

문제를 대충 읽고 풀었더니 다중 집합에 대해 고려 하지 않아서 오류가 났다.
문제와 조건을 꼼꼼하게 읽는 습관을 들여야 한다..
