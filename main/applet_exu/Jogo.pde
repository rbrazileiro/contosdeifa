//import processing.opengl.*;
import ddf.minim.*;

//Imagens
PImage rot1;
PImage rot2;
PImage rot3;
PImage rot4;
PImage bg;
PImage ganhou;
PImage perdeu;
PImage menu;
PImage cocoSeletor;
PImage creditos;

//Sons
Minim minim;
AudioPlayer musicaJogo;
AudioPlayer musicaRoteiro;
AudioPlayer sganhou;
AudioSample cocoCabeca;
AudioSample pegaCoco;
AudioSample cobrasom;
AudioPlayer srot1;
AudioPlayer srot2;
AudioPlayer srot3;
AudioPlayer srot4;

//Constantes
float GRAVIDADE_60 = 0.6;
float TEMPO_AION_60 = 16.6666667;

// Variáveis
int tempoAnterior;
float fps;
float tempoAion; //tempo entre um frame e outro
float tempoAionAnterior1;
float tempoAionAnterior2;
int estadoJogo;

final int MENU   = 0;
final int ROT1   = 1;
final int ROT2   = 2;
final int ROT3   = 3;
final int ROT4   = 4;
final int JOGO   = 5;
final int PERDEU = 6;
final int GANHOU = 7;
final int CREDITOS = 8;

int tempoInicio;
final int TEMPO_LIMITE = 60;
int tempoImagemRoteiro = 10;
int tempoFim;

// UNIVERSO
float gravidade;
float chao;
float margemEsq;
float margemDir;

//ENTRADA
boolean teclaEsq;
boolean teclaDir;
boolean teclaEspaco;
boolean travaTeclaEspaco;
boolean teclaCtrl;
boolean travaTeclaCtrl;
boolean selecao = true;

PFont font;

Jogador exu; // delaração de variável jogador
Coco[] cocos; //declaraçao de array de cocos
final int MAX_COCOS = 4;
int numCocosJogo = 1;

Macaco macacoEsq;
Macaco macacoDir;
Cobra cobra;

void carregaImagensESons() {
  minim = new Minim(this);
  musicaJogo = minim.loadFile("trilha/musicaJogo.mp3", 2048);
  musicaRoteiro = minim.loadFile("trilha/musicaRoteiro.mp3", 2048);
  sganhou = minim.loadFile("trilha/ganhou.mp3", 2048);

  cocoCabeca = minim.loadSample("trilha/cocoCabeca.mp3", 2048);
  pegaCoco = minim.loadSample("trilha/pegaCoco.mp3", 2048);
  cobrasom = minim.loadSample("trilha/cobra.mp3", 2048);

  srot1 = minim.loadFile("trilha/rot1.mp3", 2048);
  srot2 = minim.loadFile("trilha/rot2.mp3", 2048);
  srot3 = minim.loadFile("trilha/rot3.mp3", 2048);
  srot4 = minim.loadFile("trilha/rot4.mp3", 2048);

  rot1 = loadImage("bg/rot1.jpg");
  rot2 = loadImage("bg/rot2.jpg");
  rot3 = loadImage("bg/rot3.jpg");
  rot4 = loadImage("bg/rot4.jpg");
  ganhou = loadImage("bg/ganhou.jpg");
  perdeu = loadImage("bg/perdeu.jpg");
  bg = loadImage("bg/bg.png");
  cocoSeletor = loadImage("coco1.gif");
  menu = loadImage("bg/menu.jpg");
  creditos = loadImage("bg/creditos.jpg");
}

void setup() {
  size (800, 600);
  background(255);
  carregaImagensESons();
  chao = height - 40;
  margemEsq = 0 + 20;
  margemDir = width - 20;
  frameRate(60);
  //cria jogador
  exu = new Jogador();
  //cria macacos
  macacoEsq = new Macaco(margemEsq, random (10, 200));
  macacoDir = new Macaco(margemDir, random (10, 200));
  //array coco
  cocos = new Coco[MAX_COCOS];
  //preenche array com cocos
  for (int i = 0; i < MAX_COCOS; i++) { 
    cocos[i] = new Coco();
    //divide os cos existentes pelos macacos
    if (i%2 == 0) {
      macacoEsq.meusCocos[i]=cocos[i];
    } 
    else { 
      macacoDir.meusCocos[i]=cocos[i];
    }
  }

  cobra = new Cobra();

  font = loadFont("Purisa-Bold-32.vlw"); 
  textFont(font);

  estadoJogo = MENU;
  musicaRoteiro.play();
  musicaRoteiro.loop();
  musicaJogo.play();
  musicaJogo.loop();
}

