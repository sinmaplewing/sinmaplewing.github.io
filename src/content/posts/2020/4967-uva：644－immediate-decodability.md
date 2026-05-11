---
id: 4967
title: '#UVa：644－Immediate Decodability'
slug: uva：644－immediate-decodability
date: '2020-05-14T01:27:45+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2020/05/14/4967/uva%ef%bc%9a644%ef%bc%8dimmediate-decodability/
wp_status: publish
wp_type: post
---

先將輸入的 01 字串趙字串長度由小到大排好，讓可能會是某字串的前綴字串都在其前面，接著利用這些字串照順序建立字典樹 (Trie)。在建立過程中，檢查是否發現走過的點曾經是前面字串的結尾。如果有，即表示插入進字典樹的字串有前綴；如果沒有，則表示插入的字串都不是任何一個其他字串的前綴。

**C++(0.080)**
```cpp
/*******************************************************/
/* UVa 644 Immediate Decodability                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
#include <map>
using namespace std;

struct TrieNode {
  bool isEnd;
  map<char, TrieNode*> nextNodes;
};

bool insertTrieAndCheckPrefix(TrieNode* root, const string& symbol) {
  bool isPrefixFound = false;
  TrieNode* currentNode = root;
  for (int i = 0 ; i < symbol.length() ; ++i) {
    if (currentNode->nextNodes.find(symbol[i]) == currentNode->nextNodes.end()) {
      currentNode->nextNodes[symbol[i]] = new TrieNode();
    }
    currentNode = currentNode->nextNodes[symbol[i]];
    if (currentNode->isEnd) isPrefixFound = true;
  }

  currentNode->isEnd = true;
  return isPrefixFound;
}

void clearTrie(TrieNode* root) {
  for (
    map<char, TrieNode*>::iterator it = root->nextNodes.begin() ;
    it != root->nextNodes.end() ;
    ++it
  ) {
    clearTrie(it->second);
  }

  delete root;
}

bool compare(const string& a, const string& b) {
  return a.length() < b.length();
}

int main() {
  vector<string> symbols;
  string input;
  int caseNumber = 1;
  while (cin >> input) {
    if (input != "9") {
      symbols.push_back(input);
      continue;
    }

    sort(symbols.begin(), symbols.end(), compare);

    bool isPrefixFound = false;
    TrieNode* trieRoot = new TrieNode();
    for (int i = 0 ; !isPrefixFound && i < symbols.size() ; ++i) {
      isPrefixFound = isPrefixFound || 
        insertTrieAndCheckPrefix(trieRoot, symbols[i]);
    }

    printf("Set %d is%s immediately decodable\n",
      caseNumber++,
      isPrefixFound ? " not" : "");
    
    clearTrie(trieRoot);
    symbols.clear();
  }
  return 0;
}
```
