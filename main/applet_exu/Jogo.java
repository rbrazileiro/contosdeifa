import processing.core.*; 
import processing.xml.*; 

import ddf.minim.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class Jogo extends PApplet {

//import processing.opengl.*;


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
float GRAVIDADE_60 = 0.6f;
float TEMPO_AION_60 = 16.6666667f;

// Vari\u00e1veis
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

Jogador exu; // delara\u00e7\u00e3o de vari\u00e1vel jogador
Coco[] cocos; //declara\u00e7ao de array de cocos
final int MAX_COCOS = 4;
int numCocosJogo = 1;

Macaco macacoEsq;
Macaco macacoDir;
Cobra cobra;

public void carregaImagensESons() {
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

public void setup() {
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

//iroko - tempo - mainLoop - La\u00e7o principal
public void draw() {
  atualiza();

  //desenha
  if (estadoJogo == MENU) {
    background(menu);
    rectMode (CORNER);
    fill (0);
    text ("Jogar", 285, 235, 700, 70);
    text ("Cr\u00e9ditos", 285, 465, 700, 70);
    text ("Tecle C para coletar os cocos", 470, 230, 70, 70);
    text ("Barra de espa\u00e7o para pular", 470, 450, 70, 70);
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
    //text ("Cr\u00e9ditos", width/2, height/2, 700, 70);
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
    text ("Laroi\u00ea, Exu!", width/2, height/2, 500, 70);
  }
}


public void desenhaStatus() {
  rectMode (CENTER);
  fill (0);
  int tempo = (1+TEMPO_LIMITE-(millis()/1000-tempoInicio));
  if (tempo < 0) {
    tempo = 0;
  }
  text ("Cocos coletados:" + exu.numCocos + " Tempo:" + tempo, width/2 + 50, 40, 700, 70);
}

public void atualiza() {
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
    if (teclaEspaco == true && millis()/1000-tempoFim > 1.8f && travaTeclaEspaco == false) {
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

    if (teclaEspaco == true && millis()/1000-tempoFim > 1.8f && travaTeclaEspaco == false) {
      travaTeclaEspaco = true;
      estadoJogo = MENU;
      tempoInicio = millis()/1000;
      exu.numCocos = 0;
    }
    break;
  }
}

public void calculaFPSMaquina() {
  //trata tempo baseado em fps da m\u00e1quina
  tempoAion = (millis() - tempoAnterior + tempoAionAnterior1 + tempoAionAnterior2)/3;
  tempoAionAnterior2 = tempoAionAnterior1;
  tempoAionAnterior1 = millis() - tempoAnterior;
  fps = 1000/tempoAion;

  //println("FPS:" + fps);
  tempoAnterior = millis();
}

public void atualizaEstadoJogo() {
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
public void  keyPressed() {
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
public void keyReleased() {
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

public void mousePressed() {
  println(mouseX + ", " + mouseY);
}

public void stop()
{
  //kick.close();
  //player.close();
  minim.stop();
  super.stop();
}

class Cobra {
  float lugarX;
  float lugarY;
  int estado;
  final int ANDANDO_ESQ = 0;
  final int ANDANDO_DIR = 1;
  final int MORDENDO = 2;
  final int INATIVO = 3;
  float VEL_X_60 = 3;
  float velX;
  float altura = 10;
  float largura = 60;

  Sprite spriteAndando;

  Cobra () {
    lugarX = -2*largura;
    lugarY = chao-altura/2;
    spriteAndando = new Sprite ("cobra", 3);
  }

  public void desenha() {
    switch (estado) {
    case ANDANDO_ESQ:
      spriteAndando.desenha(lugarX, lugarY, true);
      break;
    case ANDANDO_DIR:
      spriteAndando.desenha(lugarX, lugarY, false);
      break;
    case MORDENDO:
      //caso mordendo n\u00e3o desenhar cobra pois j\u00e1 est\u00e1 no desenho do Exu.
      break;
    }
  }

  public void atualiza() {
    //velocidade baseada no clock
    velX = tempoAion * VEL_X_60 / TEMPO_AION_60;
    if (estado==ANDANDO_DIR) {
      lugarX = lugarX + velX*random(1);
      if (lugarX > largura+width) {
        estado=ANDANDO_ESQ;
      }
    } 
    else if (estado==ANDANDO_ESQ) {
      lugarX = lugarX - velX*random(1);
      if (lugarX < -largura) {
        estado=ANDANDO_DIR;
      }
    }
  }
}

class Coco {
  float TEMPO_PARADO = 2100;
  float VEL_X_60 = 10;
  float FATOR_GRAV = 0.75f;
  float lugarX;
  float lugarY;
  float velX;
  float velY;
  float forca;
  int estado;
  final int INATIVO = 0;
  final int ATIRADO = 1;
  final int NO_CHAO = 2;
  float quandoCaiu;
  float largura = 15;
  float altura = 20;
  Sprite spriteAtirado;
  Sprite spriteNoChao;

  Coco() {
    lugarY = -20;
    lugarX = -20;
    estado = INATIVO;
    spriteAtirado = new Sprite("coco", 4);
    spriteNoChao = new Sprite("coco", 1);
  }

  public void desenha() {
    switch (estado) {
    case ATIRADO:
      spriteAtirado.desenha(lugarX, lugarY, false);
      break;
    case NO_CHAO:
      spriteNoChao.desenha(lugarX, lugarY, false);
      break;
    }
  }

  public void atualiza() {
    switch(estado) {
    case INATIVO:
      break;
    case ATIRADO:
      lugarX = lugarX + velX*forca;
      lugarY = lugarY + velY;
      velY = velY + gravidade*FATOR_GRAV;
      if (lugarY >= chao-(altura/2)) {
        velY = 0;
        velX = 0;
        lugarY = chao-(altura/2);
        estado = NO_CHAO;
        quandoCaiu = millis();
      } 
      else if (lugarY < chao-(altura/2)) {
        velX = tempoAion * VEL_X_60 / TEMPO_AION_60;
      }

      break;
    case NO_CHAO:
      if (millis() > quandoCaiu + TEMPO_PARADO) {
        estado = INATIVO;
        lugarX = -20;
        lugarY = -20;
      }
      break;
    }
  }
}

class Jogador {
  // ATRIBUTOS
  float IMPULSO_60 = 12;
  float VELOCIDADE_X_60 = 7;
  float impulso;
  float velocidadeX;
  float lugarX;
  float lugarY; // s = S0 + V0.t + a.t.t/2
  float velY;
  Coco[] cocosColados;
  boolean viradoParaEsq = true;
  int estado;
  final int PARADO = 0;
  final int CORRENDO = 1;
  final int PULANDO = 2;
  final int MACHUCADO_COCO = 3;
  final int MACHUCADO_COBRA = 4;
  final int PEGANDO = 5;
  float quandoMachucou;
  final float TEMPO_MACHUCADO = 600;
  float quandoPegou;
  final float TEMPO_PEGANDO = 125;
  int numCocos;
  float largura = 40;
  float altura = 100;

  Sprite spriteCorrendo;
  Sprite spriteParado;
  Sprite spritePulando;
  Sprite spriteMachucadoCoco;
  Sprite spriteMachucadoCobra;
  Sprite spritePegaCoco;

  Jogador () {
    lugarX = width/2;
    lugarY = height/2;
    cocosColados = new Coco[MAX_COCOS];

    //preenche array com cocos
    for (int i = 0; i < MAX_COCOS; i++) { 
      cocosColados[i] = null;
    }

    spriteCorrendo = new Sprite("exu_correndo", 8);
    spriteParado = new Sprite("exu_parado", 4);
    spritePulando = new Sprite("exu_pulando", 4);
    spriteMachucadoCoco = new Sprite("exu_machucado_coco", 1);
    spriteMachucadoCobra = new Sprite("exu_machucado_cobra", 1);
    spritePegaCoco = new Sprite("exu_pegando", 1);
  }

  public void desenha() {
    fill (60, 60, 60);
    switch (estado) {
    case CORRENDO:
      spriteCorrendo.desenha(lugarX, lugarY-20, viradoParaEsq);
      break;
    case PARADO:
      spriteParado.desenha(lugarX, lugarY-20, viradoParaEsq);
      break;
    case PULANDO:
      spritePulando.desenha(lugarX, lugarY-20, viradoParaEsq);
      break;
    case MACHUCADO_COCO:
      spriteMachucadoCoco.desenha(lugarX, lugarY-20, viradoParaEsq);
      break;
    case MACHUCADO_COBRA:
      spriteMachucadoCobra.desenha(lugarX, lugarY-20, viradoParaEsq);
      //spriteMachucadoCoco.desenha(lugarX, lugarY-20, viradoParaEsq);
      break;
    case PEGANDO:
      spritePegaCoco.desenha(lugarX, lugarY-20, viradoParaEsq);
      break;
    }
  }

  public void atualiza() {

    switch(estado) {
    case PEGANDO:
      if (millis() > quandoPegou + TEMPO_PEGANDO) {
        estado = PARADO;
      }
      break;
    case PARADO:
    case PULANDO:
    case CORRENDO:
      impulso = tempoAion * IMPULSO_60 / TEMPO_AION_60;
      velocidadeX = tempoAion * VELOCIDADE_X_60 / TEMPO_AION_60;

      //trata entradas do jogador
      if (teclaEsq == true) {
        lugarX = lugarX - velocidadeX;
        viradoParaEsq = true;
        if (estado == PARADO) {
          estado = CORRENDO;
        }
      }
      if (teclaDir == true) {
        lugarX = lugarX + velocidadeX;
        viradoParaEsq = false;
        if (estado == PARADO) {
          estado = CORRENDO;
        }
      }
      if (!teclaDir && !teclaEsq && estado != PULANDO) {
        estado = PARADO;
      }
      if (teclaEspaco == true && travaTeclaEspaco == false) {
        velY = -1*impulso*lugarY/height;
        travaTeclaEspaco = true;
        estado = PULANDO;
      }
      if (teclaEspaco == false) {
        travaTeclaEspaco = false;
      }
      if (teclaCtrl == true && travaTeclaCtrl == false && estado != PULANDO) {
        estado = PEGANDO;
        quandoPegou = millis();
        for (int i = 0; i < MAX_COCOS; i++) {
          if (cocosColados[i] != null) {
            cocosColados[i].estado = cocosColados[i].INATIVO;
            numCocos++;
            pegaCoco.trigger();
            if (numCocos==16) {
              estadoJogo = GANHOU;
              tempoFim = millis()/1000;
            }
            break;
          }
        }
        travaTeclaCtrl = true;
      }
      if (teclaCtrl == false) {
        travaTeclaCtrl = false;
      }

      // trata posicao do jogador
      lugarY = lugarY + velY;
      velY = velY + gravidade;
      if (lugarY > chao-(altura/2)) {
        velY = 0;
        lugarY = chao-(altura/2);
        if (estado == PULANDO) {
          estado = PARADO;
        }
      }
      if (lugarX < margemEsq) {
        lugarX = margemEsq;
      }
      if (lugarX > margemDir) {
        lugarX = margemDir;
      }
      break;
    case MACHUCADO_COCO:
      if(lugarX < 100){
        lugarX = 105;
      }
      if(lugarX > width-100){
        lugarX = width-105;
      }
      if (millis() > quandoMachucou + TEMPO_MACHUCADO) {
        estado = CORRENDO;
      }
      break;
    case MACHUCADO_COBRA:
      if (millis() > quandoMachucou + TEMPO_MACHUCADO) {
        estado = CORRENDO;
      }
      break;
    }
  }

  public void machucou(boolean cobra) {
    if (cobra) {
      estado = MACHUCADO_COBRA;
      cobrasom.trigger();
    } 
    else {
      cocoCabeca.trigger();
      estado = MACHUCADO_COCO;
    }
    numCocos = numCocos/2;
    quandoMachucou = millis();
  }
}

class Macaco {
  float lugarX;
  float lugarY;
  int estado;
  final int ATIRANDO = 0;
  final int SUBINDO = 1;
  final int DESCENDO = 2;
  Coco[] meusCocos;
  float VEL_Y_60 = 6;
  float velY;
  float altura = 40;
  float largura = 20;
  float quandoAtirou;
  final int TEMPO_ATIRANDO = 125;

  Sprite spriteMovendo;
  Sprite spriteAtirando;

  Macaco (float x, float y) {
    lugarX = x;
    lugarY = y;
    meusCocos = new Coco[MAX_COCOS];
    for (int i = 0; i < MAX_COCOS; i++) { 
      meusCocos[i] = null;
    }

    spriteMovendo = new Sprite ("macaco", 3);
    spriteAtirando = new Sprite ("macaco_atira", 1);

    estado = DESCENDO;
  }

  public void desenha() {
    switch (estado) {
    case SUBINDO:
    case DESCENDO:
      if (lugarX < width/2) {
        spriteMovendo.desenha(lugarX, lugarY, false);
      } 
      else {
        spriteMovendo.desenha(lugarX, lugarY, true);
      }
      break;
    case ATIRANDO:
      if (lugarX < width/2) {
        spriteAtirando.desenha(lugarX, lugarY, false);
      } 
      else {
        spriteAtirando.desenha(lugarX, lugarY, true);
      }
      break;
    }
  }

  public void atualiza() {
    //velocidade baseada no clock
    velY = tempoAion * VEL_Y_60 / TEMPO_AION_60;

    //move macaco
    switch(estado) {
    case ATIRANDO:
      if (millis() > quandoAtirou + TEMPO_ATIRANDO + 0.5f) {
        if (random(1) > 0) {
          estado = DESCENDO;
        } else {
          estado = SUBINDO;
        }
      }
      break;
    case SUBINDO:
      lugarY = lugarY - velY*random(1);
      if (lugarY < 20) {
        estado = DESCENDO;
      }
      break;
    case DESCENDO:
      lugarY = lugarY + velY*random(1);
      if (lugarY > 340) {
        estado = SUBINDO;
      }
      break;
    }
  }

  public void atiraCoco() {
    for (int i=0;i<numCocosJogo;i++) {
      if (meusCocos[i] != null) {
        if (meusCocos[i].estado == meusCocos[i].INATIVO) {
          meusCocos[i].lugarY = lugarY;
          if (lugarX < width/2) { //se \u00e9 macaco da esquerda
            meusCocos[i].lugarX=margemEsq;
            meusCocos[i].forca = random (0, 1);
          } 
          else { //sen\u00e3o, \u00e9 o macaco da direita
            meusCocos[i].lugarX = margemDir;
            meusCocos[i].forca = -1*random (0, 1);
          }
          meusCocos[i].estado = meusCocos[i].ATIRADO;
          estado = ATIRANDO;
          quandoAtirou = millis();
        }
      }
    }
    for (int i = numCocosJogo; i<MAX_COCOS; i++) {
      if (meusCocos[i] != null) {
        meusCocos[i].estado = meusCocos[i].INATIVO;
        meusCocos[i].lugarX = -20;
        meusCocos[i].lugarY = -20;
      }
    }
  }
}

class Sprite {
  PImage[] frames;
  float frameAtual = 0;
  int numFrames;

  Sprite (String nome, int num) {
    numFrames = num;
    frames  = new PImage [numFrames];
    for (int i=0; i<numFrames; i++) {
      frames[i] = loadImage (nome + i + ".gif");
    }
  }

  public void desenha (float x, float y, boolean espelhar) {
    imageMode (CENTER);

    if (espelhar) {
      pushMatrix();
      scale(-1, 1);
      image(frames[(int) frameAtual], -x, y);
      popMatrix();
    } 
    else {
      image(frames[(int) frameAtual], x, y);
    }

    frameAtual+=0.4f;
    if (frameAtual >= numFrames) {
      frameAtual = 0;
    }
  }
}

  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#ECE9D8", "Jogo" });
  }
}
