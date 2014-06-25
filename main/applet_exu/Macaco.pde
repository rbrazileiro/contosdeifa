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

  void desenha() {
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

  void atualiza() {
    //velocidade baseada no clock
    velY = tempoAion * VEL_Y_60 / TEMPO_AION_60;

    //move macaco
    switch(estado) {
    case ATIRANDO:
      if (millis() > quandoAtirou + TEMPO_ATIRANDO + 0.5) {
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

  void atiraCoco() {
    for (int i=0;i<numCocosJogo;i++) {
      if (meusCocos[i] != null) {
        if (meusCocos[i].estado == meusCocos[i].INATIVO) {
          meusCocos[i].lugarY = lugarY;
          if (lugarX < width/2) { //se é macaco da esquerda
            meusCocos[i].lugarX=margemEsq;
            meusCocos[i].forca = random (0, 1);
          } 
          else { //senão, é o macaco da direita
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

