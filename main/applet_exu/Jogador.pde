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

  void desenha() {
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

  void atualiza() {

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

  void machucou(boolean cobra) {
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

