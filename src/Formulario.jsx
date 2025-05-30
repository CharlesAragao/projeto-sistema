import React, { useState, useEffect } from "react";
import axios from "axios";

function Formulario({ onSubmit, dadosIniciais }) {
  const [form, setForm] = useState(
    dadosIniciais || {
    nome: "",
    email: "",
    telefone: "",
    pais: "",
    estado: "",
    municipio: "",
    cpf: "",
    genero: "",
    profissao: "",
    empresa: "",
    experiencia: "",
  });

  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);


  useEffect(() => {
    if (dadosIniciais) {
      setForm(dadosIniciais);
    }

  }, [dadosIniciais]);

  // Busca Países
  useEffect(() => {
  axios.get("https://restcountries.com/v3.1/all")
    .then((res) => {
      const nomesPaises = res.data
        .map((pais) => pais.name.common)
        .sort();
      setPaises(nomesPaises);
    })
    .catch((err) => console.error("Erro ao buscar países:", err));
}, []);

  // Busca Estados
  useEffect(() => {
    axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => {
        const estadosOrdenados = res.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(estadosOrdenados);
      })
      .catch((err) => console.error("Erro ao buscar estados:", err));
  }, []);

  // Busca Munícipios
  useEffect(() => {
    if (form.estado) {
      const estadoSelecionado = estados.find(estado => estado.sigla === form.estado);
      if (estadoSelecionado) {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado.id}/municipios`)
          .then((res) => {
            const municipiosOrdenados = res.data.sort((a, b) => a.nome.localeCompare(b.nome));
            setMunicipios(municipiosOrdenados);
          })
          .catch((err) => console.error("Erro ao buscar municípios:", err));
        }
      }
    }, [form.estado, estados]);
    

    // Máscara de CPF
    const formatarCPF = (valor) => {
      const numeros = valor.replace(/\D/g, "").slice(0, 11);
      return numeros
      .replace(/\D/g, "")                           // Remove o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2')            // Coloca ponto após os 3 primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2')           // Coloca ponto após os 6 primeiros dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')     // Coloca traço antes dos 2 últimos digitos 
  };

  // Máscara de Telefone (formato celular em DDD)

  const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, '')                        // Remove não dígitos
      .replace(/(\d{2})(\d)/, '($1) $2')         // Coloca parênteses no DDD
      .replace(/(\d{5})(\d)/, '$1-$2')           // Adiciona traço após os 5 primeiros dígitos do número
      .substring(0, 15)                          // Limita o comprimento
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;

    if (name === "cpf") {
      novoValor = formatarCPF(value);
    }

    if (name === "telefone") {
      novoValor = formatarTelefone(value);
    }

    // if (name == "cep") {
    //   novoValor = formatarCEP(value);
    // }

    setForm((prev) => ({ ...prev, [name]: novoValor}));
  };

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

      {/* País */}
       <div className="mb-3">
        <label>País:</label>
        <select name="pais" value={form.pais} onChange={handleChange} required>
          <option value="">Selecione</option>
          {paises.map((pais) => (
            <option key={pais} value={pais}>{pais}</option>
          ))}
        </select>
      </div>

      {/* Estado */}
      <div className="mb-3">
        <label>Estado:</label>
        <select name="estado" value={form.estado} onChange={handleChange} required>
          <option value="">Selecione</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
          ))}
        </select>
      </div>

      {/* Munícipio */}
      <div className="mb-3">
        <label>Município:</label>
        <select name="cidade" value={form.cidade} onChange={handleChange} required>
          <option value="">Selecione</option>
          {municipios.map((municipio) => (
            <option key={municipio.id} value={municipio.nome}>{municipio.nome}</option>
          ))}
        </select>
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
          <option value="Prefiro não informar">Prefiro não informar</option>
        </select>
      </div>

      {/* CEP
      <div className="mb-3">
        <label>CEP:</label>
        <input type="text" name="cep" value={form.cep} onChange={handleChange} required />
      </div> */}

      {/* Endereço (preenchido automaticamente) */}
      {/* <div className="mb-3">
        <label>Logradouro:</label>
        <input type="text" name="logradouro." value={form.logradouro} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Nº:</label>
        <input type="number" name="número." value={form.numeronpm } onChange={handleChange} required />
      </div>
      
      <div className="mb-3">
        <label>Bairro:</label>
        <input type="text" name="bairro." value={form.bairro} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Cidade:</label>
        <input type="text" name="cidade." value={form.cidade} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Estado:</label>
        <input type="text" name="estado." value={form.estado} onChange={handleChange} required />
      </div> */}

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
        <select name="experiencia" value={form.experiencia} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="jr">1 a 3 anos</option>
          <option value="senior">4 a 6 anos</option>
          <option value="pleno">+ 10 anos</option>
        </select>
      </div>

      <button type="submit">Enviar Inscrição</button>
    </form>
  );
}

export default Formulario;