document.querySelectorAll(".btn_add_alunos").forEach(btn => {
  if(btn.id == "alfa"){
    btn.addEventListener("click", () => {
      console.log("ALFA");
    });
  }

  else{
    btn.addEventListener("click", () => {
      console.log("BETA");
    }); 
  }
});