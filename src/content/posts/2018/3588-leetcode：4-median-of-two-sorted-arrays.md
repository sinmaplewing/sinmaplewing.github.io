---
id: 3588
title: '#LeetCode：4. Median of Two Sorted Arrays'
slug: leetcode：4-median-of-two-sorted-arrays
date: '2018-09-24T20:40:24+08:00'
lastmod: '2019-05-01T00:49:02+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/09/24/3588/leetcode%ef%bc%9a4-median-of-two-sorted-arrays/
wp_status: publish
wp_type: post
---

找尋某一群 n 個排序好的數字的中位數在這題的定義即是 
[latex]
median(a_1 ... a_n) = \begin{cases}
a_{\left\lceil\frac{n}{2}\right\rceil} & \text{if n is odd} \\\\
\frac{a_\frac{n}{2} + a_{\frac{n}{2} + 1}}{2} & \text{if n is even}
\end{cases}
[/latex]

接著這道題目就會變成如何找出兩個排序好的陣列的第 k 項，我們可以利用兩邊對 k 分半的方式去比較找出。

如果我要找出排序好的兩個陣列 a 和 b 合併後的第 k 項，那我就先找出兩邊陣列目前的第[latex] \frac{k}{2} [/latex] 項。如果[latex] a_\frac{k}{2} < b_\frac{k}{2} [/latex]則表示 a 的前 [latex] \frac{k}{2} [/latex] 都比 b 的前 [latex] \frac{k}{2} [/latex] 項小，則第 k 項絕不可能在這 a 的前 [latex] \frac{k}{2} [/latex] 項中；反之亦然。（證明方式可以用反證，如果第 k 項會在這之中，表示至少要從 b 這邊拿 [latex] \frac{k}{2} [/latex] 去補前面不夠的數量，但 b 的第 [latex] \frac{k}{2} [/latex] 項比它大，故不足，所以不可能。）

排除掉 a 的前  [latex] \frac{k}{2} [/latex] 項後，再找尋剩下的數字第 [latex] k - \frac{k}{2} [/latex] 項即可，以此類推直到 a 陣列或 b 陣列沒有值，或是找到只剩一項為止。

**參考解法：**[GoodTecher](https://www.youtube.com/watch?v=oVPIQdHt_T8)

**C++(44ms)**
```cpp
/*******************************************************/
/* LeetCode 4. Median of Two Sorted Arrays             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/24                                 */
/*******************************************************/
#include <cstdlib>
#include <climits>

class Solution {
public:
  double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
      int totalLength = nums1.size() + nums2.size();
      if (totalLength % 2 == 1){
        return findKthElement(nums1, 0, nums2, 0, totalLength / 2 + 1);
      }
      else{
        return (findKthElement(nums1, 0, nums2, 0, totalLength / 2) +
                findKthElement(nums1, 0, nums2, 0, totalLength / 2 + 1)) / 2.0;
      }

  }

  double findKthElement(vector<int>& nums1, int start1, vector<int>& nums2, int start2, int k){
    if (start1 >= nums1.size()){
      return nums2[start2 + k - 1];
    }
    if (start2 >= nums2.size()){
      return nums1[start1 + k - 1];
    }

    if(k == 1){
      return min(nums1[start1], nums2[start2]);
    }

    int index1 = start1 + k / 2 - 1;
    int index2 = start2 + k / 2 - 1;
    int element1 = index1 < nums1.size() ? nums1[index1] : INT_MAX;
    int element2 = index2 < nums2.size() ? nums2[index2] : INT_MAX;

    if (element1 < element2){
      return findKthElement(nums1, start1 + k / 2, nums2, start2, k - k / 2);
    }
    else{
      return findKthElement(nums1, start1, nums2, start2 + k / 2, k - k / 2);
    }

  }
};
```

**Kotlin(260ms)**
```kotlin
/*******************************************************/
/* LeetCode 4. Median of Two Sorted Arrays             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/05/01                                 */
/*******************************************************/
class Solution {
    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
        val totalLength = nums1.size + nums2.size
        return if(totalLength % 2 == 1) findKthElement(nums1, 0, nums2, 0, totalLength / 2 + 1).toDouble()
            else (findKthElement(nums1, 0, nums2, 0, totalLength / 2) +
                findKthElement(nums1, 0, nums2, 0, totalLength / 2 + 1)).toDouble() / 2.0
    }

    fun findKthElement(nums1: IntArray, start1: Int, nums2: IntArray, start2: Int, k: Int) : Int {
        if(start1 >= nums1.size) return nums2[start2 + k - 1]
        if(start2 >= nums2.size) return nums1[start1 + k - 1]
        if( k == 1 ) return minOf(nums1[start1], nums2[start2])

        val index1 = start1 + k / 2 - 1
        val index2 = start2 + k / 2 - 1
        val element1 = if(index1 < nums1.size) nums1[index1] else Int.MAX_VALUE
        val element2 = if(index2 < nums2.size) nums2[index2] else Int.MAX_VALUE

        return if(element1 < element2) findKthElement(nums1, start1 + k / 2, nums2, start2, k - k / 2)
            else findKthElement(nums1, start1, nums2, start2 + k / 2, k - k / 2)
    }
}
```
