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
6. G̶i̶r̶a̶r̶ ̶o̶ ̶r̶o̶l̶ê̶ ̶q̶u̶a̶n̶d̶o̶ ̶v̶i̶r̶ ̶a̶ ̶p̶e̶ç̶a̶ ̶e̶s̶p̶e̶c̶i̶a̶l̶
7. ~~Arrumar a peça 1 (vermelha)~~
8. A̶d̶a̶p̶t̶a̶r̶ ̶a̶ ̶r̶o̶t̶a̶ç̶ã̶o̶,̶ ̶p̶o̶n̶t̶u̶a̶ç̶ã̶o̶ ̶e̶ ̶l̶i̶n̶h̶a̶s̶ ̶e̶l̶i̶m̶i̶n̶a̶d̶a̶s̶,̶ ̶d̶e̶ ̶a̶c̶o̶r̶d̶o̶ ̶c̶o̶m̶ ̶a̶ ̶r̶o̶t̶a̶ç̶ã̶o̶
9. Arrumar pontuação do tabuleiro 22x44
10. Fixar canvas para não haver rolagem de página



Isso é tudo eu acho.
