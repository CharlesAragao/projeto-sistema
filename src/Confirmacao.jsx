import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Confirmacao({ dados }) {
  const pdfRef = useRef();

  const gerarPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF(); 

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`inscricao-${dados.numero}.pdf`);
    });
  };

  return (
    <div>
      <div ref={pdfRef}>
        <h2 className="text-success">Inscrição realizada com sucesso!</h2>
        <p className="mt-3">Número da inscrição: <strong>{dados.numero}</strong></p>
        <ul className="list-group">
         {Object.entries(dados).map(([chave, valor]) => (
           chave !== "numero" && (
            <li className="list-group-item" key={chave}>
              <strong>{chave}:</strong> {valor}
            </li>
           )
         ))}
       </ul>
      </div>

      <button className="btn btn-primary mt-4" onClick={gerarPDF}>
        Baixar Inscrição em PDF
      </button>

    </div>
  );
}

export default Confirmacao;