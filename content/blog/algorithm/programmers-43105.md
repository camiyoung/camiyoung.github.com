---
title: '[프로그래머스] 정수 삼각형 c++ '
date: 2021-12-22 15:49:22
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
emoji: 🔺
---

# 정수 삼각형

![](https://images.velog.io/images/anji00/post/7dfbc9e1-e94f-4c58-a901-b1222b085230/image.png)
삼각형으로 숫자가 주어 졌을 때 꼭대기에서 바닥까지 이어지는 경로 중 거쳐간 숫자의 합이 가장 큰 경우를 찾는다. 숫자를 기준으로 대각성 방향으로만 이동 가능하다.

## 풀이 및 코드

### 풀이

DP방식으로 풀면 쉽게 풀린다. 가장 말단 층부터 꼭대기까지 더해가며 올라간다.
주어진 triangle 을 활용해서 가장 마지막 노드들 부터 계산한다.
![](https://images.velog.io/images/anji00/post/79722709-24b6-4eb5-b9ec-a03811fbb05e/image.png)

res배열의 가장 마지막 줄은 기존의 triangle배열들로만 연산을 한다.

채우는 자리가 [i][j]라고 한다면 triangle[i][j] + max(triangle[i+1][j],triangle[i+1][j+1] 의 값을 채운다.

그 윗줄 부터는 앞서 연산해둔 값들을 이용해서 큰값들을 찾아 누적해서 더한다.
![](https://images.velog.io/images/anji00/post/b39447c4-6bd9-4573-883e-a419a740583f/image.png)

최종 생성된 배열
![](https://images.velog.io/images/anji00/post/11d1006a-1042-41c9-a520-6708ec561261/image.png)
이 배열의 가장 꼭대기 값([0][0])이 결과값이된다.

### 코드

```cpp
#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> triangle) {
    int answer = 0;
    int height=triangle.size();
    vector<vector<int>> res(height);

    int last_height=height-1;
    for(int j=0;j<triangle[last_height-1].size();j++){
        int tmp=max(triangle[last_height-1][j]+triangle[last_height][j],triangle[last_height-1][j]+triangle[last_height][j+1]);
        res[last_height-1].push_back(tmp);
    }

    for(int i=last_height-2;i>=0;i--){
        for(int j=0;j<triangle[i].size();j++){
            int tmp=triangle[i][j]+max(res[i+1][j],res[i+1][j+1]);
            res[i].push_back(tmp);
        }
    }
    answer=res[0][0];
    return answer;
}
```

연산한 결과값을 담을 배열을 새로 생성해서 그만큼의 메모리 사용시간이 붙는다.
새 배열을 추가하지 않고 그냥 기존의 triangle배열 값을 하나씩 변경해서 풀어도 된다.
