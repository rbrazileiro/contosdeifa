canvasGame = document.getElementById('game');
ctxGame = canvasGame.getContext('2d');
canvasHM = document.getElementById('homingmissile');
ctxHM = canvasHM.getContext('2d');
canvasHUD = document.getElementById('HUD');
ctxHUD = canvasHUD.getContext('2d');

var game = {
	STATE_STARTING_SCREEN : 1,
	STATE_PLAYING : 2,
	STATE_GAMEOVER_SCREEN : 3,
	STATE_HELP_SCREEN : 4,
	STATE_DEAD_SCREEN : 5,
	STATE_STARTING_SCREEN2 : 6,
	state : 0,
	
	currentLevel: 0
};

var isPlaying = false;

var pressedKeys = [];
var KEY = {
	D: 68,
	A: 65,
	W: 87,
	S: 83,
	SHIFT: 16,
	SPACE: 32,
	C: 67,

	UP: 38,
	LEFT: 37,
	RIGHT: 39,
	DOWN: 40,
	ZERO: 96
};

var width;
var height;

var mouseX = 0;
var mouseY = 0;

var spd = 8;
var frameCount = 0;
var fps = 45;

var score;
var newRectangles;
var factor = 150;
var factor2 = 350;  

var dragging;

//player variables
var bulletDelay;
var bulletDelay2;
var bulletList = [];
var bulletList2 = [];
var bullet1IsColliding;
var bullet1IsVisible = false;
var bulletSpd = 20;
var bd = 5;
var bd2 = 5;
var bulletPlayer1Sound = document.getElementById('bulletPlayer1');
bulletPlayer1Sound.volume = .9;
var playerHealth = 6;
var playerHealth2 = 6;
var hasHomingMissile = false;
var missileOut = false;
var hMissile;
//player variables

var bulletDelay3;
var bd3 = 15;

//enemy variables
var enemyList1 = [];
var enemySpd = 2;
var enemyCount1;
var bulletEnemyList = [];
var enemyBulletDelay = Math.floor((Math.random() * 30) + 50);
var ebd = enemyBulletDelay;
var bulletDelayEnemy = ebd;
//enemy variables

//Bosses
var bossEnemyList1 = [];
var bulletBossEnemyList1 = [];
var bossHealth1 = 6;

var bossEnemyList2 = [];
var bulletBossEnemyList2 = [];
var bulletBossEnemyListt2 = [];
var bossHealth2 = 6;

var bbd = 10
var bossBulletDelay = bbd;
//Bosses

//image variables
var img = new Image();
img.src = "images/SeaTrial.png";
var planeImage1 = new Image();
planeImage1.src = "images/KillPlane1.png";
var planeImage2 = new Image();
planeImage2.src = "images/KillPlane2.png";
var planeBullet1 = new Image();
planeBullet1.src = "images/Bullet1.png";
var planeHomingMissile = new Image();
planeHomingMissile.src = "images/homingMissile.png";
var enemyImage1 = new Image();
enemyImage1.src = "images/EnemyOwn1.png";
var enemyBullet1 = new Image();
enemyBullet1.src = "images/EnemyBullet1.png";
var explosionImg = new Image();
explosionImg.src = "images/Explosion.png";
var healthBarImg = new Image();
healthBarImg.src = "images/HealthBar.png";
var healthItemImg = new Image();
healthItemImg.src = "images/HealthItem.png";
var healthBarImg2 = new Image();
healthBarImg2.src = "images/HealthBar2.png";
var coinItemImg = new Image();
coinItemImg.src = "images/GoldCoin.png";
var bossEnemyBullet1 = new Image();
bossEnemyBullet1.src = "images/EnemyBullet2.png";
var enemyImage3 = new Image();
enemyImage3.src = "images/EnemyOwn3.png";
var enemyBullet3 = new Image();
enemyBullet3.src = "images/EnemyBullet3-1.png";
var enemyBullett3 = new Image();
enemyBullett3.src = "images/EnemyBullet3-2.png";
//image variables

//object variables
var bg1 = new Background();
var bg2 = new Background();
var player1 = new Player();
var player2 = new Player();
//object variables

var explosionList = [];
var explosionSound = document.getElementById('explosion');
explosionSound.volume = .4;

var introSound = document.getElementById('menuSong');
introSound.volume = .4;

var gameSound = document.getElementById('gameSong');
gameSound.volume = .4;

//Button Objects
var playButton = new Button(230, 410, 355, 440);
var helpButton = new Button(205, 410, 450, 550);
var backHelpButton = new Button(435, 560, 740, 780);
var player1Button = new Button(145, 455, 200, 305);
var player2Button = new Button(130, 485, 325, 415);
var continueButton = new Button(160, 390, 590, 625);
var tryAgainButton = new Button(160, 390, 670, 705);
var mainMenuButton = new Button(160, 390, 750, 785);

//Health THings
var healthBarList = [];
var healthBarCount = 1;
var healthBarList2 = [];
var healthBarCount2 = 1;

//Item Things
var healthItemList = [];
var coinItemList = [];

var dead = false;
var dead2 = false;

var drawInterval;
var updateInterval;
var timer;