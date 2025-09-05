document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
      
    Swal.fire({
      title: "Tem certeza que deseja adicionar o aluno?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        form.submit();
      }
    });
  });
});

document.querySelectorAll(".botao_remover").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault(); 

    const result = await Swal.fire({
      title: "Tem certeza que deseja remover o aluno?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    });

    if(result.isConfirmed) {
      const codigo = `${Math.floor(btn.dataset.codigo)}`;
      const idEscola = btn.dataset.id;

      try {
        const res = await fetch(`/escolas/${idEscola}/alunos/${codigo}/delete`, { method: "DELETE" });

        if(res.ok){
          Swal.fire("Aluno removido!", "", "success");
          const tr = btn.closest("tr");
          tr.remove();  
        } 
            
        else Swal.fire("Erro ao remover aluno", "", "error");
      } 
          
      catch(err){
        console.error(err);
        Swal.fire("Erro de conexão", "", "error");
      }
    }
  });
});

document.querySelectorAll(".botao_editar").forEach(btn => {
  btn.addEventListener("click", async e => {
    e.preventDefault();

    const id = btn.dataset.id;
    const nome = btn.dataset.nome;

    const linha = btn.closest("tr");
    const input = linha.querySelector("input[type='text']");
    const novoNome = input.value;

    let title = novoNome == nome ? "Modifique o nome do aluno para editar." : 
                                  `Tem certeza que deseja alterar o nome de '${nome}' para '${novoNome}'?`;

    const result = await Swal.fire({
      title: title,
      showCancelButton: novoNome != nome,
      confirmButtonText: novoNome != nome ? "Sim" : "Ok",
      cancelButtonText: "Não",
    });

    if(result.isConfirmed && novoNome != nome){
      try{
        const res = await fetch(`/escolas/alunos/${id}/edit`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            novo_nome: novoNome
          })
        });

        console.log(res.status, res.statusText);

        if(res.ok) Swal.fire(`Nome alterado de ${nome} para ${novoNome}`, "", "success");
        else Swal.fire("Erro ao modificar o nome.", "", "error");
      }

      catch(err){
        console.error(err);
        Swal.fire("Erro de conexão", "", "error");
      }
    }
  }); 
});