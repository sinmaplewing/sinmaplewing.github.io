---
id: 4954
title: '#UVa：12478－Hardest Problem Ever (Easy)'
slug: uva：12478－hardest-problem-ever-easy
date: '2020-05-10T21:44:21+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 124
- UVa
permalink: /2020/05/10/4954/uva%ef%bc%9a12478%ef%bc%8dhardest-problem-ever-easy/
wp_status: publish
wp_type: post
---

此題就是對於每個名字，在表中直行與橫列中找出相同長度的區段裡，每個字的字數是否相同，找出有哪個名字可以在表中找到兩個相同的區段即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12478 Hardest Problem Ever (Easy)               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/10                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <map>
using namespace std;

const string NAMES[] = {
  "RAKIBUL",
  "ANINDYA",
  "MOSHIUR",
  "SHIPLU",
  "KABIR",
  "SUNNY",
  "OBAIDA",
  "WASI"
};

const string GRID[] = {
  "OBIDAIBKR",
  "RKAULHISP",
  "SADIYANNO",
  "HEISAWHIA",
  "IRAKIBULS",
  "MFBINTRNO",
  "UTOYZIFAH",
  "LEBSYNUNE",
  "EMOTIONAL"
};

const int GRID_WIDTH = 9;
const int GRID_HEIGHT = 9;

bool isEqual(const map<char, int>& a, const map<char, int>& b) {
  if (a.size() != b.size()) return false;
  for (map<char, int>::const_iterator it = a.begin() ; it != a.end() ; ++it) {
    map<char, int>::const_iterator findInB = b.find(it->first);
    if (findInB == b.end() || findInB->second != it->second) return false;
  }

  return true;
}

int findRows(const map<char, int>& nameCharacterCount, int nameLength) {
  int findAmount = 0;    
  for (int row = 0 ; row < GRID_HEIGHT ; ++row) {
    map<char, int> gridCharacterCount;
    int startColumn = 0;
    int endColumn = startColumn + nameLength;
    for (int column = startColumn ; column < endColumn; ++column) {
      ++gridCharacterCount[GRID[row][column]];
    }

    do {
      if (startColumn != 0) {
        char previousCharacter = GRID[row][startColumn - 1];
        --gridCharacterCount[previousCharacter];
        ++gridCharacterCount[GRID[row][endColumn - 1]];

        if (gridCharacterCount[previousCharacter] == 0) {
          gridCharacterCount.erase(previousCharacter);
        }
      }

      bool isTwoMapEqual = isEqual(nameCharacterCount, gridCharacterCount);
      if (isTwoMapEqual) ++findAmount;
      if (findAmount == 2) {
        return findAmount;
      }
      
      ++startColumn;
      ++endColumn;
    } while (endColumn <= GRID_WIDTH);
  }

  return findAmount;
}

int findColumns(const map<char, int>& nameCharacterCount, int nameLength) {
  int findAmount = 0;    
  for (int column = 0 ; column < GRID_WIDTH ; ++column) {
    map<char, int> gridCharacterCount;
    int startRow = 0;
    int endRow = startRow + nameLength;
    for (int row = startRow ; row < endRow; ++row) {
      ++gridCharacterCount[GRID[row][column]];
    }

    do {
      if (startRow != 0) {
        char previousCharacter = GRID[startRow - 1][column];
        --gridCharacterCount[previousCharacter];
        ++gridCharacterCount[GRID[endRow - 1][column]];

        if (gridCharacterCount[previousCharacter] == 0) {
          gridCharacterCount.erase(previousCharacter);
        }
      }

      bool isTwoMapEqual = isEqual(nameCharacterCount, gridCharacterCount);
      if (isTwoMapEqual) ++findAmount;
      if (findAmount == 2) {
        return findAmount;
      }
      
      ++startRow;
      ++endRow;
    } while (endRow <= GRID_HEIGHT);
  }

  return findAmount;
}

int main() {
  int namesCount = sizeof(NAMES) / sizeof(string);
  bool isDuplicateNameFound = false;
  string result;

  for (int i = 0 ; i < namesCount && !isDuplicateNameFound ; ++i) {
    int nameLength = NAMES[i].length();
    map<char, int> nameCharacterCount;

    for (int j = 0 ; j < nameLength ; ++j) {
      ++nameCharacterCount[NAMES[i][j]];
    }

    int rowFoundAmount = findRows(nameCharacterCount, nameLength);
    if (rowFoundAmount >= 2) {
      result = NAMES[i];
      break;
    }

    int columnFoundAmount = findColumns(nameCharacterCount, nameLength);
    if (rowFoundAmount + columnFoundAmount >= 2) {
      result = NAMES[i];
      break;
    }
  }

  printf("%s\n", result.c_str());
  return 0;
}
```
