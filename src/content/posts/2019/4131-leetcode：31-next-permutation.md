---
id: 4131
title: '#LeetCode：31. Next Permutation'
slug: leetcode：31-next-permutation
date: '2019-03-29T23:55:35+08:00'
lastmod: '2019-03-29T23:56:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/03/29/4131/leetcode%ef%bc%9a31-next-permutation/
wp_status: publish
wp_type: post
---

最簡單的方式就是用 C++ 內建的 `next_permutation` 就解決了！

如果真的要稍微自己寫的話，大概可以分為三個步驟：
1. 先從後面找起來，看有多長的部分已經從大到小排好了，然後找到從大到小那段前面那個比較小的數字。
2. 如果不是全段都已經從大到小了，也就是有找到前一項所說的數字，則將該數字與從大到小的後面那段裡面離它數量最近比較大或等於的數字交換。
3. 接著將該段從大到小的數字區段再反過來即可。

至於上面三個步驟的含意是，已經從大到小排好的數字區段即表示已經完成這些數字的排列組合的部分有多長，接著就是將離這段最近的數字放進去再從頭開始排列組合。

參考做法：[LeetCode Discussion](https://leetcode.com/problems/next-permutation/discuss/13921/1-4-11-lines-C%2B%2B)

**C++(8ms)[內建函示庫作法]**
```cpp
/*******************************************************/
/* LeetCode 31. Next Permutation                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/29                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  void nextPermutation(vector<int>& nums) {
    next_permutation(nums.begin(), nums.end());
  }
};
```

---

**C++(8ms)[實際實作作法]**
```cpp
/*******************************************************/
/* LeetCode 31. Next Permutation                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/29                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  void nextPermutation(vector<int>& nums) {
    auto next_item = is_sorted_until(nums.rbegin(), nums.rend());
    if(next_item != nums.rend()){
      swap(*next_item, *upper_bound(nums.rbegin(), next_item, *next_item));
    }
    reverse(nums.rbegin(), next_item);
  }
};
```
