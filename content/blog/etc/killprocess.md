---
title: '특정 포트에서 실행중인 프로세스 종료하기'
date: 2021-11-30 20:11:24
category: etc
thumbnail: { thumbnailSrc }
draft: false
---

특정 포트의 프로세스 id를 확인 -> 해당 프로세스 id로 프로세스를 종료시킵니다.

## 포트에 실행중인 프로세스 id 확인

```shell
sudo lsof -i:포트번호

```

## 해당 프로세스 종료

```shell
sudo kill -9 프로세스 번호

```

## 사용 예시

```shell
sudo lsof -i:8000
sudo kill -9 45029
```
