---
id: 4168
title: '#LeetCode：35. Search Insert Position'
slug: leetcode：35-search-insert-position
date: '2019-04-01T09:01:28+08:00'
lastmod: '2020-06-11T12:52:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/01/4168/leetcode%ef%bc%9a35-search-insert-position/
wp_status: publish
wp_type: post
---

此題要找目標的數字若要插進已排好的數字陣列中，應該要排在哪個位置上。

利用二分搜尋找尋是否 `target` 是否存在，不存在就找到大於它的第一個值即可。

**Kotlin(168ms)**
```kotlin
/*******************************************************/
/* LeetCode 35. Search Insert Position                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/06/11                                 */
/*******************************************************/
class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {
        if (nums.isEmpty()) return 0
        
        var left = 0
        var right = nums.size
        while (left < right) {
            val mid = left + (right - left) / 2
            val value = nums[mid]
            when {
                value == target -> return mid
                value < target -> left = mid + 1
                value > target -> right = mid
            }
        }
        
        return right
    }
}
```

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 35. Search Insert Position                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/01                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int searchInsert(vector<int>& nums, int target) {
    return lower_bound(nums.begin(), nums.end(), target) - nums.begin();
  }
};
```
