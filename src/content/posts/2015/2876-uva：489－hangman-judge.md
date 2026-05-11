---
id: 2876
title: '#UVa：489－Hangman Judge'
slug: uva：489－hangman-judge
date: '2015-07-26T16:27:59+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2015/07/26/2876/uva%ef%bc%9a489%ef%bc%8dhangman-judge/
wp_status: publish
wp_type: post
---

利用布林陣列紀錄要猜得字和猜過的字去進行比對，即可得解。

**C++(0.625)**
```cpp
/*******************************************************/
/* UVa 489 Hangman Judge                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/07/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

bool isWin( bool allPossible[26], bool allUserGuess[26] ){
  bool isAllGuessed = true;
  for( int i = 0 ; i < 26 ; ++i ){
    if( allPossible[i] && !allUserGuess[i] ){
      isAllGuessed = false;
      break;
    }
  }

  return isAllGuessed;
}

int main(){
  int round;
  while( scanf("%d", &round) != EOF && round != -1 ){
    printf("Round %d\n", round);
    string answer, userAnswer;
    cin >> answer >> userAnswer;

    bool allPossible[26] = {0};
    for( int i = 0 ; i < answer.length() ; ++i ){
      allPossible[(answer[i]-'a')] = true;
    }

    int loseCount = 0;
    bool allUserGuess[26] = {0};
    for( int i = 0 ; i < userAnswer.length() ; ++i ){
      if( !allPossible[(userAnswer[i]-'a')] ){
        ++loseCount;
      }

      allUserGuess[(userAnswer[i]-'a')] = true;

      if( loseCount >= 7 ) break;
      if( isWin(allPossible, allUserGuess) ) break;
    }


    if( loseCount >= 7 ){
      printf("You lose.\n");
    }
    else if( isWin(allPossible, allUserGuess) ){
      printf("You win.\n");
    }
    else {
      printf("You chickened out.\n");
    }
  }

  return 0;
}

```
