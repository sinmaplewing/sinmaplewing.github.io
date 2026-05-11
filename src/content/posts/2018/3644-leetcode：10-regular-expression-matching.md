---
id: 3644
title: '#LeetCode：10. Regular Expression Matching'
slug: leetcode：10-regular-expression-matching
date: '2018-09-30T02:28:58+08:00'
lastmod: '2018-09-30T02:36:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/09/30/3644/leetcode%ef%bc%9a10-regular-expression-matching/
wp_status: publish
wp_type: post
---

最簡單的方式就是用 Backtracking 法（遞迴暴力法）一個一個去對，對錯了就回頭。但本題還可以優化成 DP 去解，與 LCS 或是 Edit Distance 的字串比對 DP 表公式有點類似，每一格 `dp[i][j]` 的意思是 `s[1...i]` 與 `p[1...j]` 的比對結果， `i` 與 `j` 為 0 時表示為該字串是空字串的時候，接著 DP 的公式含義如下：

1. `i` 與 `j` 都為 0 ，兩邊都是空字串自然是個完美比對，故為 `true`。
2. `j = 0` 而 `i > 0` ，則表示正規表達式是空字串，而該比對的字串有字，比對不成功，故皆為 `false`。
3. `i = 0` 而 `j > 0` ，則若正規表達式的前端皆為某個東西接 `*` 的話，則在為 `*` 的那時比對會是 `true` ，若中間出現了一個不是 `*` 的 pattern ，則就無法與空字串比對為成功，從那之後不管正規表達式裡有什麼就皆為 `false` 。
4. `i > 0` 而 `j > 0` ，需分成兩種狀況：
	1. `s[i] == p[j] || p[j] == '.'` ，則表示兩字比對成功，則結果就取決於將兩邊比對成功的這組拿掉後的結果，故 `dp[i][j] = dp[i-1][j-1]`。
	2. `p[j] == '*'`，則有兩種可以的方式比對，將兩種方式的結果 OR 起來即是 `dp[i][j]` 的結果。
		1. `*` 可以為 0 ，則表示結果可以取決於這組 `*` 不在的狀況，也就是 `dp[i][j-2]` 。
		2. 若這組所選的字剛好可以跟 `s[i]` 比對，也就是 `s[i] == p[j-1] || p[j-1] == '.'` ，則結果也可以取決於將 s[i] 吃掉後的結果，也就是 `dp[i-1][j]` 。

這樣求到最後 `dp[s.length()][p.length()]` 即是答案。

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 10. Regular Expression Matching            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/30                                 */
/*******************************************************/
#include <vector>

class Solution {
public:
  bool isMatch(string s, string p) {
    vector<vector<bool>> dp(s.length() + 1, vector<bool>(p.length() + 1, false));

    /* Empty String */
    dp[0][0] = true;

    /* "" v.s. X*X*X*..... */
    for(int i = 2 ; i <= p.length() && p[i-1] == '*' ; i += 2){
      dp[0][i] = true;
    }

    /* s[0...i-1] v.s. p[0...j-1] */
    for(int i = 1 ; i <= s.length() ; ++i){
      for(int j = 1 ; j <= p.length() ; ++j ){
        int sIndex = i-1;
        int pIndex = j-1;

        if(p[pIndex] == '.' || s[sIndex] == p[pIndex]){
          dp[i][j] = dp[i-1][j-1];
        }
        else if(p[pIndex] == '*'){
          dp[i][j] = dp[i][j-2] || ((s[sIndex] == p[pIndex-1] || p[pIndex-1] == '.') && dp[i-1][j]);
        }
      }
    }

    return dp[s.length()][p.length()];
  }
};
```
