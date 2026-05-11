---
id: 4033
title: '#JavaScript：處理 XML 文件的方式'
slug: javascript：處理-xml-文件的方式
date: '2019-01-11T02:14:18+08:00'
lastmod: '2019-12-01T23:03:48+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- JavaScript
featured_image: /uploads/2018/10/default-feature-image.png
permalink: /2019/01/11/4033/javascript%ef%bc%9a%e8%99%95%e7%90%86-xml-%e6%96%87%e4%bb%b6%e7%9a%84%e6%96%b9%e5%bc%8f/
wp_status: publish
wp_type: post
---

由於最近在工作上有處理到 XML 文件與其他文件格式上的轉換，所以稍微紀錄一下怎麼處理 XML 文件。在 JavaScript 裡面，我們可以使用 DOM (Document Object Model) 去處理 XML 文件，底下會以創建 XML 文件、如何處理 XML 文件與將 XML 文件輸出成字串這三個基本功能來紀錄。

# 創建 XML 文件
## 1. 直接創建一個 JavaScript XML DOM Object

使用底下這個 API 可以直接創建一個 XML DOM Object 來新增一個以 `root` 為根節點的 XML 文件：
```
// 第一個參數為 Namespace ，第二個節點為根節點名稱。
var xmlDoc = document.implementation.createDocument(null, "root");
```

詳細 API 說明可以看 [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument) 。

## 2. 利用 `XMLHttpRequest` 去擷取一份既有的 XML 文件
此方法即是利用 AJAX 技術讀取一份存在網上的既有 XML 文件去新增一個 XML DOM Object 來對該文件進行處理，如下程式碼所示：
```
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (xhttp.readyState == 4 &amp;&amp; xhttp.status == 200) {
var xmlDoc = xhttp.responseXML; //將讀取到的 XML 文件存進 xmlDoc 變數內
}
xhttp.open("GET", "root.xml", true);
xhttp.send();
```

詳細可以去理解一下 AJAX 技術和 `XMLHttpRequest` 如何使用，這裡就不贅述。

## 3. 利用 `DOMParser` 去 Parse 既有的 XML 文件字串
如果已經將 XML 文件以字串變數的方式存在程式碼內，那麼就可以直接 Parse 成一個 XML DOM Object 進行處理，如下程式碼所示：
```
var xmlString = "<root></root>";
var xmlDoc = (new DOMParser()).parseFromString(xmlString, "text/xml");
```

# 如何處理 XML 文件
在 XML DOM Object 中，要找到節點通常是利用 Tag 的名字去找，也就是使用 `getElementsByTagName(tagName)` 這個 API 去找到節點。

至於新增節點的話，首先必須先新增一個節點，利用 `createElement(tagName[, options])` 建立一個節點或是利用 `createTextNode(data)` 建立一個內容文字的節點，建立完後利用找到要加入新增節點的父節點，以小孩的方式加進該節點內，也就是利用 `appendChild(aChild)` 將節點加入；而如果只是要變更某節點的屬性則可利用 `setAttribute(name, value)`就好。

刪除節點則是找到該節點後，呼叫 `remove()` 即可。

用個簡單的範例來描述一下，例如建立一個 XML 文件，這份 XML 文件有個 `root` 節點，裡面有三個 `a` 節點，我們希望在第一個 `a` 節點增加一個屬性 `b` ，其內容為 `XD`；而第二個 `a` 節點則在裡面增加一個新節點 `c` ，裡面有文字內容 `XDDD` ；至於最後一個 `a` 節點則是將之刪除掉。整體的程式碼會如下，就請大家利用程式碼去理解上面所述的這些 API 該怎麼使用：
```
var xmlString = "<root><a></a><a></a><a></a></root>";
var xmlDoc = (new DOMParser()).parseFromString(xmlString, "text/xml");

var aArray = xmlDoc.getElementsByTagName("a");
aArray[0].setAttribute("b", "XD");
var cNode = xmlDoc.createElement("c");
cNode.appendChild(xmlDoc.createTextNode("XDDD"));
aArray[1].appendChild(cNode);
aArray[2].remove();
```

以上程式碼可得：
```
<root>
<a b="XD">
</a><a>
<c>XDDD</c>
</a>
</root>
```

如果需要詳細的 API 資訊，可以利用 [MDN Web Docs](https://developer.mozilla.org/en-US/) ，這裡就不贅述了。

# 將 XML 文件輸出成字串
最後就是將剛剛處理完的 XML DOM Object 輸出成 XML 文件字串。這個部分可以利用 `XMLSerializer` 來實作，如下面程式碼範例所示，執行完後 `xmlString` 內就有該 XML 文件內容的字串了：
```
// 接續上一個例子結束的 xmlDoc 變數
var xmlString = (new XMLSerializer()).serializeToString(xmlDoc);
```

# 參考資料
1. Create XML in Javascript - Stack Overflow：[https://stackoverflow.com/questions/14340894/create-xml-in-javascript](https://stackoverflow.com/questions/14340894/create-xml-in-javascript)
2. MDN Web Docs：[https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)
