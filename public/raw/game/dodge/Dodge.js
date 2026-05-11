(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin', 'korim-root-korim', 'korge-root-korge', 'korgw-root-korgw', 'klock-root-klock', 'kmem-root-kmem', 'korio-root-korio', 'korinject-root-korinject', 'korma-root-korma'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'), require('korim-root-korim'), require('korge-root-korge'), require('korgw-root-korgw'), require('klock-root-klock'), require('kmem-root-kmem'), require('korio-root-korio'), require('korinject-root-korinject'), require('korma-root-korma'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Dodge'.");
    }if (typeof this['korim-root-korim'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'korim-root-korim' was not found. Please, check whether 'korim-root-korim' is loaded prior to 'Dodge'.");
    }if (typeof this['korge-root-korge'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'korge-root-korge' was not found. Please, check whether 'korge-root-korge' is loaded prior to 'Dodge'.");
    }if (typeof this['korgw-root-korgw'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'korgw-root-korgw' was not found. Please, check whether 'korgw-root-korgw' is loaded prior to 'Dodge'.");
    }if (typeof this['klock-root-klock'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'klock-root-klock' was not found. Please, check whether 'klock-root-klock' is loaded prior to 'Dodge'.");
    }if (typeof this['kmem-root-kmem'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'kmem-root-kmem' was not found. Please, check whether 'kmem-root-kmem' is loaded prior to 'Dodge'.");
    }if (typeof this['korio-root-korio'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'korio-root-korio' was not found. Please, check whether 'korio-root-korio' is loaded prior to 'Dodge'.");
    }if (typeof this['korinject-root-korinject'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'korinject-root-korinject' was not found. Please, check whether 'korinject-root-korinject' is loaded prior to 'Dodge'.");
    }if (typeof this['korma-root-korma'] === 'undefined') {
      throw new Error("Error loading module 'Dodge'. Its dependency 'korma-root-korma' was not found. Please, check whether 'korma-root-korma' is loaded prior to 'Dodge'.");
    }root.Dodge = factory(typeof Dodge === 'undefined' ? {} : Dodge, kotlin, this['korim-root-korim'], this['korge-root-korge'], this['korgw-root-korgw'], this['klock-root-klock'], this['kmem-root-kmem'], this['korio-root-korio'], this['korinject-root-korinject'], this['korma-root-korma']);
  }
}(this, function (_, Kotlin, $module$korim_root_korim, $module$korge_root_korge, $module$korgw_root_korgw, $module$klock_root_klock, $module$kmem_root_kmem, $module$korio_root_korio, $module$korinject_root_korinject, $module$korma_root_korma) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var coerceIn = Kotlin.kotlin.ranges.coerceIn_nig4hr$;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var throwCCE = Kotlin.throwCCE;
  var contentEquals = Kotlin.arrayEquals;
  var contentHashCode = Kotlin.arrayHashCode;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  var Collection = Kotlin.kotlin.collections.Collection;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Random = Kotlin.kotlin.random.Random;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.intrinsics.COROUTINE_SUSPENDED;
  var CoroutineImpl = Kotlin.kotlin.coroutines.CoroutineImpl;
  var RGBA = $module$korim_root_korim.com.soywiz.korim.color.RGBA;
  var color = $module$korim_root_korim.com.soywiz.korim.color;
  var Circle = $module$korge_root_korge.com.soywiz.korge.view.Circle;
  var xy = $module$korge_root_korge.com.soywiz.korge.view.xy_2cbtc5$;
  var first = Kotlin.kotlin.collections.first_7wnvza$;
  var Sprite_init = $module$korge_root_korge.com.soywiz.korge.view.Sprite_init_i2lxqn$;
  var scale = $module$korge_root_korge.com.soywiz.korge.view.scale_2cbtc5$;
  var xy_0 = $module$korge_root_korge.com.soywiz.korge.view.xy_ajix5r$;
  var Text = $module$korge_root_korge.com.soywiz.korge.view.Text;
  var Unit = Kotlin.kotlin.Unit;
  var Key = $module$korgw_root_korgw.com.soywiz.korev.Key;
  var toIntFloor = $module$kmem_root_kmem.com.soywiz.kmem.toIntFloor_yrwdxr$;
  var getKClass = Kotlin.getKClass;
  var launchImmediately = $module$korio_root_korio.com.soywiz.korio.async.launchImmediately_hilpzi$;
  var addUpdater = $module$korge_root_korge.com.soywiz.korge.view.addUpdater_t24ukx$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var get_lastIndex = Kotlin.kotlin.collections.get_lastIndex_55thoc$;
  var Scene = $module$korge_root_korge.com.soywiz.korge.scene.Scene;
  var TimeSpan = $module$korge_root_korge.$$importsForInline$$['klock-root-klock'].com.soywiz.klock.TimeSpan;
  var TimeSpan_0 = $module$klock_root_klock.com.soywiz.klock.TimeSpan;
  var SolidRect_init = $module$korge_root_korge.com.soywiz.korge.view.SolidRect;
  var addTo = $module$korge_root_korge.com.soywiz.korge.view.addTo_fct211$;
  var color_0 = $module$korge_root_korge.$$importsForInline$$['korim-root-korim'].com.soywiz.korim.color;
  var Fonts = $module$korge_root_korge.com.soywiz.korge.view.Fonts;
  var getPropertyCallableRef = Kotlin.getPropertyCallableRef;
  var get_mouse = $module$korge_root_korge.com.soywiz.korge.input.get_mouse_gohfi1$;
  var launchImmediately_0 = $module$korge_root_korge.$$importsForInline$$['korio-root-korio'].com.soywiz.korio.async.launchImmediately_ykkwzu$;
  var get_keys = $module$korge_root_korge.com.soywiz.korge.input.get_keys_gohfi1$;
  var checkIndexOverflow = Kotlin.kotlin.collections.checkIndexOverflow_za3lpa$;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var first_0 = Kotlin.kotlin.collections.first_2p1efm$;
  var std = $module$korio_root_korio.com.soywiz.korio.file.std;
  var readBitmap = $module$korim_root_korim.com.soywiz.korim.format.readBitmap_vi5npc$;
  var SpriteAnimation = $module$korge_root_korge.com.soywiz.korge.view.SpriteAnimation;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var mapOf = Kotlin.kotlin.collections.mapOf_qfcya0$;
  var korge = $module$korge_root_korge.com.soywiz.korge;
  var Korge$Config = $module$korge_root_korge.com.soywiz.korge.Korge.Config;
  var Module = $module$korge_root_korge.com.soywiz.korge.scene.Module;
  var SizeInt = $module$korma_root_korma.com.soywiz.korma.geom.SizeInt;
  var internal = Kotlin.kotlin.coroutines.js.internal;
  ActionType.prototype = Object.create(Enum.prototype);
  ActionType.prototype.constructor = ActionType;
  GameState.prototype = Object.create(Enum.prototype);
  GameState.prototype.constructor = GameState;
  GamePlayScene.prototype = Object.create(Scene.prototype);
  GamePlayScene.prototype.constructor = GamePlayScene;
  GameModule.prototype = Object.create(Module.prototype);
  GameModule.prototype.constructor = GameModule;
  function Circle_0(center, radius) {
    this.center = center;
    this.radius = radius;
  }
  Circle_0.prototype.coerceIn_wxyv05$ = function (r) {
    var tmp$, tmp$_0;
    if (this.center.x - this.radius < r.leftTop.x)
      tmp$ = r.leftTop.x + this.radius;
    else if (this.center.x + this.radius > r.rightBottom.x)
      tmp$ = r.rightBottom.x - this.radius;
    else {
      tmp$ = this.center.x;
    }
    var x = tmp$;
    if (this.center.y - this.radius < r.leftTop.y)
      tmp$_0 = r.leftTop.y + this.radius;
    else if (this.center.y + this.radius > r.rightBottom.y)
      tmp$_0 = r.rightBottom.y - this.radius;
    else {
      tmp$_0 = this.center.y;
    }
    var y = tmp$_0;
    return new Circle_0(new Point(x, y), this.radius);
  };
  Circle_0.prototype.collidesWith_avmr92$ = function (c) {
    return this.center.minus_txpyzu$(c.center).length() <= this.radius + c.radius;
  };
  Circle_0.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Circle',
    interfaces: []
  };
  Circle_0.prototype.component1 = function () {
    return this.center;
  };
  Circle_0.prototype.component2 = function () {
    return this.radius;
  };
  Circle_0.prototype.copy_djpteg$ = function (center, radius) {
    return new Circle_0(center === void 0 ? this.center : center, radius === void 0 ? this.radius : radius);
  };
  Circle_0.prototype.toString = function () {
    return 'Circle(center=' + Kotlin.toString(this.center) + (', radius=' + Kotlin.toString(this.radius)) + ')';
  };
  Circle_0.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.center) | 0;
    result = result * 31 + Kotlin.hashCode(this.radius) | 0;
    return result;
  };
  Circle_0.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.center, other.center) && Kotlin.equals(this.radius, other.radius)))));
  };
  function Point(x, y) {
    Point$Companion_getInstance();
    this.x = x;
    this.y = y;
  }
  function Point$Companion() {
    Point$Companion_instance = this;
    this.ZERO = new Point(0.0, 0.0);
  }
  Point$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Point$Companion_instance = null;
  function Point$Companion_getInstance() {
    if (Point$Companion_instance === null) {
      new Point$Companion();
    }return Point$Companion_instance;
  }
  Point.prototype.plus_1y8c8z$ = function (v) {
    return new Point(this.x + v.x, this.y + v.y);
  };
  Point.prototype.minus_txpyzu$ = function (p) {
    return new Vector(this.x - p.x, this.y - p.y);
  };
  Point.prototype.coerceIn_wxyv05$ = function (r) {
    return new Point(coerceIn(this.x, r.leftTop.x, r.rightBottom.x), coerceIn(this.y, r.leftTop.y, r.rightBottom.y));
  };
  Point.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Point',
    interfaces: []
  };
  Point.prototype.component1 = function () {
    return this.x;
  };
  Point.prototype.component2 = function () {
    return this.y;
  };
  Point.prototype.copy_lu1900$ = function (x, y) {
    return new Point(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Point.prototype.toString = function () {
    return 'Point(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Point.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Point.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function toPoint($receiver) {
    return new Point($receiver.x, $receiver.y);
  }
  function Rectangle(leftTop, rightBottom) {
    this.leftTop = leftTop;
    this.rightBottom = rightBottom;
  }
  Rectangle.prototype.contains_txpyzu$ = function (p) {
    return p.x >= this.leftTop.x && p.x <= this.rightBottom.x && p.y >= this.leftTop.y && p.y <= this.rightBottom.y;
  };
  Rectangle.prototype.collidesWith_avmr92$ = function (c) {
    return c.center.x - c.radius > this.leftTop.x && c.center.x + c.radius < this.rightBottom.x && c.center.y - c.radius > this.leftTop.y && c.center.y + c.radius < this.rightBottom.y;
  };
  Rectangle.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Rectangle',
    interfaces: []
  };
  Rectangle.prototype.component1 = function () {
    return this.leftTop;
  };
  Rectangle.prototype.component2 = function () {
    return this.rightBottom;
  };
  Rectangle.prototype.copy_i31f8s$ = function (leftTop, rightBottom) {
    return new Rectangle(leftTop === void 0 ? this.leftTop : leftTop, rightBottom === void 0 ? this.rightBottom : rightBottom);
  };
  Rectangle.prototype.toString = function () {
    return 'Rectangle(leftTop=' + Kotlin.toString(this.leftTop) + (', rightBottom=' + Kotlin.toString(this.rightBottom)) + ')';
  };
  Rectangle.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.leftTop) | 0;
    result = result * 31 + Kotlin.hashCode(this.rightBottom) | 0;
    return result;
  };
  Rectangle.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.leftTop, other.leftTop) && Kotlin.equals(this.rightBottom, other.rightBottom)))));
  };
  function Vector(x, y) {
    Vector$Companion_getInstance();
    this.x = x;
    this.y = y;
  }
  function Vector$Companion() {
    Vector$Companion_instance = this;
    this.ZERO = new Vector(0.0, 0.0);
  }
  Vector$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector$Companion_instance = null;
  function Vector$Companion_getInstance() {
    if (Vector$Companion_instance === null) {
      new Vector$Companion();
    }return Vector$Companion_instance;
  }
  Vector.prototype.plus_1y8c8z$ = function (v) {
    return new Vector(this.x + v.x, this.y + v.y);
  };
  Vector.prototype.times_14dthe$ = function (n) {
    return new Vector(this.x * n, this.y * n);
  };
  Vector.prototype.div_14dthe$ = function (n) {
    return new Vector(this.x / n, this.y / n);
  };
  Vector.prototype.length = function () {
    var x = this.x;
    var y = this.y;
    return Math_0.hypot(x, y);
  };
  Vector.prototype.normalize = function () {
    return this.x === 0.0 && this.y === 0.0 ? Vector$Companion_getInstance().ZERO : this.div_14dthe$(this.length());
  };
  Vector.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector',
    interfaces: []
  };
  Vector.prototype.component1 = function () {
    return this.x;
  };
  Vector.prototype.component2 = function () {
    return this.y;
  };
  Vector.prototype.copy_lu1900$ = function (x, y) {
    return new Vector(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Vector.prototype.toString = function () {
    return 'Vector(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Vector.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Vector.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function ActionType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ActionType_initFields() {
    ActionType_initFields = function () {
    };
    ActionType$Up_instance = new ActionType('Up', 0);
    ActionType$Right_instance = new ActionType('Right', 1);
    ActionType$Down_instance = new ActionType('Down', 2);
    ActionType$Left_instance = new ActionType('Left', 3);
  }
  var ActionType$Up_instance;
  function ActionType$Up_getInstance() {
    ActionType_initFields();
    return ActionType$Up_instance;
  }
  var ActionType$Right_instance;
  function ActionType$Right_getInstance() {
    ActionType_initFields();
    return ActionType$Right_instance;
  }
  var ActionType$Down_instance;
  function ActionType$Down_getInstance() {
    ActionType_initFields();
    return ActionType$Down_instance;
  }
  var ActionType$Left_instance;
  function ActionType$Left_getInstance() {
    ActionType_initFields();
    return ActionType$Left_instance;
  }
  ActionType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ActionType',
    interfaces: [Enum]
  };
  function ActionType$values() {
    return [ActionType$Up_getInstance(), ActionType$Right_getInstance(), ActionType$Down_getInstance(), ActionType$Left_getInstance()];
  }
  ActionType.values = ActionType$values;
  function ActionType$valueOf(name) {
    switch (name) {
      case 'Up':
        return ActionType$Up_getInstance();
      case 'Right':
        return ActionType$Right_getInstance();
      case 'Down':
        return ActionType$Down_getInstance();
      case 'Left':
        return ActionType$Left_getInstance();
      default:throwISE('No enum constant GameEngine.Data.ActionType.' + name);
    }
  }
  ActionType.valueOf_61zpoe$ = ActionType$valueOf;
  function EnemyData(currentPosition, speed, moveDirection) {
    this.currentPosition = currentPosition;
    this.speed = speed;
    this.moveDirection = moveDirection;
  }
  EnemyData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EnemyData',
    interfaces: []
  };
  EnemyData.prototype.component1 = function () {
    return this.currentPosition;
  };
  EnemyData.prototype.component2 = function () {
    return this.speed;
  };
  EnemyData.prototype.component3 = function () {
    return this.moveDirection;
  };
  EnemyData.prototype.copy_728krx$ = function (currentPosition, speed, moveDirection) {
    return new EnemyData(currentPosition === void 0 ? this.currentPosition : currentPosition, speed === void 0 ? this.speed : speed, moveDirection === void 0 ? this.moveDirection : moveDirection);
  };
  EnemyData.prototype.toString = function () {
    return 'EnemyData(currentPosition=' + Kotlin.toString(this.currentPosition) + (', speed=' + Kotlin.toString(this.speed)) + (', moveDirection=' + Kotlin.toString(this.moveDirection)) + ')';
  };
  EnemyData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.currentPosition) | 0;
    result = result * 31 + Kotlin.hashCode(this.speed) | 0;
    result = result * 31 + Kotlin.hashCode(this.moveDirection) | 0;
    return result;
  };
  EnemyData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.currentPosition, other.currentPosition) && Kotlin.equals(this.speed, other.speed) && Kotlin.equals(this.moveDirection, other.moveDirection)))));
  };
  function EnemyGeneratorInfo(position, duration, probability) {
    this.position = position;
    this.duration = duration;
    this.probability = probability;
  }
  EnemyGeneratorInfo.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EnemyGeneratorInfo',
    interfaces: []
  };
  EnemyGeneratorInfo.prototype.component1 = function () {
    return this.position;
  };
  EnemyGeneratorInfo.prototype.component2 = function () {
    return this.duration;
  };
  EnemyGeneratorInfo.prototype.component3 = function () {
    return this.probability;
  };
  EnemyGeneratorInfo.prototype.copy_qkvx3a$ = function (position, duration, probability) {
    return new EnemyGeneratorInfo(position === void 0 ? this.position : position, duration === void 0 ? this.duration : duration, probability === void 0 ? this.probability : probability);
  };
  EnemyGeneratorInfo.prototype.toString = function () {
    return 'EnemyGeneratorInfo(position=' + Kotlin.toString(this.position) + (', duration=' + Kotlin.toString(this.duration)) + (', probability=' + Kotlin.toString(this.probability)) + ')';
  };
  EnemyGeneratorInfo.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.position) | 0;
    result = result * 31 + Kotlin.hashCode(this.duration) | 0;
    result = result * 31 + Kotlin.hashCode(this.probability) | 0;
    return result;
  };
  EnemyGeneratorInfo.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.position, other.position) && Kotlin.equals(this.duration, other.duration) && Kotlin.equals(this.probability, other.probability)))));
  };
  function GameState(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function GameState_initFields() {
    GameState_initFields = function () {
    };
    GameState$Init_instance = new GameState('Init', 0);
    GameState$Start_instance = new GameState('Start', 1);
    GameState$GamePlay_instance = new GameState('GamePlay', 2);
    GameState$GameOver_instance = new GameState('GameOver', 3);
    GameState$Restart_instance = new GameState('Restart', 4);
  }
  var GameState$Init_instance;
  function GameState$Init_getInstance() {
    GameState_initFields();
    return GameState$Init_instance;
  }
  var GameState$Start_instance;
  function GameState$Start_getInstance() {
    GameState_initFields();
    return GameState$Start_instance;
  }
  var GameState$GamePlay_instance;
  function GameState$GamePlay_getInstance() {
    GameState_initFields();
    return GameState$GamePlay_instance;
  }
  var GameState$GameOver_instance;
  function GameState$GameOver_getInstance() {
    GameState_initFields();
    return GameState$GameOver_instance;
  }
  var GameState$Restart_instance;
  function GameState$Restart_getInstance() {
    GameState_initFields();
    return GameState$Restart_instance;
  }
  GameState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameState',
    interfaces: [Enum]
  };
  function GameState$values() {
    return [GameState$Init_getInstance(), GameState$Start_getInstance(), GameState$GamePlay_getInstance(), GameState$GameOver_getInstance(), GameState$Restart_getInstance()];
  }
  GameState.values = GameState$values;
  function GameState$valueOf(name) {
    switch (name) {
      case 'Init':
        return GameState$Init_getInstance();
      case 'Start':
        return GameState$Start_getInstance();
      case 'GamePlay':
        return GameState$GamePlay_getInstance();
      case 'GameOver':
        return GameState$GameOver_getInstance();
      case 'Restart':
        return GameState$Restart_getInstance();
      default:throwISE('No enum constant GameEngine.Data.GameState.' + name);
    }
  }
  GameState.valueOf_61zpoe$ = GameState$valueOf;
  function GameStateModel(stageInfo, player, enemies, currentState, score) {
    this.stageInfo = stageInfo;
    this.player = player;
    this.enemies = enemies;
    this.currentState = currentState;
    this.score = score;
  }
  GameStateModel.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameStateModel',
    interfaces: []
  };
  GameStateModel.prototype.component1 = function () {
    return this.stageInfo;
  };
  GameStateModel.prototype.component2 = function () {
    return this.player;
  };
  GameStateModel.prototype.component3 = function () {
    return this.enemies;
  };
  GameStateModel.prototype.component4 = function () {
    return this.currentState;
  };
  GameStateModel.prototype.component5 = function () {
    return this.score;
  };
  GameStateModel.prototype.copy_u5wn5u$ = function (stageInfo, player, enemies, currentState, score) {
    return new GameStateModel(stageInfo === void 0 ? this.stageInfo : stageInfo, player === void 0 ? this.player : player, enemies === void 0 ? this.enemies : enemies, currentState === void 0 ? this.currentState : currentState, score === void 0 ? this.score : score);
  };
  GameStateModel.prototype.toString = function () {
    return 'GameStateModel(stageInfo=' + Kotlin.toString(this.stageInfo) + (', player=' + Kotlin.toString(this.player)) + (', enemies=' + Kotlin.toString(this.enemies)) + (', currentState=' + Kotlin.toString(this.currentState)) + (', score=' + Kotlin.toString(this.score)) + ')';
  };
  GameStateModel.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.stageInfo) | 0;
    result = result * 31 + Kotlin.hashCode(this.player) | 0;
    result = result * 31 + Kotlin.hashCode(this.enemies) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentState) | 0;
    result = result * 31 + Kotlin.hashCode(this.score) | 0;
    return result;
  };
  GameStateModel.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.stageInfo, other.stageInfo) && Kotlin.equals(this.player, other.player) && Kotlin.equals(this.enemies, other.enemies) && Kotlin.equals(this.currentState, other.currentState) && Kotlin.equals(this.score, other.score)))));
  };
  function PlayerData(currentPosition, speed, isDead, currentActionType) {
    this.currentPosition = currentPosition;
    this.speed = speed;
    this.isDead = isDead;
    this.currentActionType = currentActionType;
  }
  PlayerData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayerData',
    interfaces: []
  };
  PlayerData.prototype.component1 = function () {
    return this.currentPosition;
  };
  PlayerData.prototype.component2 = function () {
    return this.speed;
  };
  PlayerData.prototype.component3 = function () {
    return this.isDead;
  };
  PlayerData.prototype.component4 = function () {
    return this.currentActionType;
  };
  PlayerData.prototype.copy_ovnw6z$ = function (currentPosition, speed, isDead, currentActionType) {
    return new PlayerData(currentPosition === void 0 ? this.currentPosition : currentPosition, speed === void 0 ? this.speed : speed, isDead === void 0 ? this.isDead : isDead, currentActionType === void 0 ? this.currentActionType : currentActionType);
  };
  PlayerData.prototype.toString = function () {
    return 'PlayerData(currentPosition=' + Kotlin.toString(this.currentPosition) + (', speed=' + Kotlin.toString(this.speed)) + (', isDead=' + Kotlin.toString(this.isDead)) + (', currentActionType=' + Kotlin.toString(this.currentActionType)) + ')';
  };
  PlayerData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.currentPosition) | 0;
    result = result * 31 + Kotlin.hashCode(this.speed) | 0;
    result = result * 31 + Kotlin.hashCode(this.isDead) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentActionType) | 0;
    return result;
  };
  PlayerData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.currentPosition, other.currentPosition) && Kotlin.equals(this.speed, other.speed) && Kotlin.equals(this.isDead, other.isDead) && Kotlin.equals(this.currentActionType, other.currentActionType)))));
  };
  function StageInfo(gamePlayRange, enemyGeneratorsData, enemyExistedRange) {
    this.gamePlayRange = gamePlayRange;
    this.enemyGeneratorsData = enemyGeneratorsData;
    this.enemyExistedRange = enemyExistedRange;
  }
  StageInfo.prototype.equals = function (other) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    if (this === other)
      return true;
    if (other == null || !((tmp$ = Kotlin.getKClassFromExpression(this)) != null ? tmp$.equals(Kotlin.getKClassFromExpression(other)) : null))
      return false;
    Kotlin.isType(tmp$_0 = other, StageInfo) ? tmp$_0 : throwCCE();
    if (!((tmp$_1 = this.gamePlayRange) != null ? tmp$_1.equals(other.gamePlayRange) : null))
      return false;
    if (!contentEquals(this.enemyGeneratorsData, other.enemyGeneratorsData))
      return false;
    if (!((tmp$_2 = this.enemyExistedRange) != null ? tmp$_2.equals(other.enemyExistedRange) : null))
      return false;
    return true;
  };
  StageInfo.prototype.hashCode = function () {
    var result = this.gamePlayRange.hashCode();
    result = (31 * result | 0) + contentHashCode(this.enemyGeneratorsData) | 0;
    result = (31 * result | 0) + this.enemyExistedRange.hashCode() | 0;
    return result;
  };
  StageInfo.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StageInfo',
    interfaces: []
  };
  StageInfo.prototype.component1 = function () {
    return this.gamePlayRange;
  };
  StageInfo.prototype.component2 = function () {
    return this.enemyGeneratorsData;
  };
  StageInfo.prototype.component3 = function () {
    return this.enemyExistedRange;
  };
  StageInfo.prototype.copy_syogbl$ = function (gamePlayRange, enemyGeneratorsData, enemyExistedRange) {
    return new StageInfo(gamePlayRange === void 0 ? this.gamePlayRange : gamePlayRange, enemyGeneratorsData === void 0 ? this.enemyGeneratorsData : enemyGeneratorsData, enemyExistedRange === void 0 ? this.enemyExistedRange : enemyExistedRange);
  };
  StageInfo.prototype.toString = function () {
    return 'StageInfo(gamePlayRange=' + Kotlin.toString(this.gamePlayRange) + (', enemyGeneratorsData=' + Kotlin.toString(this.enemyGeneratorsData)) + (', enemyExistedRange=' + Kotlin.toString(this.enemyExistedRange)) + ')';
  };
  function DodgeGameEngine(gameStateModel) {
    this.gameStateModel_0 = gameStateModel;
    var $receiver = this.gameStateModel_0.stageInfo.enemyGeneratorsData;
    var destination = ArrayList_init($receiver.length);
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      destination.add_11rb$(new EnemyGenerator(this.gameStateModel_0, item));
    }
    this.enemyGenerators_0 = copyToArray(destination);
  }
  DodgeGameEngine.prototype.update_f22aj3$ = function (deltaTime, inputDirection) {
    this.updateEnemy_0(deltaTime);
    this.updatePlayer_0(deltaTime, inputDirection);
    var $receiver = this.gameStateModel_0.enemies;
    var any$result;
    any$break: do {
      var tmp$;
      if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
        any$result = false;
        break any$break;
      }tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element.currentPosition.collidesWith_avmr92$(this.gameStateModel_0.player.currentPosition)) {
          any$result = true;
          break any$break;
        }}
      any$result = false;
    }
     while (false);
    if (any$result) {
      this.gameStateModel_0.player.isDead = true;
    }};
  DodgeGameEngine.prototype.updateEnemy_0 = function (deltaTime) {
    var $receiver = this.enemyGenerators_0;
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
      element.update_14dthe$(deltaTime);
    }
    var tmp$_0;
    tmp$_0 = this.gameStateModel_0.enemies.iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      element_0.currentPosition = new Circle_0(element_0.currentPosition.center.plus_1y8c8z$(element_0.moveDirection.times_14dthe$(element_0.speed).times_14dthe$(deltaTime)), element_0.currentPosition.radius);
    }
    var $receiver_0 = this.gameStateModel_0.enemies;
    var destination = ArrayList_init_0();
    var tmp$_1;
    tmp$_1 = $receiver_0.iterator();
    while (tmp$_1.hasNext()) {
      var element_1 = tmp$_1.next();
      if (!this.gameStateModel_0.stageInfo.enemyExistedRange.collidesWith_avmr92$(element_1.currentPosition))
        destination.add_11rb$(element_1);
    }
    var tmp$_2;
    tmp$_2 = destination.iterator();
    while (tmp$_2.hasNext()) {
      var element_2 = tmp$_2.next();
      this.gameStateModel_0.enemies.remove_11rb$(element_2);
    }
  };
  DodgeGameEngine.prototype.updatePlayer_0 = function (deltaTime, inputDirection) {
    var player = this.gameStateModel_0.player;
    var nextPosition = player.currentPosition.center.plus_1y8c8z$(inputDirection.normalize().times_14dthe$(player.speed).times_14dthe$(deltaTime));
    player.currentPosition = (new Circle_0(nextPosition, player.currentPosition.radius)).coerceIn_wxyv05$(this.gameStateModel_0.stageInfo.gamePlayRange);
    if (inputDirection != null ? inputDirection.equals(Vector$Companion_getInstance().ZERO) : null)
      return;
    var $receiver = inputDirection.x;
    var tmp$ = Math_0.abs($receiver);
    var $receiver_0 = inputDirection.y;
    if (tmp$ >= Math_0.abs($receiver_0))
      if (inputDirection.x > 0)
        player.currentActionType = ActionType$Right_getInstance();
      else
        player.currentActionType = ActionType$Left_getInstance();
    else {
      if (inputDirection.y > 0)
        player.currentActionType = ActionType$Down_getInstance();
      else
        player.currentActionType = ActionType$Up_getInstance();
    }
  };
  DodgeGameEngine.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'DodgeGameEngine',
    interfaces: []
  };
  var ENEMY_SIZE;
  var ENEMY_MIN_SPEED;
  var ENEMY_MAX_SPEED;
  function EnemyGenerator(gameStateModel, enemyGeneratorInfo) {
    this.gameStateModel = gameStateModel;
    this.enemyGeneratorInfo = enemyGeneratorInfo;
    this.lastGeneratedDuration_0 = 0.0;
  }
  EnemyGenerator.prototype.update_14dthe$ = function (deltaTime) {
    var $receiver = this.enemyGeneratorInfo;
    this.lastGeneratedDuration_0 += deltaTime;
    if (this.lastGeneratedDuration_0 >= $receiver.duration) {
      this.lastGeneratedDuration_0 -= $receiver.duration;
      if (Random.Default.nextDouble_lu1900$(0.0, 1.0) <= $receiver.probability) {
        this.gameStateModel.enemies.add_11rb$(new EnemyData(new Circle_0($receiver.position, ENEMY_SIZE), Random.Default.nextDouble_lu1900$(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED), this.gameStateModel.player.currentPosition.center.minus_txpyzu$($receiver.position).normalize()));
      }}};
  EnemyGenerator.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EnemyGenerator',
    interfaces: []
  };
  function solidRect$lambda($receiver) {
    return Unit;
  }
  function text$lambda($receiver) {
    return Unit;
  }
  function Coroutine$doMouseEvent$lambda$lambda$lambda(closure$handler_0, closure$it_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$closure$handler = closure$handler_0;
    this.local$closure$it = closure$it_0;
  }
  Coroutine$doMouseEvent$lambda$lambda$lambda.$metadata$ = {kind: Kotlin.Kind.CLASS, simpleName: null, interfaces: [CoroutineImpl]};
  Coroutine$doMouseEvent$lambda$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$doMouseEvent$lambda$lambda$lambda.prototype.constructor = Coroutine$doMouseEvent$lambda$lambda$lambda;
  Coroutine$doMouseEvent$lambda$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = this.local$closure$handler(this.local$closure$it, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            return this.result_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      } catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        } else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function doMouseEvent$lambda$lambda$lambda(closure$handler_0, closure$it_0) {
    return function (continuation_0, suspended) {
      var instance = new Coroutine$doMouseEvent$lambda$lambda$lambda(closure$handler_0, closure$it_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function doMouseEvent$lambda$lambda(closure$mouse, closure$handler) {
    return function (it) {
      launchImmediately_0(closure$mouse.coroutineContext, doMouseEvent$lambda$lambda$lambda(closure$handler, it));
      return Unit;
    };
  }
  function circle$lambda($receiver) {
    return Unit;
  }
  function GamePlayScene() {
    Scene.call(this);
  }
  function Coroutine$GamePlayScene$sceneInit$lambda(closure$model_0, this$GamePlayScene_0, it_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$closure$model = closure$model_0;
    this.local$this$GamePlayScene = this$GamePlayScene_0;
  }
  Coroutine$GamePlayScene$sceneInit$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GamePlayScene$sceneInit$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GamePlayScene$sceneInit$lambda.prototype.constructor = Coroutine$GamePlayScene$sceneInit$lambda;
  Coroutine$GamePlayScene$sceneInit$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            return this.local$this$GamePlayScene.changeGameState_0(this.local$closure$model), Unit;
          case 1:
            throw this.exception_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      } catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        } else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GamePlayScene$sceneInit$lambda(closure$model_0, this$GamePlayScene_0) {
    return function (it_0, continuation_0, suspended) {
      var instance = new Coroutine$GamePlayScene$sceneInit$lambda(closure$model_0, this$GamePlayScene_0, it_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$GamePlayScene$sceneInit$lambda_0(closure$model_0, this$GamePlayScene_0, it_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$closure$model = closure$model_0;
    this.local$this$GamePlayScene = this$GamePlayScene_0;
    this.local$it = it_0;
  }
  Coroutine$GamePlayScene$sceneInit$lambda_0.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GamePlayScene$sceneInit$lambda_0.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GamePlayScene$sceneInit$lambda_0.prototype.constructor = Coroutine$GamePlayScene$sceneInit$lambda_0;
  Coroutine$GamePlayScene$sceneInit$lambda_0.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            if (this.local$it.key !== Key.SPACE)
              return;
            return this.local$this$GamePlayScene.changeGameState_0(this.local$closure$model), Unit;
          case 1:
            throw this.exception_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      } catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        } else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GamePlayScene$sceneInit$lambda_0(closure$model_0, this$GamePlayScene_0) {
    return function (it_0, continuation_0, suspended) {
      var instance = new Coroutine$GamePlayScene$sceneInit$lambda_0(closure$model_0, this$GamePlayScene_0, it_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$GamePlayScene$sceneInit$lambda$lambda(this$GamePlayScene_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$this$GamePlayScene = this$GamePlayScene_0;
  }
  Coroutine$GamePlayScene$sceneInit$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GamePlayScene$sceneInit$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GamePlayScene$sceneInit$lambda$lambda.prototype.constructor = Coroutine$GamePlayScene$sceneInit$lambda$lambda;
  Coroutine$GamePlayScene$sceneInit$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            var $this = this.local$this$GamePlayScene.sceneContainer;
            var injects = [];
            var time;
            var transition;
            if (time === void 0) {
              time = TimeSpan.Companion.fromSeconds_14dthe$(0);
            }
            if (transition === void 0)
              transition = $this.defaultTransition;
            this.state_0 = 2;
            this.result_0 = $this.changeTo_oszfv1$(getKClass(GamePlayScene), injects.slice(), time, transition, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            this.result_0;
            return this.result_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      } catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        } else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GamePlayScene$sceneInit$lambda$lambda(this$GamePlayScene_0) {
    return function (continuation_0, suspended) {
      var instance = new Coroutine$GamePlayScene$sceneInit$lambda$lambda(this$GamePlayScene_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function GamePlayScene$sceneInit$lambda_1(closure$model, closure$pressToStartText, closure$uiBackground, closure$playerSprite, closure$playerView, closure$scoreText, closure$inputHandler, closure$engine, closure$enemyViews, this$GamePlayScene, closure$playerAnimations, closure$pressToRestartText) {
    return function ($receiver, it) {
      switch (closure$model.currentState.name) {
        case 'Start':
          closure$model.currentState = GameState$GamePlay_getInstance();
          $receiver.removeChild_gohfih$(closure$pressToStartText);
          $receiver.removeChild_gohfih$(closure$uiBackground);
          $receiver.addChild_l5rad2$(closure$playerSprite);
          closure$playerSprite.playAnimationLooped_tsl5ct$(void 0, TimeSpan_0.Companion.fromMilliseconds_14dthe$(200.0));
          $receiver.addChild_l5rad2$(closure$playerView);
          $receiver.addChild_l5rad2$(closure$scoreText);
          break;
        case 'GamePlay':
          closure$inputHandler.update();
          closure$engine.update_f22aj3$(it.seconds, closure$inputHandler.currentInputDirection);
          closure$model.score = closure$model.score + it.seconds;
          closure$scoreText.text = 'Score: ' + toIntFloor(closure$model.score);
          this$GamePlayScene.updateEnemyViews_0($receiver, copyToArray(closure$model.enemies), closure$enemyViews);
          xy(closure$playerView, closure$model.player.currentPosition.center.x - closure$model.player.currentPosition.radius, closure$model.player.currentPosition.center.y - closure$model.player.currentPosition.radius);
          xy(closure$playerSprite, closure$model.player.currentPosition.center.x - closure$playerSprite.scaledWidth / 2, closure$model.player.currentPosition.center.y - closure$playerSprite.scaledHeight / 2);
          closure$playerSprite.playAnimationLooped_tsl5ct$(closure$playerAnimations.get_11rb$(closure$model.player.currentActionType), TimeSpan_0.Companion.fromMilliseconds_14dthe$(200.0));
          if (closure$model.player.isDead) {
            closure$model.currentState = GameState$GameOver_getInstance();
            $receiver.addChild_l5rad2$(closure$uiBackground);
            $receiver.addChild_l5rad2$(closure$pressToRestartText);
          }
          break;
        case 'Restart':
          launchImmediately(this$GamePlayScene, GamePlayScene$sceneInit$lambda$lambda(this$GamePlayScene));
          break;
        default:break;
      }
      return Unit;
    };
  }
  function Coroutine$sceneInit_st8p7j$($this, $receiver_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.$this = $this;
    this.local$width = void 0;
    this.local$height = void 0;
    this.local$model = void 0;
    this.local$engine = void 0;
    this.local$inputHandler = void 0;
    this.local$uiBackground = void 0;
    this.local$playerView = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$sceneInit_st8p7j$.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$sceneInit_st8p7j$.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$sceneInit_st8p7j$.prototype.constructor = Coroutine$sceneInit_st8p7j$;
  Coroutine$sceneInit_st8p7j$.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            var tmp$, tmp$_0, tmp$_1, tmp$_2;
            this.local$width = (tmp$_0 = (tmp$ = this.local$$receiver.stage) != null ? tmp$.width : null) != null ? tmp$_0 : 0.0;
            this.local$height = (tmp$_2 = (tmp$_1 = this.local$$receiver.stage) != null ? tmp$_1.height : null) != null ? tmp$_2 : 0.0;
            this.local$model = new GameStateModel(new StageInfo(new Rectangle(new Point(0.0, 0.0), new Point(this.local$width, this.local$height)), [new EnemyGeneratorInfo(new Point(-50.0, -50.0), 1.0, 0.5), new EnemyGeneratorInfo(new Point(this.local$width + 50.0, -50.0), 0.5, 0.25), new EnemyGeneratorInfo(new Point(-50.0, this.local$height + 50.0), 0.3, 0.1), new EnemyGeneratorInfo(new Point(this.local$width + 50.0, this.local$height + 50.0), 1.5, 0.9)], new Rectangle(new Point(-100.0, -100.0), new Point(this.local$width + 100.0, this.local$height + 100.0))), new PlayerData(new Circle_0(new Point(this.local$width / 2.0, this.local$height / 2.0), 5.0), 500.0, false, ActionType$Down_getInstance()), ArrayList_init_0(), GameState$Init_getInstance(), 0.0);
            this.local$engine = new DodgeGameEngine(this.local$model);
            this.local$inputHandler = new PlayerMoveInputHandler([new PlayerMoveMouseInputHandler(this.$this.views.input), new PlayerMoveTouchInputHandler(this.$this.views.input), new PlayerMoveKeyboardInputHandler(this.$this.views.input)]);
            var $receiver_0_0 = addTo(new SolidRect_init(this.local$width, this.local$height, RGBA.Companion.invoke_tjonv8$(0, 0, 0, 128)), this.local$$receiver);
            solidRect$lambda($receiver_0_0);
            this.local$uiBackground = $receiver_0_0;
            this.local$playerView = xy(new Circle(this.local$model.player.currentPosition.radius, color.Colors.RED), this.local$model.player.currentPosition.center.x - this.local$model.player.currentPosition.radius, this.local$model.player.currentPosition.center.y - this.local$model.player.currentPosition.radius);
            this.state_0 = 2;
            this.result_0 = PersonSpriteAnimationLoader$Companion_getInstance().load_61zpoe$('maplewing.png', this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            var playerAnimations = this.result_0;
            var playerSprite = scale(Sprite_init(first(playerAnimations.values)), 0.2);
            xy(playerSprite, this.local$model.player.currentPosition.center.x - playerSprite.scaledWidth / 2, this.local$model.player.currentPosition.center.y - playerSprite.scaledHeight / 2);
            var enemyViews = ArrayList_init_0();
            var color_0_0;
            var font;
            color_0_0 = color_0.Colors.WHITE;
            font = Fonts.Companion.defaultFont;
            var $receiver_0_1 = addTo(Text.Companion.invoke_8ii8iq$('', 16.0, color_0_0, font), this.local$$receiver);
            text$lambda($receiver_0_1);
            var scoreText = xy_0($receiver_0_1, 0, 0);
            var text = 'Press SPACE / SCREEN to start';
            var color_0_1;
            var font_0;
            color_0_1 = color_0.Colors.WHITE;
            font_0 = Fonts.Companion.defaultFont;
            var $receiver_0_2 = addTo(Text.Companion.invoke_8ii8iq$(text, 16.0, color_0_1, font_0), this.local$$receiver);
            text$lambda($receiver_0_2);
            var pressToStartText = $receiver_0_2;
            xy(pressToStartText, this.local$width / 2 - pressToStartText.width / 2, this.local$height / 2 - pressToStartText.height / 2);
            var pressToRestartText = Text.Companion.invoke_8ii8iq$('Game Over! Press SPACE / SCREEN to Restart');
            xy(pressToRestartText, this.local$width / 2 - pressToRestartText.width / 2, this.local$height / 2 - pressToRestartText.height / 2);
            var prop = getPropertyCallableRef('click', 1, function ($receiver_0) {
              return $receiver_0.click;
            });
            var tmp$_3;
            if ((tmp$_3 = this.local$uiBackground != null ? get_mouse(this.local$uiBackground) : null) != null) {
              prop.get(tmp$_3).add_qlkmfe$(doMouseEvent$lambda$lambda(tmp$_3, GamePlayScene$sceneInit$lambda(this.local$model, this.$this)));
            }
            var prop_0 = getPropertyCallableRef('onKeyUp', 1, function ($receiver) {
              return $receiver.onKeyUp;
            });
            var tmp$_4;
            if ((tmp$_4 = this.local$$receiver != null ? get_keys(this.local$$receiver) : null) != null) {
              prop_0.get(tmp$_4).add_25kf2w$(GamePlayScene$sceneInit$lambda_0(this.local$model, this.$this));
            }
            addUpdater(this.local$$receiver, GamePlayScene$sceneInit$lambda_1(this.local$model, pressToStartText, this.local$uiBackground, playerSprite, this.local$playerView, scoreText, this.local$inputHandler, this.local$engine, enemyViews, this.$this, playerAnimations, pressToRestartText));
            return;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      } catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        } else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  GamePlayScene.prototype.sceneInit_st8p7j$ = function ($receiver_0, continuation_0, suspended) {
    var instance = new Coroutine$sceneInit_st8p7j$(this, $receiver_0, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  };
  GamePlayScene.prototype.updateEnemyViews_0 = function (container, enemiesData, enemyViews) {
    while (enemyViews.size < enemiesData.length) {
      var $receiver_0 = addTo(new Circle(16.0, color_0.Colors.WHITE, true), container);
      circle$lambda($receiver_0);
      enemyViews.add_11rb$($receiver_0);
    }
    while (enemyViews.size > enemiesData.length) {
      container.removeChild_gohfih$(last(enemyViews));
      enemyViews.removeAt_za3lpa$(get_lastIndex(enemyViews));
    }
    var tmp$, tmp$_0;
    var index = 0;
    tmp$ = enemyViews.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      var currentEnemy = enemiesData[checkIndexOverflow((tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0))];
      item.color = color.Colors.ORANGE;
      item.radius = currentEnemy.currentPosition.radius;
      xy(item, currentEnemy.currentPosition.center.x - currentEnemy.currentPosition.radius, currentEnemy.currentPosition.center.y - currentEnemy.currentPosition.radius);
    }
  };
  GamePlayScene.prototype.changeGameState_0 = function (model) {
    switch (model.currentState.name) {
      case 'Init':
        model.currentState = GameState$Start_getInstance();
        break;
      case 'GameOver':
        model.currentState = GameState$Restart_getInstance();
        break;
      default:break;
    }
  };
  GamePlayScene.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GamePlayScene',
    interfaces: [Scene]
  };
  function IPlayerMoveInputHandler() {
  }
  IPlayerMoveInputHandler.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'IPlayerMoveInputHandler',
    interfaces: []
  };
  function PlayerMoveInputHandler(inputHandlers) {
    this.inputHandlers_0 = inputHandlers;
  }
  Object.defineProperty(PlayerMoveInputHandler.prototype, 'currentInputDirection', {
    get: function () {
      var $receiver = this.inputHandlers_0;
      var tmp$;
      var accumulator = Vector$Companion_getInstance().ZERO;
      for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
        var element = $receiver[tmp$];
        accumulator = accumulator.plus_1y8c8z$(element.currentInputDirection);
      }
      return accumulator.normalize();
    }
  });
  PlayerMoveInputHandler.prototype.update = function () {
    var $receiver = this.inputHandlers_0;
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
      element.update();
    }
  };
  PlayerMoveInputHandler.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayerMoveInputHandler',
    interfaces: [IPlayerMoveInputHandler]
  };
  function PlayerMoveKeyboardInputHandler(input) {
    this.input_0 = input;
    this._currentInputDirection_0 = Vector$Companion_getInstance().ZERO;
  }
  Object.defineProperty(PlayerMoveKeyboardInputHandler.prototype, 'currentInputDirection', {
    get: function () {
      return this._currentInputDirection_0.normalize();
    }
  });
  PlayerMoveKeyboardInputHandler.prototype.update = function () {
    var tmp$;
    this._currentInputDirection_0 = (tmp$ = this.getInputDirection_0(this.input_0)) != null ? tmp$ : Vector$Companion_getInstance().ZERO;
  };
  PlayerMoveKeyboardInputHandler.prototype.getInputDirection_0 = function (input) {
    var tmp$, tmp$_0;
    var leftPressed = input.keys.get_9s040q$(Key.A) || input.keys.get_9s040q$(Key.LEFT);
    var rightPressed = input.keys.get_9s040q$(Key.D) || input.keys.get_9s040q$(Key.RIGHT);
    var upPressed = input.keys.get_9s040q$(Key.W) || input.keys.get_9s040q$(Key.UP);
    var downPressed = input.keys.get_9s040q$(Key.S) || input.keys.get_9s040q$(Key.DOWN);
    if (!leftPressed && !rightPressed && !upPressed && !downPressed) {
      return null;
    }if (!(leftPressed ^ rightPressed)) {
      tmp$ = 0.0;
    } else if (leftPressed) {
      tmp$ = -1.0;
    } else {
      tmp$ = 1.0;
    }
    var x = tmp$;
    if (!(upPressed ^ downPressed)) {
      tmp$_0 = 0.0;
    } else if (upPressed) {
      tmp$_0 = -1.0;
    } else {
      tmp$_0 = 1.0;
    }
    var y = tmp$_0;
    return new Vector(x, y);
  };
  PlayerMoveKeyboardInputHandler.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayerMoveKeyboardInputHandler',
    interfaces: [IPlayerMoveInputHandler]
  };
  function PlayerMoveMouseInputHandler(input) {
    this.input_0 = input;
    this._currentInputDirection_0 = Vector$Companion_getInstance().ZERO;
    this.hasClicked_0 = false;
    this.firstClickedPosition_0 = Point$Companion_getInstance().ZERO;
  }
  Object.defineProperty(PlayerMoveMouseInputHandler.prototype, 'currentInputDirection', {
    get: function () {
      return this._currentInputDirection_0.normalize();
    }
  });
  PlayerMoveMouseInputHandler.prototype.update = function () {
    var tmp$;
    this._currentInputDirection_0 = (tmp$ = this.getInputDirection_0(this.input_0)) != null ? tmp$ : Vector$Companion_getInstance().ZERO;
  };
  PlayerMoveMouseInputHandler.prototype.getInputDirection_0 = function (input) {
    var isCurrentClicked = this.isClicked_0(input);
    if (!isCurrentClicked) {
      this.hasClicked_0 = isCurrentClicked;
      this.firstClickedPosition_0 = Point$Companion_getInstance().ZERO;
      return null;
    }if (!this.hasClicked_0) {
      this.hasClicked_0 = isCurrentClicked;
      this.firstClickedPosition_0 = this.getCurrentClickedPosition_0(input);
      return Vector$Companion_getInstance().ZERO;
    }var currentClickedPosition = this.getCurrentClickedPosition_0(input);
    return currentClickedPosition.minus_txpyzu$(this.firstClickedPosition_0);
  };
  PlayerMoveMouseInputHandler.prototype.getCurrentClickedPosition_0 = function (input) {
    if (this.isClicked_0(input)) {
      return toPoint(input.mouse);
    } else {
      return Point$Companion_getInstance().ZERO;
    }
  };
  PlayerMoveMouseInputHandler.prototype.isClicked_0 = function (input) {
    return input.mouseButtons > 0;
  };
  PlayerMoveMouseInputHandler.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayerMoveMouseInputHandler',
    interfaces: [IPlayerMoveInputHandler]
  };
  function PlayerMoveTouchInputHandler(input) {
    this.input_0 = input;
    this._currentInputDirection_0 = Vector$Companion_getInstance().ZERO;
    this.hasClicked_0 = false;
    this.firstClickedPosition_0 = Point$Companion_getInstance().ZERO;
  }
  Object.defineProperty(PlayerMoveTouchInputHandler.prototype, 'currentInputDirection', {
    get: function () {
      return this._currentInputDirection_0.normalize();
    }
  });
  PlayerMoveTouchInputHandler.prototype.update = function () {
    var tmp$;
    this._currentInputDirection_0 = (tmp$ = this.getInputDirection_0(this.input_0)) != null ? tmp$ : Vector$Companion_getInstance().ZERO;
  };
  PlayerMoveTouchInputHandler.prototype.getInputDirection_0 = function (input) {
    var isCurrentClicked = this.isClicked_0(input);
    if (!isCurrentClicked) {
      this.hasClicked_0 = isCurrentClicked;
      this.firstClickedPosition_0 = Point$Companion_getInstance().ZERO;
      return null;
    }if (!this.hasClicked_0) {
      this.hasClicked_0 = isCurrentClicked;
      this.firstClickedPosition_0 = this.getCurrentClickedPosition_0(input);
      return Vector$Companion_getInstance().ZERO;
    }var currentClickedPosition = this.getCurrentClickedPosition_0(input);
    return currentClickedPosition.minus_txpyzu$(this.firstClickedPosition_0);
  };
  PlayerMoveTouchInputHandler.prototype.getCurrentClickedPosition_0 = function (input) {
    if (this.isClicked_0(input)) {
      return toPoint(first_0(input.activeTouches).current);
    } else {
      return Point$Companion_getInstance().ZERO;
    }
  };
  PlayerMoveTouchInputHandler.prototype.isClicked_0 = function (input) {
    return !input.activeTouches.isEmpty();
  };
  PlayerMoveTouchInputHandler.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayerMoveTouchInputHandler',
    interfaces: [IPlayerMoveInputHandler]
  };
  function PersonSpriteAnimationLoader() {
    PersonSpriteAnimationLoader$Companion_getInstance();
  }
  function PersonSpriteAnimationLoader$Companion() {
    PersonSpriteAnimationLoader$Companion_instance = this;
  }
  function Coroutine$load_61zpoe$($this, fileName_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.$this = $this;
    this.local$fileName = fileName_0;
  }
  Coroutine$load_61zpoe$.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$load_61zpoe$.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$load_61zpoe$.prototype.constructor = Coroutine$load_61zpoe$;
  Coroutine$load_61zpoe$.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = readBitmap(std.resourcesVfs.get_61zpoe$(this.local$fileName), void 0, void 0, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            var spriteMap = this.result_0;
            var columnSize = spriteMap.width / 3 | 0;
            var rowSize = spriteMap.height / 4 | 0;
            return mapOf([to(ActionType$Up_getInstance(), SpriteAnimation.Companion.invoke_1yoynw$(spriteMap, columnSize, rowSize, 0, 0, 3, 1)), to(ActionType$Right_getInstance(), SpriteAnimation.Companion.invoke_1yoynw$(spriteMap, columnSize, rowSize, rowSize, 0, 3, 1)), to(ActionType$Down_getInstance(), SpriteAnimation.Companion.invoke_1yoynw$(spriteMap, columnSize, rowSize, rowSize * 2 | 0, 0, 3, 1)), to(ActionType$Left_getInstance(), SpriteAnimation.Companion.invoke_1yoynw$(spriteMap, columnSize, rowSize, rowSize * 3 | 0, 0, 3, 1))]);
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      } catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        } else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  PersonSpriteAnimationLoader$Companion.prototype.load_61zpoe$ = function (fileName_0, continuation_0, suspended) {
    var instance = new Coroutine$load_61zpoe$(this, fileName_0, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  };
  PersonSpriteAnimationLoader$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var PersonSpriteAnimationLoader$Companion_instance = null;
  function PersonSpriteAnimationLoader$Companion_getInstance() {
    if (PersonSpriteAnimationLoader$Companion_instance === null) {
      new PersonSpriteAnimationLoader$Companion();
    }return PersonSpriteAnimationLoader$Companion_instance;
  }
  PersonSpriteAnimationLoader.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PersonSpriteAnimationLoader',
    interfaces: []
  };
  function main(continuation) {
    return korge.Korge.invoke_dnucxw$(new Korge$Config(GameModule_getInstance()), continuation);
  }
  function GameModule() {
    GameModule_instance = this;
    Module.call(this);
    this.mainScene_kxtxcn$_0 = getKClass(GamePlayScene);
    this.size_2gmd87$_0 = SizeInt.Companion.invoke_vux9f0$(640, 480);
    this.title_4t7dce$_0 = 'Dodge';
  }
  Object.defineProperty(GameModule.prototype, 'mainScene', {
    get: function () {
      return this.mainScene_kxtxcn$_0;
    }
  });
  Object.defineProperty(GameModule.prototype, 'size', {
    get: function () {
      return this.size_2gmd87$_0;
    }
  });
  Object.defineProperty(GameModule.prototype, 'title', {
    get: function () {
      return this.title_4t7dce$_0;
    }
  });
  function Coroutine$GameModule$configure$lambda($receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
  }
  Coroutine$GameModule$configure$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameModule$configure$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameModule$configure$lambda.prototype.constructor = Coroutine$GameModule$configure$lambda;
  Coroutine$GameModule$configure$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            return new GamePlayScene();
          case 1:
            throw this.exception_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      } catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        } else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameModule$configure$lambda($receiver_0, continuation_0, suspended) {
    var instance = new Coroutine$GameModule$configure$lambda($receiver_0, this, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  }
  GameModule.prototype.configure_5qt7s4$ = function ($receiver, continuation) {
    $receiver.mapPrototype_siz2e9$(getKClass(GamePlayScene), GameModule$configure$lambda);
  };
  GameModule.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'GameModule',
    interfaces: [Module]
  };
  var GameModule_instance = null;
  function GameModule_getInstance() {
    if (GameModule_instance === null) {
      new GameModule();
    }return GameModule_instance;
  }
  var package$GameEngine = _.GameEngine || (_.GameEngine = {});
  var package$Basic = package$GameEngine.Basic || (package$GameEngine.Basic = {});
  package$Basic.Circle = Circle_0;
  Object.defineProperty(Point, 'Companion', {
    get: Point$Companion_getInstance
  });
  package$Basic.Point = Point;
  package$Basic.toPoint_1tb8v$ = toPoint;
  package$Basic.Rectangle = Rectangle;
  Object.defineProperty(Vector, 'Companion', {
    get: Vector$Companion_getInstance
  });
  package$Basic.Vector = Vector;
  Object.defineProperty(ActionType, 'Up', {
    get: ActionType$Up_getInstance
  });
  Object.defineProperty(ActionType, 'Right', {
    get: ActionType$Right_getInstance
  });
  Object.defineProperty(ActionType, 'Down', {
    get: ActionType$Down_getInstance
  });
  Object.defineProperty(ActionType, 'Left', {
    get: ActionType$Left_getInstance
  });
  var package$Data = package$GameEngine.Data || (package$GameEngine.Data = {});
  package$Data.ActionType = ActionType;
  package$Data.EnemyData = EnemyData;
  package$Data.EnemyGeneratorInfo = EnemyGeneratorInfo;
  Object.defineProperty(GameState, 'Init', {
    get: GameState$Init_getInstance
  });
  Object.defineProperty(GameState, 'Start', {
    get: GameState$Start_getInstance
  });
  Object.defineProperty(GameState, 'GamePlay', {
    get: GameState$GamePlay_getInstance
  });
  Object.defineProperty(GameState, 'GameOver', {
    get: GameState$GameOver_getInstance
  });
  Object.defineProperty(GameState, 'Restart', {
    get: GameState$Restart_getInstance
  });
  package$Data.GameState = GameState;
  package$Data.GameStateModel = GameStateModel;
  package$Data.PlayerData = PlayerData;
  package$Data.StageInfo = StageInfo;
  package$GameEngine.DodgeGameEngine = DodgeGameEngine;
  Object.defineProperty(package$GameEngine, 'ENEMY_SIZE', {
    get: function () {
      return ENEMY_SIZE;
    }
  });
  Object.defineProperty(package$GameEngine, 'ENEMY_MIN_SPEED', {
    get: function () {
      return ENEMY_MIN_SPEED;
    }
  });
  Object.defineProperty(package$GameEngine, 'ENEMY_MAX_SPEED', {
    get: function () {
      return ENEMY_MAX_SPEED;
    }
  });
  package$GameEngine.EnemyGenerator = EnemyGenerator;
  $$importsForInline$$['korge-root-korge'] = $module$korge_root_korge;
  $$importsForInline$$['klock-root-klock'] = $module$klock_root_klock;
  _.GamePlayScene = GamePlayScene;
  var package$Input = _.Input || (_.Input = {});
  package$Input.IPlayerMoveInputHandler = IPlayerMoveInputHandler;
  package$Input.PlayerMoveInputHandler = PlayerMoveInputHandler;
  package$Input.PlayerMoveKeyboardInputHandler = PlayerMoveKeyboardInputHandler;
  package$Input.PlayerMoveMouseInputHandler = PlayerMoveMouseInputHandler;
  package$Input.PlayerMoveTouchInputHandler = PlayerMoveTouchInputHandler;
  Object.defineProperty(PersonSpriteAnimationLoader, 'Companion', {
    get: PersonSpriteAnimationLoader$Companion_getInstance
  });
  var package$SpriteAnimation = _.SpriteAnimation || (_.SpriteAnimation = {});
  package$SpriteAnimation.PersonSpriteAnimationLoader = PersonSpriteAnimationLoader;
  _.main = main;
  $$importsForInline$$['korinject-root-korinject'] = $module$korinject_root_korinject;
  Object.defineProperty(_, 'GameModule', {
    get: GameModule_getInstance
  });
  ENEMY_SIZE = 5.0;
  ENEMY_MIN_SPEED = 250.0;
  ENEMY_MAX_SPEED = 1000.0;
  main(internal.EmptyContinuation, false);
  Kotlin.defineModule('Dodge', _);
  return _;
}));

//# sourceMappingURL=Dodge.js.map
