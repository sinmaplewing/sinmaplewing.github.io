---
id: 2719
title: '#UVa：119－Greedy Gift Givers'
slug: uva：119－greedy-gift-givers
date: '2015-03-15T10:34:49+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/03/15/2719/uva%ef%bc%9a119%ef%bc%8dgreedy-gift-givers/
wp_status: publish
wp_type: post
---

照題目算出每個人給的錢和得到的錢的差距即可。

給錢的時候，在無法完美平分的情況下，實際上只有給能夠完美平分的最大價格而已。例如：要給3個人200元，則每人可得66元，實際上該人只有付出198元，在算的時候要當做是付出198元而不是付出200元。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 119 Greedy Gift Givers                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <vector>
using namespace std;

struct Person{
  string name;
  int price;
};

int findPersonIndex(const vector<Person> &group, const string &name){
  for( int i = 0 ; i < group.size() ; ++i ){
    if( group[i].name == name ){
      return i;
    }
  }
  return -1;
}

int main(){
  bool hasPrinted = false;
  int peopleNumber;
  while( scanf("%d", &peopleNumber) != EOF ){
    if( hasPrinted ) printf("\n");
    Person person;
    vector<Person> group;

    person.price = 0;
    for( int i = 0 ; i < peopleNumber ; ++i ){
      cin >> person.name;
      group.push_back(person);
    }

    for( int i = 0 ; i < peopleNumber ; ++i ){
      string giver, given;
      int price, givenPersonNumber;
      
      cin >> giver;
      int giverIndex = findPersonIndex(group, giver);

      scanf("%d%d", &price, &givenPersonNumber);
      if( givenPersonNumber != 0 ){
        int payPerOnePerson = price / givenPersonNumber;
        group[giverIndex].price -= payPerOnePerson * givenPersonNumber;

        for( int j = 0 ; j < givenPersonNumber ; ++j ){
          cin >> given;
          int givenIndex = findPersonIndex(group, given);
          group[givenIndex].price += payPerOnePerson;
        }
      }
    }

    for( int i = 0 ; i < peopleNumber ; ++i ){
      printf("%s %d\n", group[i].name.c_str(), group[i].price);
    }
    hasPrinted = true;
  }
  return 0;
}
```
