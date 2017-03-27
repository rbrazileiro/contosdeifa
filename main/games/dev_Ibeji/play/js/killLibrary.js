function checkIfHit(bullet, target) {
	if(bullet.drawX >= target.drawX - (bullet.width - 5) &&
		bullet.drawX <= target.drawX + target.width &&
		bullet.drawY >= target.drawY &&
		bullet.drawY <= target.drawY + target.height) {
		return true;
	} else return false;
}