# 🏆 Ranking Web - Buzz Line Pro

Este projeto foi desenvolvido **durante o Ôxe Maker 2025**, na modalidade **Buzz Line**, em parceria com a **Secretaria de Educação**.  
O sistema foi criado para registrar o **tempo que os robôs percorreram a pista** e atualizar automaticamente a **posição das equipes** em um ranking dinâmico.

---

## 📌 Funcionalidades

- Ordenação automática do ranking com base no **tempo mais baixo**.  
- Diferenciação entre:
  - Equipes com tempo registrado;
  - Equipes ainda sem tempo.  
- Destaque para os **3 primeiros colocados** com medalhas 🥇🥈🥉.  
- Atualização dinâmica usando apenas **HTML, CSS e JavaScript puro**.  
- Exibição do **top 10** no ranking.

---

## ⚙️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

---

## 📖 Como funciona a lógica

1. O script percorre todas as linhas da tabela de ranking.  
2. Para cada linha:
   - Captura o **nome da equipe**.  
   - Converte o tempo para número (considerando vírgula ou ponto).  
   - Caso não haja tempo, a equipe é marcada como `null`.  
3. As equipes com tempo válido são **ordenadas do menor para o maior tempo**.  
4. As equipes sem tempo são enviadas para o final da tabela.  
5. O ranking é atualizado:
   - Apenas **top 10** são exibidos.  
   - Os **3 primeiros recebem medalhas** e destaque visual.  
   - As demais posições são numeradas normalmente.  

---

## 🚀 Como rodar

1. Clone o repositório:  
   ```bash
   git clone https://github.com/seu-usuario/ranking-buzzline.git

2. Acesse a pasta do projeto:
    ```bash
    cd ranking-buzzline
3. Abra o arquivo index.html no navegador.

4. O ranking será exibido e atualizado automaticamente.
   
---

## 🎨 Exemplo de uso

| Posição | Equipe     | Tempo (s) |
| ------- | ---------- | --------- |
| 🥇      | RoboXtreme | 12.45     |
| 🥈      | FastBot    | 13.10     |
| 🥉      | ThunderBot | 13.67     |
| 4       | Speedy     | 14.22     |

---

## 📚 Contexto do Evento


O Ôxe Maker 2025 é um evento de tecnologia, inovação e educação que reúne estudantes, professores e entusiastas para promover a aprendizagem prática em áreas como robótica, programação e eletrônica.

Na competição de Buzz Line, os robôs devem percorrer uma pista no menor tempo possível, seguindo linhas e obstáculos.
Este ranking foi criado para automatizar a classificação em tempo real, ajudando a organização e dando mais dinamismo ao campeonato.

---

## 🤝 Contribuições

Sugestões de melhorias são bem-vindas!
Sinta-se à vontade para abrir uma issue ou enviar um pull request.

---
