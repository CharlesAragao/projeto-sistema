import React, { useState, useEffect } from "react";

function Formulario({ onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    cpf: "",
    genero: "",
    profissao: "",
    empresa: "",
    experiencia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Busca endereço pelo CEP
  useEffect(() => {
    const cep = form.cep.replace(/\D/g, ""); // remove tudo que não for número
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            setForm((prev) => ({ ...prev, endereco: enderecoFormatado }));
          }
        });
    }
  }, [form.cep]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Nome */}
      <div className="mb-3">
        <label>Nome:</label>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>

      {/* Telefone */}
      <div className="mb-3">
        <label>Telefone:</label>
        <input type="text" name="telefone" value={form.telefone} onChange={handleChange} required />
      </div>

      {/* CPF */}
      <div className="mb-3">
        <label>CPF:</label>
        <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required />
      </div>

      {/* Gênero */}
      <div className="mb-3">
        <label>Gênero:</label>
        <select name="genero" value={form.genero} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
          <option value="Outro">Outro</option>
          <option value="Prefiro não informar">Prefiro não informar</option>
        </select>
      </div>

      {/* CEP */}
      <div className="mb-3">
        <label>CEP:</label>
        <input type="text" name="cep" value={form.cep} onChange={handleChange} required />
      </div>

      {/* Endereço (preenchido automaticamente) */}
      <div className="mb-3">
        <label>Endereço:</label>
        <input type="text" name="endereco" value={form.endereco} onChange={handleChange} required />
      </div>

      {/* Profissão */}
      <div className="mb-3">
        <label>Profissão:</label>
        <input type="text" name="profissao" value={form.profissao} onChange={handleChange} required />
      </div>

      {/* Empresa */}
      <div className="mb-3">
        <label>Empresa:</label>
        <input type="text" name="empresa" value={form.empresa} onChange={handleChange} required />
      </div>

      {/* Experiência */}
      <div className="mb-3">
        <label>Experiência:</label>
        <input type="text" name="experiencia" value={form.experiencia} onChange={handleChange} required />
      </div>

      <button type="submit">Enviar Inscrição</button>
    </form>
  );
}

export default Formulario;