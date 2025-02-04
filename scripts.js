const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.nome });
    };

    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivos = evento.target.files[0];

  if (arquivos) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivos);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error(erro);
      alert("Ocorreu um erro ao carregar a imagem.");
    }
  }
});

const inputTags = document.getElementById("input-tag");
const listaTags = document.getElementById("lista-tag");

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagQueQueremosRemover = evento.target.parentElement;
    listaTags.removeChild(tagQueQueremosRemover);
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Back-end",
  "Mobile",
  "Design",
  "programação",
  "javascript",
  "html",
  "css",
  "react",
  "node",
  "vue",
  "angular",
  "c",
  "c++",
  "python",
  "php",
  "java",
  "c#",
];

async function verificarTags(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificarTags(tagTexto);
        if (tagExiste) {
          const novatag = document.createElement("li");
          novatag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag" />`;
          listaTags.appendChild(novatag);
          inputTags.value = "";
        } else {
          alert("Tag não encontrada.");
        }
      } catch (erro) {
        console.error(erro);
        alert("Ocorreu um erro ao verificar a tag.");
        inputTags.value = "";
      }
    }
  }
});

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;
      if (deuCerto) {
        resolve("Projeto publicado com sucesso!");
      } else {
        reject("Ocorreu um erro ao publicar o projeto.");
      }
    }, 2000);
  });
}

botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();
  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao");
  const tagsProjeto = Array.from(document.querySelectorAll("p")).map(
    (tag) => tag.textContent
  );

  try {
    const resultado = await publicarProjeto(
      nomeDoProjeto,
      descricaoDoProjeto,
      tagsProjeto
    );
    console.log(resultado);
    alert("Projeto publicado com sucesso!");
  } catch (erro) {
    console.error(erro);
    alert("Ocorreu um erro ao publicar o projeto.");
  }
});

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", () => {
  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao");
  const tagsProjeto = Array.from(document.querySelectorAll("p")).map(
    (tag) => tag.textContent
  );

  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("input-tag").value = "";
  document.getElementById("lista-tag").innerHTML = "";
  
});
