---
id: 2756
title: '#C++11：正規表達式(Regular Expression)的使用'
slug: c11：正規表達式regular-expression的使用
date: '2015-05-10T23:53:04+08:00'
lastmod: '2019-12-01T23:06:46+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- C#
permalink: /2015/05/10/2756/c11%ef%bc%9a%e6%ad%a3%e8%a6%8f%e8%a1%a8%e9%81%94%e5%bc%8fregular-expression%e7%9a%84%e4%bd%bf%e7%94%a8/
wp_status: publish
wp_type: post
---

在C++11中，已經內建支援正規表達式的函式庫了！透過撰寫這篇文章去整理一下我們該如何使用它吧！

# Regex的引入與創建
在C++11中，要使用正規表達式之前必須要先引入正規表達式的函式庫，記得要先加入下面這行：
```cpp
#include <regex>
```

接著就可以來宣告出正規表達式物件了。C++11中使用的正規表達式格式是與ECMAScript格式相同的，故如果你在JavaScript中已經很熟正規表達式了，那在C++11應該也可以運用自如。底下就是一個範例去宣告一個正規表達式物件，這正規表達式是用來找son開頭，後面接著其他英文字母的單字：
```
regex reg("son[A-Za-z]*");
```

# regex_match: 比對字串是否符合正規表達式所定義之格式
定義好正規表達式物件後，接著就可以利用regex_match去比對某個字串是否符合正規表達式所定義之格式。底下是一個可以讓使用者輸入一行字串，並檢驗輸入的字串是否符合上例中宣告出來的正規表達式所定義之格式的程式的程式碼：
```cpp
#include <iostream>
#include <regex>
using namespace std;

int main(){

  regex reg("son[A-Za-z]*");

  string input;
  getline(cin, input);

  if( regex_match(input, reg) ){
    cout << "Match!" << endl;
  }
  else{
    cout << "Not Match!" << endl;
  }

  return 0;
}
```

上面的程式在使用者的輸入為`sonic`，會得到`Match!`的答案；而若輸入`apple`，則會得到`Not Match!`的答案。

如果想要抓出來符合正規表達式的字為何，甚至是想利用括弧拆解子字串出來，只要在呼叫regex_match函式時，多傳入一個smatch型態的物件進去，它就會把得到的字串回傳回來。底下是個範例：
```cpp
#include <iostream>
#include <regex>
using namespace std;

int main(){

  regex reg("(son)([A-Za-z]*)");

  string input;
  getline(cin, input);

  smatch sm;
  if( regex_match(input, sm, reg) ){
    cout << "Match!" << endl;

    cout << "The matches are:\n";
    for( int i = 0 ; i < sm.size() ; ++i ){
      cout << i << ": [" << sm[i] << ']' << endl;
    }
  }
  else{
    cout << "Not Match!" << endl;
  }

  return 0;
}
```

smatch型態的物件可以利用中括弧運算把每個比對後拆解出來的字串回傳回來，並且可以利用size()方法去得到大小。上面的程式在使用者輸入`sonic`的時候會輸出以下結果：
```
Match!
The matches are:
0: [sonic]
1: [son]
2: [ic]
```

# regex_search: 搜尋字串中所有符合正規表達式所定義之格式的子字串
上面的regex_match是比對整個字串是否符合正規表達式，但若現在的需求是想要找出整個字串中所有符合正規表達式的子字串該怎麼辦呢？你可以利用regex_search()函式，並利用smatch物件的suffix()方法將每次比對完成後剩下的字串再繼續拿去做比對，這樣即可找出所有在字串中符合正規表達式的子字串。底下是個範例：
```cpp
#include <iostream>
#include <regex>
using namespace std;

int main(){

  regex reg("(son)([A-Za-z]*)");

  string input;
  getline(cin, input);

  smatch sm;
  int count = 0;
  while( regex_search(input, sm, reg) ){
    ++count;
    cout << "Match " << count << ":\n";
    cout << "The matches are:\n";
    for( int i = 0 ; i < sm.size() ; ++i ){
      cout << i << ": [" << sm[i] << ']' << endl;
    }
    cout << endl;
    input = sm.suffix().str();
  }

  return 0;
}
```

上面這個範例在輸入為`sonic is not made by sony.`時，會得到以下輸出：
```
Match 1:
The matches are:
0: [sonic]
1: [son]
2: [ic]

Match 2:
The matches are:
0: [sony]
1: [son]
2: [y]

```

# regex_replace: 取代字串中所有符合正規表達式所定義之格式的子字串為別的字串
如果我們除了想要比對字串以外，還想要順便用其他字串取代掉這些子字串的話，可以利用regex_replace()函式去做到這樣的事情，並且也可以利用$n去將在原字串中的括弧分割的各個子字串放進被取代完後的字串內，底下給個範例：
```cpp
#include <iostream>
#include <regex>
using namespace std;

int main(){

  regex reg("(son)([A-Za-z]*)");

  string input;
  getline(cin, input);

  cout << regex_replace(input, reg, "***$2") << endl;

  return 0;
}
```

當輸入為`sonic is not made by sony.`時，可以在輸出得到`***ic is not made by ***y.`。

# 參考資料
1. <regex> - C++ Reference：[http://www.cplusplus.com/reference/regex/](http://www.cplusplus.com/reference/regex/)
