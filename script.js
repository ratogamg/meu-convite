/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const CONFIG = {
  data: "2026-09-26T18:00:00",

  servidor: "https://script.google.com/macros/s/AKfycbymcZgC8kR8FkWfkHG4mLeVRFVABk6inLM6kat4Cyybh-IIApbEPLlhC-4pADQp-mLq/exec",

  localTexto: "Salão da festa",

  mapa: "https://www.google.com/maps/place/R.+Ol%C3%A1vo+Nunes+-+Bengu%C3%AD,+Bel%C3%A9m+-+PA,+66630-315/@-1.3745902,-48.4478456,3a,75y,325.12h,75.34t/data=!3m7!1e1!3m5!1s26GFinLSIRu_KT1DkfBqLQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D14.65728841354111%26panoid%3D26GFinLSIRu_KT1DkfBqLQ%26yaw%3D325.1239048978889!7i16384!8i8192!4m15!1m8!3m7!1s0x92a48a7a02dd7b4b:0x34562b65ba80596f!2sR.+Ol%C3%A1vo+Nunes+-+Bengu%C3%AD,+Bel%C3%A9m+-+PA,+66630-315!3b1!8m2!3d-1.3745963!4d-48.4480934!16s%2Fg%2F1ymwbbwjl!3m5!1s0x92a48a7a02dd7b4b:0x34562b65ba80596f!8m2!3d-1.3745963!4d-48.4480934!16s%2Fg%2F1ymwbbwjl?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
};


/* =====================================================
   CONFIGURAÇÕES INICIAIS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const localTexto = document.getElementById("localTexto").innerHTML =
  CONFIG.localTexto + "<br><small>N: 1042</small>";
  const mapa = document.getElementById("mapa");

  if (localTexto) {
    localTexto.textContent = CONFIG.localTexto;
  }

  if (mapa) {
    mapa.href = CONFIG.mapa;
  }

});
/* =====================================================
   ABRIR CONVITE
===================================================== */

function abrirConvite() {

  const convite =
    document.getElementById("convite");

  convite.classList.remove("escondido");

  criarConfetes(120);

  ativarRevelacao();

  document.body.classList.remove("bloqueado");

  convite.scrollIntoView({
    behavior: "smooth"
  });

}


/* =====================================================
   CONTAGEM REGRESSIVA
===================================================== */

function atualizarContagem() {

  const destino =
    new Date(CONFIG.data).getTime();

  const agora =
    new Date().getTime();

  const diferenca =
    destino - agora;


  if (diferenca <= 0) {

    document.getElementById("dias").textContent = "00";
    document.getElementById("horas").textContent = "00";
    document.getElementById("minutos").textContent = "00";
    document.getElementById("segundos").textContent = "00";

    return;
  }


  const dias =
    Math.floor(diferenca / (1000 * 60 * 60 * 24));

  const horas =
    Math.floor(
      (diferenca / (1000 * 60 * 60)) % 24
    );

  const minutos =
    Math.floor(
      (diferenca / (1000 * 60)) % 60
    );

  const segundos =
    Math.floor(
      (diferenca / 1000) % 60
    );


  document.getElementById("dias").textContent =
    String(dias).padStart(2, "0");

  document.getElementById("horas").textContent =
    String(horas).padStart(2, "0");

  document.getElementById("minutos").textContent =
    String(minutos).padStart(2, "0");

  document.getElementById("segundos").textContent =
    String(segundos).padStart(2, "0");
}


setInterval(atualizarContagem, 1000);

atualizarContagem();


/* =====================================================
   CONFETES NORMAIS
===================================================== */

function criarConfetes(quantidade = 100) {

  const area =
    document.getElementById("confetes");

  if (!area) return;


  for (let i = 0; i < quantidade; i++) {

    const confete =
      document.createElement("div");

    confete.className = "confete";


    confete.style.left =
      Math.random() * 100 + "vw";


    confete.style.animationDuration =
      (Math.random() * 2 + 2) + "s";


    confete.style.animationDelay =
      Math.random() * .8 + "s";


    confete.style.transform =
      `rotate(${Math.random() * 360}deg)`;


    const tamanho =
      Math.random() * 8 + 6;

    confete.style.width =
      tamanho + "px";

    confete.style.height =
      tamanho * 1.4 + "px";


    confete.style.background =
      escolherCor();


    area.appendChild(confete);


    setTimeout(() => {

      confete.remove();

    }, 5000);

  }

}


function escolherCor() {

  const cores = [
    "#ff0055",
    "#00e5ff",
    "#ffff00",
    "#00ff88",
    "#ff7b00",
    "#ffffff",
    "#9d00ff"
  ];

  return cores[
    Math.floor(Math.random() * cores.length)
  ];
}


