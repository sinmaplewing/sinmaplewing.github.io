---
id: 3054
title: '#UVa：1225－Digit Counting'
slug: uva：1225－digit-counting
date: '2016-04-14T17:59:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 12
permalink: /2016/04/14/3054/uva%ef%bc%9a1225%ef%bc%8ddigit-counting/
wp_status: publish
wp_type: post
---

計算0~9在每一位的每個數字中佔多少個，加總即可得解。

假設算十位數的1~1234之中出現0~9(令為i)的個數，可分成[latex]i = 0[/latex]與[latex]i \neq 0[/latex]。

* 若i為0的話，在十位數出現0的數字即為100、101、102......200、201、202.....、.....、1200、1201、1202......，即為[latex]12 \times 10[/latex]。
* 若i不為0的話，分為該位數字(1234的十位數數字3)比i大、與i相同、比i小。
  * 比i大，例如[latex]i = 2[/latex]，在十位數出現2的數字即為20、21、22......120、121、122.....220、221、222.....、......、1220、1221、1222.....，即為[latex](12 + 1) \times 10[/latex]。
  * 與i相同，例如[latex]i = 3[/latex]，在十位數出現3的數字即為30、31、32......130、131、132.....230、231、232.....、......、1230、1231、1232、1233、1234，即為[latex]12 \times 10 + (4 + 1)[/latex]。
  * 比i小，例如[latex]i = 4[/latex]，在十位數出現4的數字即為40、41、42......140、141、142.....240、241、242.....、......、1140、1141、1142......，即為[latex](12 - 1) \times 10[/latex]。

P.S. i為0時其實也應該分三種狀況，只是該位數字不可能比0小，所以只會有兩種情形。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 1225 Digit Counting                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int caseTotal;
  while( scanf("%d", &caseTotal) != EOF ){
    for( int caseNumber = 0 ; caseNumber < caseTotal ; ++caseNumber ){
      int N;
      scanf("%d", &N);
      
      for( int i = 0 ; i <= 9 ; ++i ){
        int value = N;
        int digit = 1;
        int lastDigit = 0;
        int number = 0;
        while( value > 0 ){
          if( i == 0 ){
            if( value % 10 == i ){
              number += (value / 10 - 1) * digit + lastDigit + 1;
            }
            else{
              number += value / 10 * digit;
            }
          } 
          else{
            if( value % 10 < i ){
              number += value / 10 * digit;
            }
            else if( value % 10 == i ){
              number += value / 10 * digit + lastDigit + 1;
            }
            else {
              number += (value / 10 + 1) * digit;
            }
          }
          
          lastDigit += value % 10 * digit;
          digit *= 10;
          value /= 10;
        }
        
        if( i > 0 ){
          printf(" ");
        }
        printf("%d", number);
      }
      printf("\n");
    }
  }
  
  return 0;
}
```

