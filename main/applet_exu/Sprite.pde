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

  void desenha (float x, float y, boolean espelhar) {
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

    frameAtual+=0.4;
    if (frameAtual >= numFrames) {
      frameAtual = 0;
    }
  }
}