/* =====================================================
   GATO ATIRANDO CONFETE
===================================================== */

function gatoAtiraConfetes() {

  const gato =
    document.getElementById("gatoConfete");

  if (!gato) return;


  /* O gato aparece */

  gato.classList.add("aparece");


  setTimeout(() => {

    gato.classList.add("atirando");


    const caixa =
      gato.getBoundingClientRect();


    /*
      Ponto aproximado de onde
      o canhão/boca do gato está.
    */

    const bocaX =
      caixa.left + caixa.width * 0.73;

    const bocaY =
      caixa.top + caixa.height * 0.42;


    /*
      3 rajadas
    */

    for (let rajada = 0; rajada < 3; rajada++) {

      setTimeout(() => {

        criarConfetesBomba(
          bocaX,
          bocaY,
          55
        );

      }, rajada * 380);

    }

  }, 500);


  /*
    Depois de alguns segundos
    o gato desaparece.
  */

  setTimeout(() => {

    gato.classList.remove("atirando");

    gato.classList.remove("aparece");

  }, 4200);

}


/* =====================================================
   CONFETES SAINDO DO GATO
===================================================== */

function criarConfetesBomba(
  x,
  y,
  quantidade = 40
) {

  for (let i = 0; i < quantidade; i++) {

    const confete =
      document.createElement("div");

    confete.className =
      "confete-bomba";


    confete.style.left =
      x + "px";

    confete.style.top =
      y + "px";


    confete.style.background =
      escolherCor();


    const angulo =
      Math.random() * Math.PI * 2;


    const velocidade =
      Math.random() * 8 + 5;


    const velocidadeX =
      Math.cos(angulo) * velocidade;


    const velocidadeY =
      Math.sin(angulo) * velocidade;


    const tempo =
      Math.random() * 900 + 900;


    document.body.appendChild(confete);


    let inicio = null;


    function animarConfete(tempoAtual) {

      if (!inicio) {
        inicio = tempoAtual;
      }


      const decorrido =
        tempoAtual - inicio;


      const progresso =
        decorrido / tempo;


      if (progresso >= 1) {

        confete.remove();

        return;
      }


      const gravidade =
        progresso * progresso * 300;


      const posX =
        velocidadeX * decorrido / 16;


      const posY =
        velocidadeY * decorrido / 16 +
        gravidade;


      confete.style.transform =
        `translate(${posX}px, ${posY}px)
         rotate(${decorrido / 3}deg)`;


      requestAnimationFrame(
        animarConfete
      );

    }


    requestAnimationFrame(
      animarConfete
    );

  }

}


/* =====================================================
   CONFIRMAR PRESENÇA
===================================================== */

function confirmarPresenca() {

  const input =
    document.getElementById("nomeConvidado");

  const resposta =
    document.getElementById("resposta");

  const botaoConfirmar =
    document.getElementById("botaoConfirmar");

  const botaoNaoVou =
    document.getElementById("botaoNaoVou");

  const mudar =
    document.getElementById("mudarResposta");


  const nome =
    input.value.trim();


  if (!nome) {

    resposta.textContent =
      "Digite seu nome primeiro 😭";

    input.focus();

    return;
  }


  resposta.innerHTML =
    `🎉 <strong>${nome}</strong>, presença confirmada!<br>
     Te espero na festa! 🔥`;


  input.disabled = true;

  botaoConfirmar.classList.add("escondido");

  botaoNaoVou.classList.add("escondido");

  mudar.classList.remove("escondido");


  /*
    Confetes normais
  */

  criarConfetes(200);


  /*
    GATO ATIRANDO CONFETE
  */

  gatoAtiraConfetes();

}


/* =====================================================
   NÃO VOU
===================================================== */

function naoVou() {

  const input =
    document.getElementById("nomeConvidado");

  const resposta =
    document.getElementById("resposta");

  const botaoConfirmar =
    document.getElementById("botaoConfirmar");

  const botaoNaoVou =
    document.getElementById("botaoNaoVou");

  const mudar =
    document.getElementById("mudarResposta");


  resposta.innerHTML =
    `😢 Tudo bem...<br>
     Espero que consiga ir em outra!`;


  input.disabled = true;

  botaoConfirmar.classList.add("escondido");

  botaoNaoVou.classList.add("escondido");

  mudar.classList.remove("escondido");

}


/* =====================================================
   MUDAR RESPOSTA
===================================================== */

