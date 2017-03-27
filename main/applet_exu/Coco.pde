class Coco {
  float TEMPO_PARADO = 2100;
  float VEL_X_60 = 10;
  float FATOR_GRAV = 0.75;
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

  void desenha() {
    switch (estado) {
    case ATIRADO:
      spriteAtirado.desenha(lugarX, lugarY, false);
      break;
    case NO_CHAO:
      spriteNoChao.desenha(lugarX, lugarY, false);
      break;
    }
  }

  void atualiza() {
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

