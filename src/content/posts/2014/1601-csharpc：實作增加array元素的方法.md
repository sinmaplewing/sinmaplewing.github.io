---
id: 1601
title: '#CSharp(C#)：實作增加Array元素的方法'
slug: csharpc：實作增加array元素的方法
date: '2014-06-12T10:28:07+08:00'
lastmod: '2019-12-01T23:04:30+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- C#
permalink: /2014/06/12/1601/csharpc%ef%bc%9a%e5%af%a6%e4%bd%9c%e5%a2%9e%e5%8a%a0array%e5%85%83%e7%b4%a0%e7%9a%84%e6%96%b9%e6%b3%95/
wp_status: publish
wp_type: post
---

由於Array的大小是固定的，不像List具有彈性，故要儲存的元素集合若具有增加元素的特性，我們會使用List。但是在某些情況下，我們可能逼不得已得用Array(或是其實增加元素的部分並不多)，而且還是希望能夠增加元素進Array的時候，這時我們就會發現到Array並不支援Add方法以及AddRange方法，不過有提供可以改變Array大小的Resize方法，我們就利用這個方法來實作Add方法以及AddRange方法吧！

# 實作方式

## 利用Array.Resize方法
底下是我們透過Array.Resize來實作Array.Add的程式碼：
```cs
public static class ArrayExtension
{
    public static T[] Add<T>(ref T[] originArray, T element){
        Array.Resize(ref originArray, originArray.Length + 1);
        originArray[originArray.Length - 1] = element;
        return originArray;
    }

    public static T[] AddRange<T>(ref T[] originArray, IEnumerable<T> anotherSet)
    {
        T[] anotherArray = anotherSet.ToArray<T>();
        int originLength = originArray.Length;
        Array.Resize(ref originArray, originArray.Length + anotherArray.Length);
        anotherArray.CopyTo(originArray, originLength);
        return originArray;
    }
}
```
實作Add方法和AddRange方法要注意一個問題，那就是陣列的大小與實際存放的有意義元素個數多寡要一致，否則它不會幫你填滿存放無意義元素的部分，而是直接將陣列大小增加空間後再存放在最後面的位置上。

與此類方法類似的方式就是宣告一個新的較大的Array，再將原本的元素和要加入的元素通通放進去即可。

## 利用Array.Concat<T>方法
由於LINQ的關係，Array方法也具有Concat可以用了，底下是實作程式碼：
```cs
public static class ArrayExtension
{
    public static T[] Add<T>(ref T[] originArray, T element){
        originArray = originArray.Concat(new T[]{element}).ToArray();
        return originArray;
    }

    public static T[] AddRange<T>(ref T[] originArray, IEnumerable<T> anotherSet)
    {
        originArray = originArray.Concat(anotherSet).ToArray();
        return originArray;
    }
}
```
程式碼寫起來比較簡單，但據聞效能比較沒那麼好。

與此類方法相似的方法就是先將Array轉成具有Add()和AddRange()功能的物件(ex. List)後，利用其原有的Add()和AddRange()加入元素後，再轉型回Array亦可。

# 使用方式
透過上面的方式就可以讓Array增加元素了！底下是使用時所寫的程式碼：
```cs
int[] array = {3, 4, 5};
ArrayExtension.Add(ref array, 1);

int[] array2 = { 6, 7, 8 };
ArrayExtension.AddRange(ref array, array2);
```

# 參考資料
1. [筆記] Array陣列中加入元素 - m@rcus 學習筆記- 點部落：http://www.dotblogs.com.tw/marcus116/archive/2011/09/28/37986.aspx
2. c# - How to add a string to a string[] array? There&#39;s no .Add function - Stack Overflow：http://stackoverflow.com/questions/1440265/how-to-add-a-string-to-a-string-array-theres-no-add-function
3. Array concatenation - Rosetta Code：http://rosettacode.org/wiki/Array_concatenation#C.23

