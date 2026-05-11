---
id: 5079
title: '#LeetCode：468. Validate IP Address'
slug: leetcode：468-validate-ip-address
date: '2020-06-17T01:19:35+08:00'
lastmod: '2020-06-17T01:20:18+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/17/5079/leetcode%ef%bc%9a468-validate-ip-address/
wp_status: publish
wp_type: post
---

此題給予一個 IP 位置，想知道該 IP 位置是否合法，且還要分辨出是 IPv4 還是 IPv6 種類的位置。

依據題目要求去判斷：

* 如果位置內有`.`的話，進行 IPv4 的判斷：
    * 依照`.`去切割，如果沒有恰好 4 項則不合法，若有 4 項的話繼續分項判斷：
        * 該項如果是空白，即不合法
        * 該項如果有任何一個字不是數字，即不合法
        * 該項如果非 0，但前面卻出現了 0，即不合法
        * 將該項轉成一個數值，如果無法轉換成功，即不合法
        * 轉換完成後，判斷該值是否介在 0 到 255 之間，如果沒有，即不合法
        * 通過以上測試，則是一個合法的 IPv4 位置
* 如果位置內有`:`的話，進行 IPv6 的判斷：
    * 依照`:`去切割，如果沒有恰好 8 項則不合法，若有 8 項的話繼續分項判斷：
        * 該項如果是空白，即不合法
        * 該項的長度如果不小於等於 4，即不合法
        * 該項裡面出現了不是 0 到 9、a(A) 到 f(F) 的值，即不合法。
        * 通過以上測試，則是一個合法的 IPv6 位置

**Kotlin(160ms)**
```kotlin
/*******************************************************
 * LeetCode 468. Validate IP Address                   *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/17                                 *
 *******************************************************/
class Solution {
    fun isValidIPv4Item(item: String): Boolean {
        if (item.isEmpty()) return false
        if (item.any { !it.isDigit() }) return false
        if (item.first() == '0' && item.length != 1) return false 
        
        val number = item.toIntOrNull()
        if (number == null) return false

        return number >= 0 && number <= 255
    }
    
    fun isValidIPv4(IP: String): Boolean {
        val ipGroup = IP.split(".")
        if (ipGroup.size != 4) return false
        
        return ipGroup.all { isValidIPv4Item(it) }
    }
        
    fun isValidIPv6Item(item: String): Boolean {
        if(item.isEmpty()) return false
        return item.length <= 4 && item.all { c -> 
            (c >= '0' && c <= '9') ||
            (c >= 'a' && c <= 'f') ||
            (c >= 'A' && c <= 'F')
        }
    }
    
    fun isValidIPv6(IP: String): Boolean {
        val ipGroup = IP.split(":")
        if (ipGroup.size != 8) return false
        
        return ipGroup.all { isValidIPv6Item(it) }
    }
    
    fun validIPAddress(IP: String): String =
        if (IP.contains(".")) {
            if (isValidIPv4(IP)) "IPv4" else "Neither"
        } else if (IP.contains(":")) {
            if (isValidIPv6(IP)) "IPv6" else "Neither"
        } else {
            "Neither"
        }
}
```
