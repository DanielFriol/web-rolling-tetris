# web-rolling-tetris

## Usar a extensão prettier no vscode


## Tutorial de como usar o git no VS Code
https://www.youtube.com/watch?v=QJWP4z3FHhM&ab_channel=JoaoRonaldoCunha

# O que precisa fazer

1. Arrumar a peça 1 (vermelha)
2. Trocar física de verificação peça caindo e mexendo, quando a peça girar tem que recalcular os valores de x e y de `CurrentPiece`, sugiro fazer isso idividual de cada peça, pois cada peça possui um tipo de verificação diferente (ex: a peça 1 quando virada tem 2 pontos extremos embaixo e precisa verificar pelos dois), você pode também enviar a `piece` para `verifyBoundries` e fazer essa verificação de maneira dinamica usando algo tipo um for que percorre todos elementos da linha `piece[length-1]` (acho que essa é a ultima linha da peça) e caso seja 1 ele faz a verificaçao na casa de baixo (tipo o que esta feito no movimento "down")
3. Fazer a peça fixar no canvas com sua cor (sugiro testar isso tirando a limpeza da `matrix` quando dá stop) (outra sugestão é a seguinte verificaçao no `verifyBoundries`: `CurrentPiece.y + CurrentPiece.piece.length > height - 1 && matrix[y][x] == 0`) (sugestão de gravar no `matrix` um numero diferente pra cada cor)
4. Game Over se a peça no topo do canvas nao conseguir se mover
5. Girar o rolê quando vir a peça especial
6. Arrumar pontuação do tabuleiro 22x44
7. Fixar canvas para não haver rolagem de página

Isso é tudo eu acho.
