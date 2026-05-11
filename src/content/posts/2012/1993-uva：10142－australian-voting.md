---
id: 1993
title: '#UVa：10142－Australian Voting'
slug: uva：10142－australian-voting
date: '2012-11-10T16:30:37+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/11/10/1993/uva%ef%bc%9a10142%ef%bc%8daustralian-voting/
wp_status: publish
wp_type: post
---

只要候選人中，票數過半者則直接中獎。若未有人過半，則要檢查是否大家都一樣票(max == min ?)，若一樣的話，就全部輸出；若有不同的，去掉票數最小的那些人，重新再算票。

P.S. 算票時，以第一位為論。

**C++(0.912)**
```cpp
/*******************************************************/
/* UVa 10142 Australian Voting                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/10                                 */
/*******************************************************/
#include <iostream>
#include <sstream>
#include <cstdio>
#include <vector>
using namespace std;

struct Candidate{
  Candidate(){ ballot_count = 0; eliminate = false; }

  string name;
  int ballot_count;
  bool eliminate;
};

struct Ballot{
  Ballot(){ vote.clear(); }
  vector<int> vote;
};

int main(){
  int case_count;

  while( scanf( "%d", &case_count ) != EOF ){
    int n;

    for( int i = 0 ; i < case_count ; i++ ){
      scanf( "%d", &n );
      getchar();

      Candidate all_cand[25];
      int total_ballot = 0;
      Ballot ballot[1005];
      for( int j = 1; j <= n ; j++ )
        getline( cin, all_cand[j].name );

      string input;
      int vote;
      while( getline( cin, input ) && input != "" ){
        stringstream ss( input );
        for( int j = 0 ; j < n ; j++ ){
          ss >> vote;
          ballot[total_ballot].vote.push_back(vote);
        }
        ++total_ballot;
      }

      int max_ballot, min_ballot;
      while( true ){
        max_ballot = 0;
        min_ballot = 2147483647;
        for( int j = 0 ; j < total_ballot ; j++ )
          all_cand[ballot[j].vote[0]].ballot_count++;
        for( int j = 1 ; j <= n ; j++ ){
          if( !all_cand[j].eliminate ){
            max_ballot = max( all_cand[j].ballot_count, max_ballot );
            min_ballot = min( all_cand[j].ballot_count, min_ballot );
          }
        }
        if( max_ballot > total_ballot/2 ) break;
        if( max_ballot == min_ballot ) break;

        for( int j = 1 ; j <= n ; j++ ){
          if( all_cand[j].ballot_count == min_ballot ){
            for( int k = 0 ; k < total_ballot ; k++ )
              for( int l = 0 ; l < ballot[k].vote.size() ; l++ )
                if( ballot[k].vote[l] == j ){
                  ballot[k].vote.erase( ballot[k].vote.begin()+l );
                  break;
                }
            all_cand[j].eliminate = true;
          }
          all_cand[j].ballot_count = 0;
        }
      }
      if( i ) printf( "\n" );
      for( int j = 1 ; j <= n ; j++ ){
        if( all_cand[j].ballot_count == max_ballot )
          printf( "%s\n", all_cand[j].name.c_str() );
      }
    }
  }
  return 0;
}
```
