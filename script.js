/* =========================================================
   Advocacia Silveira & Souza — script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const aberto = mainNav.classList.toggle("aberto");
      navToggle.classList.toggle("aberto", aberto);
      navToggle.setAttribute("aria-expanded", String(aberto));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("aberto");
        navToggle.classList.remove("aberto");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Ano dinâmico no rodapé ---------- */
  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  /* ---------- Botão voltar ao topo ---------- */
  const btnTopo = document.getElementById("btnTopo");
  if (btnTopo) {
    window.addEventListener("scroll", () => {
      btnTopo.classList.toggle("visivel", window.scrollY > 400);
    });

    btnTopo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Animação de revelação ao rolar ---------- */
  const elementosRevelaveis = document.querySelectorAll(
    ".servico-card, .destaque-card, .diferencial-item, .sobre-texto, .contato-info, .contato-form"
  );

  elementosRevelaveis.forEach((el) => el.classList.add("reveal"));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("ativo");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementosRevelaveis.forEach((el) => observador.observe(el));

  /* ---------- Validação simples do formulário de contato ---------- */
  const contatoForm = document.getElementById("contatoForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contatoForm && formFeedback) {
    contatoForm.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nome = contatoForm.querySelector("#nome");
      const telefone = contatoForm.querySelector("#telefone");
      const mensagem = contatoForm.querySelector("#mensagem");

      const campos = [nome, telefone, mensagem];
      let valido = true;

      campos.forEach((campo) => {
        const wrapper = campo.closest(".form-field");
        if (!campo.value.trim()) {
          wrapper.classList.add("error");
          valido = false;
        } else {
          wrapper.classList.remove("error");
        }
      });

      if (!valido) {
        formFeedback.textContent = "Por favor, preencha todos os campos antes de enviar.";
        formFeedback.className = "form-feedback erro";
        return;
      }

      formFeedback.textContent =
        "Mensagem recebida! Nossa equipe entrará em contato em breve.";
      formFeedback.className = "form-feedback sucesso";
      contatoForm.reset();
    });
  }
});
