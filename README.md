# web-rolling-tetris

## Usar a extensão prettier no vscode

## Por favor descrever as mudanças feitas na mensagem de commit

## Tutorial de como usar o git no VS Code
https://www.youtube.com/watch?v=QJWP4z3FHhM&ab_channel=JoaoRonaldoCunha

# O que precisa fazer

1. Girar peça (tomar cuidado com as laterais do canvas)
2. ~~Trocar física de verificação peça caindo e mexendo, quando a peça girar tem que recalcular os valores de x e y de `CurrentPiece`, sugiro fazer isso idividual de cada peça, pois cada peça possui um tipo de verificação diferente (ex: a peça 1 quando virada tem 2 pontos extremos embaixo e precisa verificar pelos dois), você pode também enviar a `piece` para `verifyBoundries` e fazer essa verificação de maneira dinamica usando algo tipo um for que percorre todos elementos da linha `piece[length-1]` (acho que essa é a ultima linha da peça) e caso seja 1 ele faz a verificaçao na casa de baixo (tipo o que esta feito no movimento "down")~~
3. ~~Fazer a peça fixar no canvas com sua cor (sugiro testar isso tirando a limpeza da `matrix` quando dá stop) (outra sugestão é a seguinte verificaçao no `verifyBoundries`: `CurrentPiece.y + CurrentPiece.piece.length > height - 1 && matrix[y][x] == 0`) (sugestão de gravar no `matrix` um numero diferente pra cada cor)~~
4. ~~Enviar mais peças e não mexer a peça anterior~~
5. ~~Game Over se a peça no topo do canvas nao conseguir se mover~~
6. Girar o rolê quando vir a peça especial
7. ~~Arrumar a peça 1 (vermelha)~~
8. Adaptar a rotação, pontuação e linhas eliminadas, de acordo com a rotação
9. Arrumar pontuação do tabuleiro 22x44
10. Fixar canvas para não haver rolagem de página



Isso é tudo eu acho.