//iroko - tempo - mainLoop - Laço principal
void draw() {
  atualiza();

  //desenha
  if (estadoJogo == MENU) {
    background(menu);
    rectMode (CORNER);
    fill (0);
    text ("Jogar", 285, 235, 700, 70);
    text ("Créditos", 285, 465, 700, 70);
    text ("Tecle C para coletar os cocos", 470, 230, 70, 70);
    text ("Barra de espaço para pular", 470, 450, 70, 70);
    if (selecao) {
      image(cocoSeletor, 265, 255);
    } 
    else {
      image(cocoSeletor, 265, 475);
    }
  } 
  else if (estadoJogo == CREDITOS) {
    background(creditos);
    rectMode(CENTER);
    //text ("Créditos", width/2, height/2, 700, 70);
  }
  else if (estadoJogo == ROT1) {
    background(rot1);
  }
  else if (estadoJogo == ROT2) {
    background(rot2);
  }
  else if (estadoJogo == ROT3) {
    background(rot3);
  }
  else if (estadoJogo == ROT4) {
    background(rot4);
  }
  else if (estadoJogo == JOGO) {
    background(bg);
    exu.desenha();
    for (int i=0; i<MAX_COCOS; i++) {
      cocos[i].desenha();
    }
    macacoEsq.desenha();
    macacoDir.desenha();
    cobra.desenha();
    desenhaStatus();
  } 
  else if (estadoJogo == PERDEU) {
    background(rot1);
    rectMode (CENTER);
    fill (0);
    text ("Tente novamente...", 430, 514, 500, 70);
  } 
  else if (estadoJogo == GANHOU) {
    background(ganhou);
    rectMode (CENTER);
    fill (0);
    text ("Laroiê, Exu!", width/2, height/2, 500, 70);
  }
}


void desenhaStatus() {
  rectMode (CENTER);
  fill (0);
  int tempo = (1+TEMPO_LIMITE-(millis()/1000-tempoInicio));
  if (tempo < 0) {
    tempo = 0;
  }
  text ("Cocos coletados:" + exu.numCocos + " Tempo:" + tempo, width/2 + 50, 40, 700, 70);
}

void atualiza() {
  calculaFPSMaquina();
  switch (estadoJogo) {
  case MENU:
    if (teclaEspaco == false) {
      travaTeclaEspaco = false;
    }

    if (musicaJogo.isPlaying() == false) {
      musicaJogo.play();
    }

    if (musicaRoteiro.isPlaying() == true) {
      musicaRoteiro.pause();
    }

    exu.numCocos = 0;
    if (teclaEspaco == true && travaTeclaEspaco == false) {
      if (selecao) {
        estadoJogo = ROT1;
        tempoInicio = millis()/1000;
      } 
      else {
        estadoJogo = CREDITOS;
      }
      travaTeclaEspaco = true;
    }
    break;
  case CREDITOS:
    if (teclaEspaco == false) {
      travaTeclaEspaco = false;
    }
    if (teclaEspaco == true && travaTeclaEspaco == false) {
      travaTeclaEspaco = true;
      estadoJogo = MENU;
    }
    break;
  case ROT1:
    if (musicaRoteiro.isPlaying() == false) {
      musicaRoteiro.play();
      musicaRoteiro.loop();
    }

    if (musicaJogo.isPlaying() == true) {
      musicaJogo.pause();
    }

    if (teclaEspaco == false) {
      travaTeclaEspaco = false;
    }
    //if (musicaDeFundo.isPlaying() == false) {
    //musicaDeFundo.play();
    //musicaDeFundo.loop();
    //}

    if (srot1.isPlaying() == false) {
      srot1.play();
    }

    if (millis()/1000 - tempoInicio > 20 || (teclaEspaco == true && travaTeclaEspaco == false)) {
      estadoJogo = ROT2;
      travaTeclaEspaco = true;
      tempoInicio = millis()/1000;
    }

    break;
  case ROT2:
    if (teclaEspaco == false) {
      travaTeclaEspaco = false;
    }
    if (srot1.isPlaying() == true) {
      srot1.pause();
    }

    if (srot2.isPlaying() == false) {
      srot2.play();
    }

    if (millis()/1000 - tempoInicio > 10 || (teclaEspaco == true && travaTeclaEspaco == false)) {
      estadoJogo = ROT3;
      travaTeclaEspaco = true;
      tempoInicio = millis()/1000;
    }

    break;
  case ROT3:
    if (teclaEspaco == false) {
      travaTeclaEspaco = false;
    }
    if (srot2.isPlaying() == true) {
      srot2.pause();
    }

    if (srot3.isPlaying() == false) {
      srot3.play();
    }

    if (millis()/1000 - tempoInicio > 15 || (teclaEspaco == true && travaTeclaEspaco == false)) {
      estadoJogo = ROT4;
      travaTeclaEspaco = true;
      tempoInicio = millis()/1000;
    }

    break;
  case ROT4:
    if (teclaEspaco == false) {
      travaTeclaEspaco = false;
    }
    if (srot3.isPlaying() == true) {
      srot3.pause();
    }

    if (srot4.isPlaying() == false) {
      srot4.play();
    }

    if (millis()/1000 - tempoInicio > 8 || (teclaEspaco == true && travaTeclaEspaco == false)) {
      estadoJogo = JOGO;
      travaTeclaEspaco = true;
      tempoInicio = millis()/1000;
    }
    break;
  case JOGO:

    if (musicaJogo.isPlaying() == false) {
      musicaJogo.play();
      musicaJogo.loop();
    }

    if (musicaRoteiro.isPlaying() == true) {
      musicaRoteiro.pause();
    }

    if (teclaEspaco == false) {
      travaTeclaEspaco = false;
    }
    if (srot4.isPlaying() == true) {
      srot4.pause();
    }

    atualizaEstadoJogo();
    if (millis()/1000 - tempoInicio > TEMPO_LIMITE) {
      estadoJogo = PERDEU;
      tempoFim = millis()/1000;
    }
    break;
  case PERDEU:
    if (teclaEspaco == true && millis()/1000-tempoFim > 1.8 && travaTeclaEspaco == false) {
      travaTeclaEspaco = true;
      estadoJogo = MENU;
      tempoInicio = millis()/1000;
      exu.numCocos = 0;
    }
    break;
  case GANHOU:
    if (sganhou.isPlaying() == false) {
      sganhou.play();
    }

    if (teclaEspaco == true && millis()/1000-tempoFim > 1.8 && travaTeclaEspaco == false) {
      travaTeclaEspaco = true;
      estadoJogo = MENU;
      tempoInicio = millis()/1000;
      exu.numCocos = 0;
    }
    break;
  }
}

