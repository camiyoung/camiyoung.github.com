---
title: '[프로그래머스] 큰 수 만들기 c++ '
date: 2021-12-15 18:49:12
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🔢
---

# 큰 수 만들기

주어진 숫자에서 k개의 숫자를 제거할 때, 제거한 후 만들 수 있는 최댓값을 찾는 문제.

## 풀이 및 코드

### 풀이

스택을 이용했다. 주어진 숫자를 하나씩 검사한다. 현재 숫자가 stack의 top보다 크면 현재 숫자 보다 스택의 top이 작을 동안 스택의 숫자를 제거하고 현재 숫자를 삽입한다. 주어진 숫자에서 숫자를 제거만 할 뿐, 숫자들의 순서는 바뀌지 않는다.

**제거할 때 주의 사항**
스택에서 작은 값을 뺄 때 개수를 주의해야 한다.
현재 스택의 크기 + 아직 검사하지 않은 숫자 개수가 최종 길이보다 클동안만 빼야 한다.
그렇지 않으면 k개를 초과해서 삭제할 수 있다.

스택 크기 + 체크하지 않은 숫자 개수 = 최종 길이 라면 체크하지 않은 숫자를 모두 삽입해준다.

### 코드

```cpp
#include <string>
#include <vector>
#include <stack>
#include <algorithm>
#include <iostream>
using namespace std;

string solution(string number, int k) {
    string answer = "";
    stack<int> st;
    int resDigit=number.size()-k; //k개를 뺀 최종 결과물 길이

    for(int i=0;i<number.size();i++){
        if(st.empty()){
            st.push(number[i]);
        }
        else{
          int notCheck=number.size()-i; //아직 검사하지 않은 숫자 개수
            while(!st.empty()&&st.top()<number[i] && st.size()+notCheck>resDigit ){
                    st.pop();
                }
            if(st.size()<resDigit){
                st.push(number[i]);
            }
        }
    }

  while(!st.empty()){
        answer.push_back(st.top());
        st.pop();
  }

    reverse(answer.begin(),answer.end());

    return answer;
}
```

![](https://images.velog.io/images/anji00/post/b250e56c-e014-47cf-856c-b36252e76697/image.png)
[문제 출처 : 프로그래머스 큰 수 만들기](https://programmers.co.kr/learn/courses/30/lessons/42883?language=cpp#)
