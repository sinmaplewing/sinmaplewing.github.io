---
id: 4236
title: '#UVa：12554－A Special "Happy Birthday" Song!!!'
slug: uva：12554－a-special-happy-birthday-song
date: '2019-04-12T00:42:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 125
permalink: /2019/04/12/4236/uva%ef%bc%9a12554%ef%bc%8da-special-happy-birthday-song/
wp_status: publish
wp_type: post
---

從人數與生日快樂歌的單詞個數先算出最少要唱完整的幾遍才會讓所有人都唱過，之後利用算出來的個數列印出答案即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12554 A Special "Happy Birthday" Song!!!        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/12                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <string>
using namespace std;

int main(){
  const string HAPPY_BIRTHDAY_SONG[] = {
    "Happy", "birthday", "to", "you",
    "Happy", "birthday", "to", "you",
    "Happy", "birthday", "to", "Rujia",
    "Happy", "birthday", "to", "you"
  };
  const int HAPPY_BIRTHDAY_SONG_WORD_COUNT = 16;

  int n;
  while(scanf("%d", &n) != EOF){
    vector<string> names(n);
    for(int i = 0 ; i < n ; ++i){
      cin >> names[i];
    }

    int times = n / HAPPY_BIRTHDAY_SONG_WORD_COUNT + ((n % HAPPY_BIRTHDAY_SONG_WORD_COUNT == 0)? 0 : 1);
    for(int i = 0 ; i < times ; ++i){
      for(int j = 0 ; j < HAPPY_BIRTHDAY_SONG_WORD_COUNT ; ++j){
        int nameIndex = (i * HAPPY_BIRTHDAY_SONG_WORD_COUNT + j) % n;
        printf("%s: %s\n", names[nameIndex].c_str(), HAPPY_BIRTHDAY_SONG[j].c_str());
      }
    }
  }
  return 0;
}
```
