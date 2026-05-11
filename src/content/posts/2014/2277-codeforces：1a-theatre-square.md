---
id: 2277
title: '#Codeforces：1A - Theatre Square'
slug: codeforces：1a-theatre-square
date: '2014-10-10T12:34:47+08:00'
lastmod: '2016-06-23T09:25:18+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Codeforces
permalink: /2014/10/10/2277/codeforces%ef%bc%9a1a-theatre-square/
wp_status: publish
wp_type: post
---

求得兩邊可用幾倍a覆蓋，再相乘算出需要的flagstone即可。

**JavaScript(62 ms/0 KB)**
```js
(function main(){
    var inputs = readline().split(" ").map(function(x) { return parseInt(x); });
    var n = inputs[0], m = inputs[1], a = inputs[2];

    print(Math.ceil(n/a)*Math.ceil(m/a));
})();
```

**C#(62 ms/2400 KB)**
```cs
using System;
using System.Linq;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            int[] input = Console.ReadLine().Split(new char[]{' '}).Select(x => int.Parse(x)).ToArray();
            int n = input[0], m = input[1], a = input[2];

            Console.WriteLine( (Int64)Math.Ceiling((double)n/a) * (Int64)Math.Ceiling((double)m/a) );
        }
    }
}
```
