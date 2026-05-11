---
id: 2862
title: '#UVa：409－Excuses, Excuses!'
slug: uva：409－excuses-excuses
date: '2015-07-23T09:15:18+08:00'
lastmod: '2015-07-23T09:17:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2015/07/23/2862/uva%ef%bc%9a409%ef%bc%8dexcuses-excuses/
wp_status: publish
wp_type: post
---

比較每句話裡面出現的keyword有幾個再做排序即可。

###P.S.
1. 每個keyword只能算一次，重複出現不累加。
2. 比較時要注意在句子中出現的keyword的前後不得是英文字母。
3. 記得先把要拿來比較的句子全部轉小寫。

**C++(0.001)**
```cpp
/*******************************************************/
/* UVa 409 Excuses, Excuses!                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/07/23                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

struct Sentence{
  string sentence;
  string lowerSentence;
  int wordCount;

  Sentence(){
    wordCount = 0;
  }
};

bool sentenceCompare( const Sentence &a, const Sentence &b ){
  return a.wordCount > b.wordCount;
}

int main(){
  int K, E;
  int set = 1;
  while( scanf("%d%d", &K, &E) != EOF ){
    cin.ignore();

    string words[25];
    for( int i = 0 ; i < K ; ++i ){
      getline(cin, words[i]);
    }

    Sentence sentences[25];
    for( int i = 0 ; i < E ; ++i ){
      getline(cin, sentences[i].sentence);

      sentences[i].lowerSentence = sentences[i].sentence;
      transform(sentences[i].lowerSentence.begin(), sentences[i].lowerSentence.end(),
                sentences[i].lowerSentence.begin(), ::tolower);
      for( int j = 0 ; j < K ; ++j ){
        for( int k = 0 ; k < sentences[i].lowerSentence.length() ; ++k ){
          if( sentences[i].lowerSentence[k] == words[j][0] &&
              ( k-1 < 0 ||
                !isalpha( sentences[i].lowerSentence[k-1] ) ) &&
              ( k+words[j].length() >= sentences[i].lowerSentence.length() ||
                !isalpha( sentences[i].lowerSentence[k+words[j].length()]) ) &&
              sentences[i].lowerSentence.substr(k, words[j].length()) == words[j] ){
            ++sentences[i].wordCount;
            break;
          }
        }
      }
    }

    sort(sentences, sentences+E, sentenceCompare);

    printf("Excuse Set #%d\n", set);
    for( int i = 0 ; i < E ; ++i ){
      if( sentences[i].wordCount != sentences[0].wordCount ){
        break;
      }
      printf("%s\n", sentences[i].sentence.c_str());
    }
    printf("\n");

    ++set;
  }

  return 0;
}
```