function mudarResposta() {

  const input =
    document.getElementById("nomeConvidado");

  const resposta =
    document.getElementById("resposta");

  const botaoConfirmar =
    document.getElementById("botaoConfirmar");

  const botaoNaoVou =
    document.getElementById("botaoNaoVou");

  const mudar =
    document.getElementById("mudarResposta");


  input.disabled = false;

  input.value = "";

  resposta.innerHTML = "";

  botaoConfirmar.classList.remove("escondido");

  botaoNaoVou.classList.remove("escondido");

  mudar.classList.add("escondido");

  input.focus();

}


/* =====================================================
   PLAYLIST
===================================================== */

const musicas = [

  {

    arquivo: "musica1.mp3",

    nome: "Homenagem ao Gw 2",

    video: "video1.mp4"

  },

  {

    arquivo: "musica2.mp3",

    nome: "Arrocha pro Seu Safado",

    video: "video2.mp4"

  },

  {

    arquivo: "musica3.mp3",

    nome: "JUNIOR E NETO - VIVER SEM TI",

    video: "video3.mp4"

  },

  {

    arquivo: "musica4.mp3",

    nome: "Eu Vou Te Pegar",

    video: "video4.mp4"

  }

];

let musicaAtual = -1;


/* =====================================================
   ESCOLHER MÚSICA ALEATÓRIA
===================================================== */

function escolherMusicaAleatoria() {

  let novaMusica;

  do {
    novaMusica =
      Math.floor(
        Math.random() * musicas.length
      );

  } while (
    musicas.length > 1 &&
    novaMusica === musicaAtual
  );

  musicaAtual = novaMusica;

  const musica =
    document.getElementById("musica");

  const nomeMusica =
    document.getElementById("nomeMusica");

  const video =
    document.getElementById("videoFundo");

  musica.src =
    musicas[musicaAtual].arquivo;

  nomeMusica.textContent =
    musicas[musicaAtual].nome;

  if (video) {

    video.classList.remove(
      "video1",
      "video2",
      "video3",
      "video4"
    );

    video.classList.add(
      "video" + (musicaAtual + 1)
    );

    video.src =
      musicas[musicaAtual].video;

    video.load();

    if (!musica.paused) {
      video.play().catch(() => {});
    }

  }

}

/* =====================================================
   TOCAR / PAUSAR
===================================================== */

function alternarMusica() {
  const musica = document.getElementById("musica");
  const botao = document.getElementById("botaoMusica");
  const equalizador = document.getElementById("equalizador");

  if (!musica.src) {
    escolherMusicaAleatoria();
  }

  if (musica.paused) {
    musica.play()
      .then(() => {
        botao.textContent = "😎";
        equalizador.classList.add("tocando");
      });
  } else {
    musica.pause();
    botao.textContent = "✋";
    equalizador.classList.remove("tocando");
  }
}

function trocarMusica() {
  escolherMusicaAleatoria();

  const musica = document.getElementById("musica");
  const botao = document.getElementById("botaoMusica");
  const equalizador = document.getElementById("equalizador");

  musica.play()
    .then(() => {
      botao.textContent = "😎";
      equalizador.classList.add("tocando");
    });
}

/* =====================================================
   EQUALIZADOR
===================================================== */

function criarBarras() {

  const equalizador =
    document.getElementById("equalizador");

  if (!equalizador) return;

  equalizador.innerHTML = "";

  for (let i = 0; i < 24; i++) {

    const barra =
      document.createElement("span");

    /* Altura fixa enquanto estiver parado */
    barra.style.height = "20px";

    /* NENHUMA animação inicial */
    barra.style.animation = "none";

    equalizador.appendChild(barra);
  }
}

/* =====================================================
   CAVALO
===================================================== */

function ativarCavalo() {

  const cavalo =
    document.getElementById("cavalo");

  if (!cavalo) return;


  function nadar() {

    cavalo.classList.remove(
      "nadando"
    );


    void cavalo.offsetWidth;


    cavalo.classList.add(
      "nadando"
    );

  }


  cavalo.addEventListener(
    "click",
    nadar
  );


  cavalo.addEventListener(
    "keydown",
    (evento) => {

      if (
        evento.key === "Enter" ||
        evento.key === " "
      ) {

        nadar();

      }

    }
  );

}


/* =====================================================
   RELÓGIO
===================================================== */

function ativarRelogio() {

  const relogio =
    document.getElementById(
      "emojiRelogio"
    );

  if (!relogio) return;


  relogio.addEventListener(
    "click",
    () => {

      relogio.style.transform =
        "scale(1.4) rotate(360deg)";


      setTimeout(() => {

        relogio.style.transform =
          "";

      }, 500);

    }
  );

}


