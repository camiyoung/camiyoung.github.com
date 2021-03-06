---
title: '[프로그래머스] 단어 변환 c++'
date: 2021-11-30 17:11:32
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🖍
---

DFS/BSF 문제.

# 단어 변환

[문제 출처: 프로그래머스 단어 변환](https://programmers.co.kr/learn/courses/30/lessons/43163)

주어진 조건에 따라 단어를 변환해가며 따라간다.
주어진 목표 단어로 변환하기 위한 최단 변환 횟수를 구하는 문제이다.

## 풀이 및 코드

주어진 words배열을 하나씩 탐색하는 간단한 dfs문제다. 한자리의 알파벳만 다른지 체크하는 함수를 따로 만들었다. 기존에 방문하지 않았고 현재의 단어와 알파벳 한자리만 다르다면 변환 가능하다.
중요한점은 한번 변환에 사용된 단어는 다시 방문하지 않도록 체크 배열을 생성해주는 것이다.

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

vector<string> Words;
int check[51];

string target_value;
int cnt=0;
int min_cnt=100;

bool isDiffOne(string& a, string& b){
    int cnt=0;
    for(int i=0;i<a.size();i++){
        if(a[i]!=b[i]) cnt++;
    }
    return cnt==1?true:false;
}

void dfs(string str,int L){

    if(str==target_value){
        if(L<min_cnt) min_cnt=L;
        return ;
    }
    for(int i=0;i<Words.size();i++){
        if(check[i]==0&&isDiffOne(str,Words[i])){
            check[i]=1;
            dfs(Words[i],L+1);
            check[i]=0;
        }
    }

}

int solution(string begin, string target, vector<string> words) {
    target_value=target;
    Words=words;

    dfs(begin,0);

    if(min_cnt==100) return 0;
    else return min_cnt;

}
```

## 실수 메모

예제는 통과 했는데 최종 테스트케이스 3번에서 자꾸 실패가 떴다. 구글링 해서 다른 사람의 코드와 비교 해 보아도 접근 방법은 동일했기 때문에 이유를 찾아보느라 시간이 걸렸다.

결국 발견 했는데 잘못된 인덱스로 배열을 참조하고 있던 문제였다.

```cpp
vector<string> Words;
vector<int> check (Words.size());
```

입력 값인 words배열을 solutions배열 밖에 있는 dfs 함수에서 사용하기 위해 전역 배열에 복사 하기 위해 Words라는 벡터를 생성했다.
그리고 그 Words의 사이즈로 check의 사이즈를 초기화 시켰다..
Words는 생성될 때 크기가 0이고 solution함수 내에서 값이 있는 벡터를 할당해 준다.
따라서 solutiong함수가 실행되기 전까진 사이즈가 0이다.
사이즈 0으로 체크 배열을 초기화 했고, dfs내에선 check배열 인덱스를 벗어나는 값을 참조하기 때문에 실패했다.

평소라면 정해진 인덱스를 벗어난 인덱스를 참조하면 에러가 떴을 텐데 에러가 전-혀 뜨지 않았고 실행이 잘 되었다.

```cpp
int check[51];
vector<int> c(1);
...
cout<<c[500]<<endl;
cout<<check[500]<<endl;
```

이렇게 배열의 길이를 벗어나는 값을 인덱스로 사용해도 오류가 생기지 않고 값을 출력했따..
내부적으로 해당 주소에 쓰레기 값이 들어있었던듯 하다.

따라서 결론은
컴파일을 너무 신뢰하지 말고 정확하게 판단하고 사용하자.