void calculaFPSMaquina() {
  //trata tempo baseado em fps da máquina
  tempoAion = (millis() - tempoAnterior + tempoAionAnterior1 + tempoAionAnterior2)/3;
  tempoAionAnterior2 = tempoAionAnterior1;
  tempoAionAnterior1 = millis() - tempoAnterior;
  fps = 1000/tempoAion;

  //println("FPS:" + fps);
  tempoAnterior = millis();
}

void atualizaEstadoJogo() {
  //gravidade dependente do clock
  gravidade = tempoAion * GRAVIDADE_60 / TEMPO_AION_60;

  //entra personagem-player
  exu.atualiza();  
  macacoEsq.atualiza();
  macacoDir.atualiza();
  cobra.atualiza();

  //dificuldade com mais cocos
  numCocosJogo = exu.numCocos/4+1;
  if (numCocosJogo > MAX_COCOS) {
    numCocosJogo = MAX_COCOS;
  }

  //coloca cocos na mao dos macacos
  for (int i=0; i<MAX_COCOS; i = i + 1) { 
    cocos[i].atualiza();
  }

  //macacos atiram cocos
  macacoEsq.atiraCoco();
  macacoDir.atiraCoco();

  //detecta colisoes
  //colisao jogador-coco
  for (int i=0; i<MAX_COCOS; i++) {
    if (cocos[i].lugarX+cocos[i].largura/2 > exu.lugarX-exu.largura/2 && 
      cocos[i].lugarX-cocos[i].largura/2 < exu.lugarX+exu.largura/2 &&
      cocos[i].lugarY+cocos[i].altura/2 > exu.lugarY-exu.altura/2 &&
      cocos[i].lugarY-cocos[i].altura/2 < exu.lugarY+exu.altura/2) {
      if (cocos[i].estado == cocos[i].NO_CHAO) {
        exu.cocosColados[i] = cocos[i];
      } 
      else if (cocos[i].estado == cocos[i].ATIRADO) {
        exu.machucou(false);
        cocos[i].estado = cocos[i].INATIVO;
        cocos[i].lugarX = cocos[i].lugarY = -20;
      }
    }
    else {  //se nao colidiu tira coco de cocoColado
      exu.cocosColados[i] = null;
    }
  }

  //colisao jogador-cobra
  if (cobra.lugarX+cobra.largura/2 > exu.lugarX-exu.largura/2 && 
    cobra.lugarX-cobra.largura/2 < exu.lugarX+exu.largura/2 &&
    cobra.lugarY+cobra.altura/2 > exu.lugarY-exu.altura/2 &&
    cobra.lugarY-cobra.altura/2 < exu.lugarY+exu.altura/2) {
    exu.machucou(true);
    //cobra.estado = cobra.MORDENDO;
  }
}

//evento pressionar tecla
void  keyPressed() {
  if (keyCode == LEFT) {
    teclaEsq = true;
  }
  if (keyCode == RIGHT) {
    teclaDir = true;
  }
  if (key == ' ') {
    teclaEspaco = true;
  }
  if (key == 'c' || key == 'C') {
    teclaCtrl = true;
  }
}

//evento tecla liberada
void keyReleased() {
  if (keyCode == LEFT) {
    teclaEsq = false;
  }
  if (keyCode == RIGHT) {
    teclaDir = false;
  }
  if (keyCode == DOWN) {
    selecao = false;
  }
  if (keyCode == UP) {
    selecao = true;
  }
  if (key == ' ') {
    teclaEspaco = false;
  }
  if (key == 'c' || key == 'C') {
    teclaCtrl = false;
  }
  if (key == 'g') {
    estadoJogo = GANHOU;
  }
  if (key == 'p') {
    estadoJogo = PERDEU;
  }
}

void mousePressed() {
  println(mouseX + ", " + mouseY);
}

void stop()
{
  //kick.close();
  //player.close();
  minim.stop();
  super.stop();
}