/* =====================================================
   REVELAÇÃO AO ROLAR
===================================================== */

function ativarRevelacao() {

  const elementos =
    document.querySelectorAll(
      ".revelar"
    );


  const observer =
    new IntersectionObserver(
      (entradas) => {

        entradas.forEach(
          (entrada) => {

            if (
              entrada.isIntersecting
            ) {

              entrada.target.classList.add(
                "visivel"
              );

            }

          }
        );

      },
      {
        threshold: .15
      }
    );


  elementos.forEach(
    (elemento) => {

      observer.observe(
        elemento
      );

    }
  );

}


/* =====================================================
   CARDS INTERATIVOS
===================================================== */

function ativarCardsInterativos() {

  const cards =
    document.querySelectorAll(
      ".card"
    );


  cards.forEach(
    (card) => {

      card.addEventListener(
        "click",
        () => {

          card.classList.add(
            "clicado"
          );


          setTimeout(() => {

            card.classList.remove(
              "clicado"
            );

          }, 800);

        }
      );

    }
  );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  criarBarras();

  ativarCavalo();

  ativarCardsInterativos();

  ativarRelogio();

  ativarRevelacao();

});

function criarBarras() {

  const equalizador =
    document.getElementById("equalizador");

  if (!equalizador) return;

  equalizador.innerHTML = "";

  for (let i = 0; i < 24; i++) {

    const barra =
      document.createElement("span");

    barra.style.height = "20px";

    // Cada barra começa em um ponto diferente da animação
    barra.style.animationDelay =
      `${Math.random() * 0.5}s`;

    equalizador.appendChild(barra);
  }
}

/* =====================================================
   PEGAR ID DO CONVITE
===================================================== */

function pegarIdConvite() {

  const parametros =
    new URLSearchParams(window.location.search);

  return parametros.get("id") || "";

}


/* =====================================================
   ENVIAR RESPOSTA
===================================================== */

let enviandoResposta = false;

async function enviarResposta(respostaEscolhida) {
  if (enviandoResposta) return;

  const input = document.getElementById("nomeConvidado");
  const resposta = document.getElementById("resposta");
  const botaoConfirmar = document.getElementById("botaoConfirmar");
  const botaoNaoVou = document.getElementById("botaoNaoVou");
  const mudar = document.getElementById("mudarResposta");

  const nome = input.value.trim();

  if (!nome) {
    resposta.textContent = "Digite seu nome primeiro 😭";
    input.focus();
    return;
  }

  enviandoResposta = true;

  botaoConfirmar.disabled = true;
  botaoNaoVou.disabled = true;

  resposta.textContent = "⏳ Registrando sua resposta...";

  try {
    await fetch(CONFIG.servidor, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        nome: nome,
        resposta: respostaEscolhida
      })
    });

    input.disabled = true;

    botaoConfirmar.classList.add("escondido");
    botaoNaoVou.classList.add("escondido");
    mudar.classList.remove("escondido");

    if (respostaEscolhida === "VAI") {
      resposta.innerHTML =
        `🎉 <strong>${nome}</strong>, presença confirmada!<br>
        Te espero na festa! 🔥`;

      criarConfetes(200);
      gatoAtiraConfetes();
    } else {
      resposta.innerHTML =
        `😢 Tudo bem, <strong>${nome}</strong>.<br>
        Espero que consiga ir em outra!`;
    }

  } catch (erro) {
    console.error("Erro ao enviar resposta:", erro);

    resposta.innerHTML =
      `❌ Não conseguimos registrar sua resposta.<br>
      Verifique sua internet e tente novamente.`;

    botaoConfirmar.disabled = false;
    botaoNaoVou.disabled = false;
    enviandoResposta = false;
  }
}

function confirmarPresenca() {
  enviarResposta("VAI");
}

function naoVou() {
  enviarResposta("NÃO VOU");
}

function mudarResposta() {
  const input = document.getElementById("nomeConvidado");
  const resposta = document.getElementById("resposta");
  const botaoConfirmar = document.getElementById("botaoConfirmar");
  const botaoNaoVou = document.getElementById("botaoNaoVou");
  const mudar = document.getElementById("mudarResposta");

  input.disabled = false;
  input.value = "";
  resposta.innerHTML = "";

  botaoConfirmar.disabled = false;
  botaoNaoVou.disabled = false;

  botaoConfirmar.classList.remove("escondido");
  botaoNaoVou.classList.remove("escondido");
  mudar.classList.add("escondido");

  enviandoResposta = false;
  input.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("bloqueado");
});
