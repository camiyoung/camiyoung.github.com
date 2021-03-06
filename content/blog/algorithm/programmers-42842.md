---
title: '[프로그래머스] 카펫 c++'
date: 2021-11-30 16:11:41
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🏠
---

Level 2 카펫

---

# 카펫

[문제 출처 : 프로그래머스 카펫 ](<[https://programmers.co.kr/learn/courses/30/lessons/42842](https://programmers.co.kr/learn/courses/30/lessons/42842)>)

노란색과 갈색 사각형의 개수가 주어진다. 노란색으로 이루어진 사각형을 갈색이 테두리를 두르고 있도록 만들어서 비교하였다.

## 접근 방법

- 주어진 노란색의 개수들로 만들 수 있는 사각형의 모양을 모두 구한다
- 각 노란 사각형에 따라 필요한 갈색 사각형의 개수를 구한다.
- 구한 갈색 사각형의 개수가 문제에서 주어진 갈색 값과 맞으면 정답이므로 리턴한다.

## 풀이 및 코드

사각형의 넓이는 가로 \* 세로 이므로 둘 중 하나라도 알고 있다면 다른 변수의 값을 알 수있다.
노란색의 약수들을 구해서 (가로는 노란색개수/약수, 세로는 약수 ) 로 정하였다.

노란색 사각형의 가로,세로가 정해지면 필요한 갈색의 개수도 구할 수 있다.
갈색은 노란색을 한줄로 감싸고 있으므로 가로는 노란색의 개수 + 2 , 세로도 노란색 개수 +2 임을 알 수 있다.
네 변을 모두 감싸고 있으므로 가로*2 + 세로 *2 - 4(중복으로 더하는 값)을 해주면 갈색의 개수가 나온다.

이렇게 도출한 갈색들과 문제에서 주어진 값과 맞는지 확인한다.

```cpp
#include<bits/stdc++.h>
#define width first
#define height second
using namespace std;

vector<int> solution(int brown, int yellow) {
    vector<int> answer;
    vector<pair<int,int> > length;
    for(int i=1;i*i<=yellow; i++){
        if(yellow%i==0){
            length.push_back(make_pair(yellow/i,i));
        }
    }

    for(auto ye:length){
        int Bwidth=ye.width+2;
        int Bheight=ye.height+2;
        int Btotal=Bwidth*2+Bheight*2-4;
        if(Btotal==brown){
            answer.push_back(Bwidth);
            answer.push_back(Bheight);
            break;
        }
    }
    return answer;
}
```

## 또 다른 방법

다른 사람의 풀이를 보고 알게 된 방법이다. 주어진 갈색으로 만들 수 있는 최소한의 사각형에서부터 최종 사각형의 넓이를 비교해가며 가로,세로의 길이를 각각 줄이고 늘려주는 방법이다.
완전 탐색에 좀 더 충실한 풀이인듯 하다.

```cpp
#include <string>
#include <vector>

using namespace std;

vector<int> solution(int brown, int red) {

    int len = brown / 2 + 2;

    int w = len - 3;
    int h = 3;

    while(w >= h){
        if(w * h == (brown + red)) break;

        w--;
        h++;
    }

    return vector<int>{w, h};
}
```
