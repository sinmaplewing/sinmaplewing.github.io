---
id: 3561
title: '#LeetCode：1. Two Sum'
slug: leetcode：1-two-sum
date: '2018-05-23T00:53:38+08:00'
lastmod: '2020-08-25T10:07:27+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
- Hash Table
permalink: /2018/05/23/3561/leetcode%ef%bc%9a1-two-sum/
wp_status: publish
wp_type: post
---

## 題目大綱

此題要找出陣列中是否有兩個數字能夠加起來等於指定的數字，並將找到的兩個數字回傳回來。

## 測試資料

### 輸入資料
```
[2,7,11,15]
9
```

### 輸出資料
```
[0,1]
```

## 題目網址
[LeetCode Online Judge](https://leetcode.com/problems/two-sum/)

## 解法思考
建 Hash 表將所選到之數字 `a` 所不足的那格 `target - a` 把自己的 index `(i)` 紀錄下來，這樣等到該不足之數 `target - a` 出現的時候可以直接查到與第 `i` 格湊起來即是答案。

## 解法程式碼

### Kotlin(172ms)
```kotlin
/*******************************************************/
/* LeetCode 1. Two Sum                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/06                                 */
/*******************************************************/
class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val complementMap = mutableMapOf<Int, Int>()

        for (i in nums.indices) {
            if (complementMap.containsKey(nums[i])) {
                val complementNumber = complementMap[nums[i]]
                if (complementNumber != null) {
                    return intArrayOf(complementNumber, i)
                }
            }

            complementMap[target - nums[i]] = i
        }

        return IntArray(0)
    }
}
```

### C++(10ms)
```cpp
/*******************************************************/
/* LeetCode 1. Two Sum                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/23                                 */
/*******************************************************/
class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    map<int, int> complementMap;
    for(int i = 0 ; i < nums.size() ; ++i){
      auto complement = complementMap.find(nums[i]);
      if(complement != complementMap.end()){
        int result[] = {complement->second, i};
        return vector<int>(result, result + 2);
      }
      complementMap[target - nums[i]] = i;
    }
  }
};
```
