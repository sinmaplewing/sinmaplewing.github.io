---
id: 204
title: '#Monogame：在Windows 8 APP專案中，判斷Snap View的狀態'
slug: monogame：在windows-8-app專案中，判斷snap-view的狀態
date: '2013-11-29T02:57:15+08:00'
lastmod: '2019-12-01T23:06:00+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- Monogame
permalink: /2013/11/29/204/monogame%ef%bc%9a%e5%9c%a8windows-8-app%e5%b0%88%e6%a1%88%e4%b8%ad%ef%bc%8c%e5%88%a4%e6%96%b7snap-view%e7%9a%84%e7%8b%80%e6%85%8b/
wp_status: publish
wp_type: post
---

目前XNA已經被微軟暫停維護的情況下，大家使用的替代方案則是Monogame，而Monogame也是目前唯一可讓你移植XNA遊戲到Windows 8平台上的方法，但究竟該怎麼在Monogame底下判斷目前Windows 8的Snap View狀態呢？底下就來好好說明一下。

# GameState：用於判斷目前Snap View的狀態
在Windows 8底下，APP有三種顯示方式：全螢幕、佔1/4的Snap View以及佔3/4的Snap View，你可以在底下增加此GameState Class並在MainGame初始化的時候順便呼叫`GameState.Initialize`，去初始化GameState。
```cs
using Windows.UI.Core;

namespace MainGame
{
  public enum WindowState { Full = 0, Snap1Quarter = 1, Snap3Quarter = 2 };
  public static class GameState
  {
    public static WindowState _windowState;
    public static CoreWindow _window;
    public static Rect _windowsBounds;

    public static void Initialize()
    {
      _window = CoreWindow.GetForCurrentThread();
      _windowsBounds = _window.Bounds;
      _windowState = WindowState.Full;
      _window.SizeChanged += _window_SizeChanged;
    }

    static void _window_SizeChanged(CoreWindow sender, WindowSizeChangedEventArgs args)
    {
      if (args.Size.Width == _windowsBounds.Width)
      {
        _windowState = WindowState.Full;
      }
      else if (args.Size.Width <= 320.00)
      {
        _windowState = WindowState.Snap1Quarter;
      }
      else
      {
        _windowState = WindowState.Snap3Quarter;
      }

      _windowsBounds.Height = args.Size.Height;
      _windowsBounds.Width = args.Size.Width;
    }
  }
}
```

此時，即可使用`GameState._windowState`來做判斷，如果是WindowState.Full即是全螢幕，而WindowState.Snap1Quarter是佔1/4的Snap View，最後WindowState.Snap3Quarter則表示是佔3/4的Snap View。

接著在Draw的時候進行判斷即可：
```cs
protected override void Draw(GameTime gameTime)
{
  GraphicsDevice.Clear(Color.Gray);
  
  // TODO: Add your drawing code here
  switch(GameState._windowState){
    // 判斷並繪製
  }
}
```

# 參考資料
1. Windows 8, XNA and MonoGame - Part 3, Code Migration and Windows 8 Feature Support：[http://solutions.devx.com/ms/msdn/windows-client/windows-8-xna-and-monogame-part-3-code-migration-and-windows-8-feature-support.html](http://solutions.devx.com/ms/msdn/windows-client/windows-8-xna-and-monogame-part-3-code-migration-and-windows-8-feature-support.html)
