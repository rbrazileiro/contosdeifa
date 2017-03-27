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

  void desenha() {
    switch (estado) {
    case ANDANDO_ESQ:
      spriteAndando.desenha(lugarX, lugarY, true);
      break;
    case ANDANDO_DIR:
      spriteAndando.desenha(lugarX, lugarY, false);
      break;
    case MORDENDO:
      //caso mordendo não desenhar cobra pois já está no desenho do Exu.
      break;
    }
  }

  void atualiza() {
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

