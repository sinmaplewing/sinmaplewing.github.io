---
id: 3616
title: '#LeetCode：6. ZigZag Conversion'
slug: leetcode：6-zigzag-conversion
date: '2018-09-26T09:31:51+08:00'
lastmod: '2019-05-02T22:49:26+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/09/26/3616/leetcode%ef%bc%9a6-zigzag-conversion/
wp_status: publish
wp_type: post
---

找出每一行的 index 會怎麼跳即可。至於怎麼跳的方式寫在下面：
1. `row = 0` 和 `row = numRows - 1` 的情況，第一項是從 `index = row` 開始，往後 index 的跳法是 `2 * (numRows - 1)` 。
2. 其餘的情況，可以從最上面的那排去想，每一行的某一項會是與最上面那排的那項相差往前 `row` 個和往後 `row` 個，這樣就可以找到該行的每一項。

**C++(20ms)**
```cpp
/*******************************************************/
/* LeetCode 6. ZigZag Conversion                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/26                                 */
/*******************************************************/
class Solution {
public:
  string convert(string s, int numRows) { 
    int sLength = s.length();
    if(sLength <= numRows || numRows == 1) return s;
    
    int distance = 2 * (numRows - 1);
    string zigzagOrderString = "";

    for(int row = 0 ; row < numRows ; ++row){
      if(row == 0 || row == numRows - 1){
        for(int i = row ; i < sLength ; i += distance){
          zigzagOrderString += s[i];
        }
      }
      else{
        for(int i = 0 ; i - row < sLength ; i += distance){
          if( i - row >= 0 ) zigzagOrderString += s[i - row];
          if( i + row < sLength ) zigzagOrderString += s[i + row];
        }
      }
    }
    
    return zigzagOrderString;
  }
};
```

**Kotlin(228ms)**
```kotlin
/*******************************************************/
/* LeetCode 6. ZigZag Conversion                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/05/02                                 */
/*******************************************************/
class Solution {
    fun convert(s: String, numRows: Int): String {
        if(s.length <= numRows || numRows == 1) return s

        val distance = 2 * (numRows - 1)
        var zigzagOrderString = StringBuilder()
        for(row in 0 until numRows){
            if(row == 0 || row == numRows - 1){
                for(i in row until s.length step distance){
                    zigzagOrderString.append(s[i])
                }
            }
            else{
                for(i in 0 until row + s.length step distance){
                    if(i - row >= 0) zigzagOrderString.append(s[i - row])
                    if(i + row < s.length) zigzagOrderString.append(s[i + row])
                }
            }
        }

        return zigzagOrderString.toString()
    }
}
```
