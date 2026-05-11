---
id: 4977
title: '#LeetCode：918. Maximum Sum Circular Subarray'
slug: leetcode：918-maximum-sum-circular-subarray
date: '2020-05-16T01:45:51+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/16/4977/leetcode%ef%bc%9a918-maximum-sum-circular-subarray/
wp_status: publish
wp_type: post
---

此題要找出，在陣列可循環的時候，其連續的子陣列中總和最大是多少。

提示的部分有提到這題在不循環的時候可以使用 `Kadane's algorithm`，即從頭開始做加總，如果其中加到總和變成負的，則就不管前面的總和，從該元素重新計算總和，最後找出每一段總和中最大的即是不循環時的答案。

而循環的部分，可以想成是找出不選某段連續的子陣列後，可以造成的最大總和是多少。透過這個想法，就變成在使用 `Kadane's algorithm` 的時候，是從陣列總和往下減一段連續的子陣列讓總和變大，如果減的過程出現的結果比陣列總和還低，則就不管前面不選哪些元素，從該元素重新從陣列總和繼續往下減，最後找出每一段減完最大的即是必定循環時的答案。

最後就將上述找到的兩個解答再取最大即是本題的答案。

P.S. 在做不選的部分的時候，記得不能不選整個陣列，一定至少要選一個元素。

**Kotlin(312ms)**
```kotlin
/*******************************************************
 * LeetCode 918. Maximum Sum Circular Subarray         *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/16                                 *
 *******************************************************/
class Solution {
    fun maxSubarraySumCircular(A: IntArray): Int {
        var maxSum = Int.MIN_VALUE
        var currentSum = 0
        
        // Case 1: Take a subarray
        for (num in A) {
            currentSum = if (currentSum < 0) {
                num
            } else {
                currentSum + num
            }
            
            maxSum = Math.max(maxSum, currentSum)
        }
        
        // Case 2: Not take a subarray
        val totalSum = A.sum()
        var notTakeCount = 0
        currentSum = totalSum
        for (num in A) {
            if (currentSum < totalSum) {
                notTakeCount = 0
                currentSum = totalSum - num
            } else {
                ++notTakeCount
                currentSum -= num
            }
            
            if (notTakeCount < A.size) {
                maxSum = Math.max(maxSum, currentSum)
            }
        }
        
        return maxSum
    }
}
```
