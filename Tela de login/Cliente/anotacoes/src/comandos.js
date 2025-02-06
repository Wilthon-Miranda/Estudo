import { useState, useEffect } from "react";

export const useAnotacoes = () => {
  const [novaAnotacao, setNovaAnotacao] = useState({ titulo: "", texto: "" });
  const [tituloAnotacoes, setTituloAnotacoes] = useState({});
  const [textoAnotacoes, setTextoAnotacoes] = useState({});
  const [anotacoes, setAnotacoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/anotacoes")
      .then((response) => response.json())
      .then((data) => setAnotacoes(data))
      .catch((error) => console.error("Erro ao buscar anotações:", error));
  }, []);

  const ajustarAlturaDinamica = (id, tipo) => {
    setTimeout(() => {
      const textarea = document.querySelector(`#${tipo}-${id}`);
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }, 0);
  };

  const handleNovaAnotacaoChange = (campo, valor) => {
    setNovaAnotacao((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleTituloChange = (id, value) => {
    setTituloAnotacoes((prev) => ({ ...prev, [id]: value }));
    ajustarAlturaDinamica(id, "titulo");
  };

  const handleChange = (id, value) => {
    setTextoAnotacoes((prev) => ({ ...prev, [id]: value }));
    ajustarAlturaDinamica(id, "texto");
  };

  const salvarNovaAnotacao = async (tituloAnotacao, textoAnotacao) => {
    let id_usuario = "3d927e4f-6932-495c-a5ac-5fff700dc9ca";
    console.log("Atualizando anotação:", { id_usuario, tituloAnotacao, textoAnotacao });
    try {
      const response = await fetch("http://localhost:3000/anotacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: id_usuario,
          titulo: novaAnotacao.titulo,
          texto: novaAnotacao.texto,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar anotação.");
      const anotacaoCriada = await response.json();
      setAnotacoes((prev) => [anotacaoCriada, ...prev]);
      setNovaAnotacao({ titulo: "", texto: "" });
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
    }
  };

  const salvar = async (id_anotacao, tituloAnotacao, textoAnotacao) => {
    console.log("Atualizando anotação:", { id_anotacao, tituloAnotacao, textoAnotacao });
    try {
      const response = await fetch(`http://localhost:3000/anotacoes/${id_anotacao}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            titulo: tituloAnotacao, 
            texto: textoAnotacao 
        }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar anotação.");
      window.alert(`Anotação ${id_anotacao} atualizada com sucesso!`);
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
    }
  };

  return {
    novaAnotacao,
    anotacoes,
    tituloAnotacoes,
    textoAnotacoes,
    handleNovaAnotacaoChange,
    handleTituloChange,
    handleChange,
    salvarNovaAnotacao,
    salvar,
  };
};