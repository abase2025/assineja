// Dados padrão do contrato
const dadosPadrao = {
    'locadora': {
        'nome': 'HARRISON RIBEIRO COSTA',
        'nacionalidade': 'Brasileiro',
        'estado_civil': 'casado',
        'rg': '0728279800',
        'orgao_rg': 'SSP/BA',
        'cpf': '942.896.465-49',
        'endereco': 'Rua Humberto Antônio de Santana, n 39, centro',
        'cidade': 'Muritiba',
        'estado': 'Bahia',
        'cep': '44.340-000'
    },
    'locatario': {
        'nome': 'JOEL MAGNO ALVES DOS SANTOS',
        'nacionalidade': 'Brasileiro',
        'estado_civil': 'Casado',
        'profissao': 'funcionário',
        'telefone': '(75) 99181-5612',
        'rg': '15680144-22',
        'orgao_rg': 'SSP/BA',
        'cpf': '061.314.075-33',
        'data_nascimento': '27-07-1993',
        'endereco': 'Av. Alberico de Santana, nº 39ª, 1 andar',
        'cidade': 'Muritiba',
        'estado': 'BA',
        'cep': '44.340-000'
    },
    'imovel': {
        'tipo': 'Apartamento',
        'endereco': 'Av. Alberico de Santana, nº 39ª, 1 andar',
        'cidade': 'Muritiba',
        'estado': 'BA',
        'cep': '44.340-000',
        'quartos': '02',
        'cozinha': '01',
        'sala': '01',
        'banheiros': '02',
        'observacoes': 'Brindex no Banheiro (a instalar) e chuveiro elétrico, com todas as instalações elétricas e hidráulicas em perfeito estado de funcionamento'
    },
    'contrato': {
        'tipo_locacao': 'residencial',
        'finalidade': 'moradia estudantil',
        'prazo_meses': '12',
        'data_inicio': '05/02/2023',
        'data_fim': '05/02/2024',
        'valor_aluguel': '600,00',
        'dia_vencimento': '05',
        'chave_pix': '94289646549',
        'banco_pix': 'NUBANK',
        'valor_fianca': '600,00',
        'local_assinatura': 'Muritiba',
        'data_assinatura': '05 de fevereiro de 2023',
        'forum': 'Cruz das Almas / Bahia',
        'indice_reajuste': 'IPCA ou IGPM'
    }
};

// Variáveis globais
let dadosContrato = {};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    
    // Event listeners
    document.getElementById('contratoForm').addEventListener('submit', salvarDados);
    document.getElementById('preview-tab').addEventListener('click', atualizarPreview);
    
    // Máscaras para campos
    aplicarMascaras();
    
    // Calcular data fim automaticamente
    configurarCalculoDataFim();
});

// Função para aplicar máscaras nos campos
function aplicarMascaras() {
    // Máscara para CPF
    document.querySelectorAll('input[name$=".cpf"]').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    });
    
    // Máscara para telefone
    document.querySelectorAll('input[name$=".telefone"]').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    });
    
    // Máscara para CEP
    document.querySelectorAll('input[name$=".cep"]').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
            e.target.value = value;
        });
    });
    
    // Máscara para valores monetários
    document.querySelectorAll('input[name$=".valor_aluguel"], input[name$=".valor_fianca"]').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value) {
                value = (value / 100).toFixed(2);
                value = value.replace('.', ',');
                value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
            e.target.value = value;
        });
    });
}

// Função para carregar dados do localStorage
function carregarDados() {
    try {
        const dadosSalvos = localStorage.getItem('contratoData');
        if (dadosSalvos) {
            dadosContrato = JSON.parse(dadosSalvos);
        } else {
            dadosContrato = dadosPadrao;
        }
        preencherFormulario(dadosContrato);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        dadosContrato = dadosPadrao;
        preencherFormulario(dadosContrato);
    }
}

// Função para preencher o formulário com os dados
function preencherFormulario(dados) {
    const form = document.getElementById('contratoForm');
    
    // Função recursiva para preencher campos aninhados
    function preencherCampos(obj, prefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                preencherCampos(value, prefix ? `${prefix}.${key}` : key);
            } else {
                const fieldName = prefix ? `${prefix}.${key}` : key;
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    field.value = value || '';
                }
            }
        }
    }
    
    preencherCampos(dados);
}

// Função para salvar dados
function salvarDados(event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(event.target);
        const dados = {};
        
        // Converter FormData para objeto aninhado
        for (const [key, value] of formData.entries()) {
            const keys = key.split('.');
            let current = dados;
            
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }
            
            current[keys[keys.length - 1]] = value;
        }
        
        dadosContrato = dados;
        localStorage.setItem('contratoData', JSON.stringify(dados));
        mostrarAlerta('Dados salvos com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        mostrarAlerta('Erro ao salvar dados', 'danger');
    }
}

// Função para atualizar preview do contrato
function atualizarPreview() {
    try {
        const preview = document.getElementById('contratoPreview');
        const textoContrato = gerarTextoContrato();
        const textoFormatado = formatarTextoContrato(textoContrato);
        preview.innerHTML = textoFormatado;
    } catch (error) {
        console.error('Erro ao gerar preview:', error);
        document.getElementById('contratoPreview').innerHTML = 
            '<div class="text-center text-danger"><i class="fas fa-exclamation-triangle fa-3x mb-3"></i><p>Erro ao carregar preview do contrato</p></div>';
    }
}

// Função para gerar o texto do contrato
function gerarTextoContrato() {
    const data = dadosContrato;
    
    return `CONTRATO DE LOCAÇÃO DE IMÓVEL RESIDENCIAL

LOCADORA: ${data.locadora.nome}, ${data.locadora.nacionalidade}, ${data.locadora.estado_civil}, Maior, portadora da cédula de identidade RG. nº ${data.locadora.rg} – ${data.locadora.orgao_rg} e CPF: nº ${data.locadora.cpf}, residente e domiciliada à ${data.locadora.endereco} – ${data.locadora.cidade} – ${data.locadora.estado}. CEP: ${data.locadora.cep}.

LOCATÁRIA: ${data.locatario.nome}, ${data.locatario.nacionalidade}, ${data.locatario.estado_civil}, ${data.locatario.profissao}, tel. ${data.locatario.telefone}. Portadora da cédula de identidade RG nº ${data.locatario.rg} ${data.locatario.orgao_rg}. e CPF nº ${data.locatario.cpf}, nascida em ${data.locatario.data_nascimento}, Residente e domiciliado na ${data.locatario.endereco} – ${data.locatario.cidade} – ${data.locatario.estado}. CEP. ${data.locatario.cep}.

I - OBJETIVO

CLÁUSULA PRIMEIRA: O objeto deste contrato é a locação de um imóvel ${data.contrato.tipo_locacao}, sendo um ${data.imovel.tipo}, ${data.imovel.endereco} – ${data.imovel.cidade} – ${data.imovel.estado}. CEP. ${data.imovel.cep}, contendo ${data.imovel.quartos} quartos, ${data.imovel.cozinha} cozinha com área de serviço, ${data.imovel.sala} sala, ${data.imovel.banheiros} banheiro social, ${data.imovel.observacoes}.

II - DESTINAÇÃO

CLÁUSULA SEGUNDA: A LOCATÁRIA utilizará o imóvel exclusivamente para fins de ${data.contrato.finalidade} e de seus familiares, destino que não poderá ser alterado sem o prévio consentimento por escrito da LOCADORA, sendo vetada qualquer cessão, transferência ou sublocação ainda quando parcial e temporária gratuita ou onerosa.

CLÁUSULA TERCEIRA: Será equiparada a violação da Cláusula anterior, qualquer situação de fato pela qual a LOCATARIA deixe de ocupar direto e integralmente o Imóvel locado, em seu nome e conta própria, e o não cumprimento do Regimento Interno do Condomínio.

III - PRAZO

CLÁUSULA QUARTA: A locação será pelo prazo determinado de ${data.contrato.prazo_meses} meses, contando-se esse período de ${data.contrato.data_inicio} a terminar no dia ${data.contrato.data_fim}, data em que a LOCATARIO obriga-se a restituir o imóvel completamente desocupado, em perfeito estado de conservação, pintado com tinta lavável, portas e janelas funcionando perfeitamente, vaso sanitário, lavanderia e pia em perfeito funcionamento, tudo em conformidade com a Lei nº 8.245 (Lei do Inquilinato) e Medida Provisória nº 482 de 30/03/94. Caso não haja interesse de renovação do contrato de locação entre as partes.

CLÁUSULA QUINTA: Se a LOCATARIA devolver o imóvel antes de transcorrido o prazo estabelecido na Cláusula anterior, ou rescisão ocorrer por inadimplemento de obrigação aqui ajustada, pagará a LOCADORA uma multa contratual correspondente a 01 (um) mês de aluguel, sem prejuízo do integral cumprimento das demais sanções legais e contratuais (Código Civil) art. 1193 – Parágrafo Único.

CLÁUSULA SEXTA: Findo o prazo de locação estipulado na Cláusula quarta, se não ocorrer à hipótese de rescisão ou a da renuncia, o que neste último caso devera ocorrer mediante aviso por escrito de qualquer dos contratantes ao outro até 30 (trinta) dias antes de se vencer cada período contratual, prorrogar-se-á a locação, consoante a assinatura de um novo contrato, com garantia consoante deste contrato.

IV – PREÇO

CLÁUSULA SÉTIMA: O aluguel mensal será de R$ ${data.contrato.valor_aluguel} e sofrera reajuste anual pelo índice do ${data.contrato.indice_reajuste}, considerando o índice menor, caso haja interesse entre as partes e seja prorrogado o Contrato de Locação, no período cumulativamente ou outro índice oficial determinado pelo governo que venha a substitui-lo, caso haja renovação do contrato, dai por diante, caso ocorra à hipótese prevista na Cláusula sexta, ficara sujeito a reajustamento periódicos estabelecidos na legislação pertinente que estiver em vigor.

Parágrafo Único: O aluguel deverá ser pago a LOCADORA todo dia ${data.contrato.dia_vencimento} de cada mês, em nome de ${data.locadora.nome}, CHAVE PIX CELULAR: ${data.contrato.chave_pix}. ${data.contrato.banco_pix}

CLÁUSULA OITAVA: O aluguel deverá ser pago pontualmente ate o dia ${data.contrato.dia_vencimento} de cada mês de locação ajustada na Clausula quarta deste instrumento, independente de cobrança ou onde a LOCADORA determinar, estendendo-se este prazo para o primeiro dia útil seguinte, caso coincida com sábado, domingo ou feriado. Ultrapassando o dia acima estipulado o aluguel será acrescido de multa de 2% ao mês a partir do primeiro dia útil do vencimento e mais 0,3% de juros de mora ao dia.

Parágrafo Único: O primeiro mês de aluguel vencerá no dia ${data.contrato.dia_vencimento}/${data.contrato.data_inicio.split('/')[1]}/${data.contrato.data_inicio.split('/')[2]} e o último mês vencerá no dia ${data.contrato.data_fim}. A fiança no valor de R$ ${data.contrato.valor_fianca} deverá ser paga no dia ${data.contrato.data_inicio} e é referente ao último mês do aluguel.

E, pôr assim estarem justos e acordados, assina o presente Contrato em duas vias impressas de igual teor, na presença de duas testemunhas abaixo assinadas para que se produzam os efeitos de lei.

${data.contrato.local_assinatura}, ${data.contrato.data_assinatura}.

___________________________________________________________
${data.locadora.nome} – CPF: ${data.locadora.cpf}
LOCADORA

___________________________________________________________
${data.locatario.nome} – CPF ${data.locatario.cpf}
LOCATÁRIO`;
}

// Função para formatar o texto do contrato
function formatarTextoContrato(texto) {
    const linhas = texto.split('\n');
    let html = '';
    
    for (const linha of linhas) {
        const linhaTrimmed = linha.trim();
        
        if (!linhaTrimmed) {
            html += '<br>';
            continue;
        }
        
        // Título principal
        if (linhaTrimmed.includes('CONTRATO DE LOCAÇÃO')) {
            html += `<h2 class="text-center fw-bold mb-4">${linhaTrimmed}</h2>`;
        }
        // Seções (I -, II -, etc.)
        else if (linhaTrimmed.match(/^[IVX]+ -/)) {
            html += `<h4 class="fw-bold mt-4 mb-3 text-primary">${linhaTrimmed}</h4>`;
        }
        // Cláusulas
        else if (linhaTrimmed.includes('CLÁUSULA')) {
            html += `<div class="clausula"><p class="fw-bold mb-2">${linhaTrimmed}</p></div>`;
        }
        // Parágrafos únicos
        else if (linhaTrimmed.includes('Parágrafo Único')) {
            html += `<p class="fw-bold mb-2">${linhaTrimmed}</p>`;
        }
        // Assinaturas
        else if (linhaTrimmed.includes('___________')) {
            html += `<div class="text-center mt-4"><p>${linhaTrimmed}</p></div>`;
        }
        // Nomes das partes (LOCADORA/LOCATÁRIO)
        else if (linhaTrimmed.includes('LOCADORA:') || linhaTrimmed.includes('LOCATÁRIA:')) {
            html += `<p class="mb-3"><strong>${linhaTrimmed}</strong></p>`;
        }
        // Local e data
        else if (linhaTrimmed.match(/^[A-Za-z]+,\s+\d+/)) {
            html += `<div class="text-end mt-4 mb-4"><p>${linhaTrimmed}</p></div>`;
        }
        // Texto normal
        else {
            html += `<p class="mb-2">${linhaTrimmed}</p>`;
        }
    }
    
    return html;
}

// Função para exportar PDF usando jsPDF
function exportarPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações
        doc.setFont('helvetica');
        doc.setFontSize(12);
        
        const textoContrato = gerarTextoContrato();
        const linhas = doc.splitTextToSize(textoContrato, 180);
        
        let y = 20;
        const pageHeight = doc.internal.pageSize.height;
        
        // Adicionar título
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('CONTRATO DE LOCAÇÃO DE IMÓVEL RESIDENCIAL', 105, y, { align: 'center' });
        
        y += 20;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        // Adicionar conteúdo
        for (let i = 0; i < linhas.length; i++) {
            if (y > pageHeight - 20) {
                doc.addPage();
                y = 20;
            }
            
            const linha = linhas[i];
            
            // Verificar se é uma cláusula ou seção para deixar em negrito
            if (linha.includes('CLÁUSULA') || linha.match(/^[IVX]+ -/) || linha.includes('Parágrafo Único')) {
                doc.setFont('helvetica', 'bold');
            } else {
                doc.setFont('helvetica', 'normal');
            }
            
            doc.text(linha, 15, y);
            y += 6;
        }
        
        // Salvar o PDF
        doc.save('contrato_locacao.pdf');
        mostrarAlerta('PDF gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        mostrarAlerta('Erro ao gerar PDF. Verifique se todos os dados estão preenchidos.', 'danger');
    }
}

// Função para exportar Word (simulação com download de texto)
function exportarWord() {
    try {
        const textoContrato = gerarTextoContrato();
        
        // Criar conteúdo HTML para Word
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Contrato de Locação</title>
                <style>
                    body { font-family: 'Times New Roman', serif; line-height: 1.6; margin: 2cm; }
                    h1 { text-align: center; font-weight: bold; }
                    p { text-align: justify; margin-bottom: 10px; }
                    .clausula { font-weight: bold; }
                </style>
            </head>
            <body>
                ${formatarTextoContrato(textoContrato)}
            </body>
            </html>
        `;
        
        // Criar blob e download
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contrato_locacao.doc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarAlerta('Arquivo Word gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar Word:', error);
        mostrarAlerta('Erro ao gerar arquivo Word', 'danger');
    }
}

// Função para imprimir
function imprimir() {
    const preview = document.getElementById('contratoPreview');
    const conteudo = preview.innerHTML;
    
    if (!conteudo || conteudo.includes('Preencha os dados')) {
        mostrarAlerta('Primeiro atualize a visualização do contrato', 'warning');
        return;
    }
    
    const janela = window.open('', '_blank');
    janela.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Contrato de Locação</title>
            <style>
                body {
                    font-family: 'Times New Roman', serif;
                    line-height: 1.6;
                    margin: 2cm;
                    font-size: 12pt;
                }
                h2 {
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: 30px;
                }
                h4 {
                    font-weight: bold;
                    margin-top: 20px;
                    margin-bottom: 15px;
                }
                p {
                    text-align: justify;
                    margin-bottom: 10px;
                }
                .clausula {
                    margin-bottom: 15px;
                }
                .text-center {
                    text-align: center;
                }
                .text-end {
                    text-align: right;
                }
                .fw-bold {
                    font-weight: bold;
                }
                @media print {
                    body {
                        margin: 1cm;
                    }
                }
            </style>
        </head>
        <body>
            ${conteudo}
        </body>
        </html>
    `);
    janela.document.close();
    janela.print();
}

// Função para mostrar alertas
function mostrarAlerta(mensagem, tipo) {
    // Remover alertas existentes
    const alertasExistentes = document.querySelectorAll('.alert-custom');
    alertasExistentes.forEach(alerta => alerta.remove());
    
    // Criar novo alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show alert-custom`;
    alerta.style.position = 'fixed';
    alerta.style.top = '20px';
    alerta.style.right = '20px';
    alerta.style.zIndex = '9999';
    alerta.style.minWidth = '300px';
    
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alerta);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.remove();
        }
    }, 5000);
}

// Função para configurar cálculo automático da data fim
function configurarCalculoDataFim() {
    const dataInicioInput = document.querySelector('input[name="contrato.data_inicio"]');
    const prazoInput = document.querySelector('input[name="contrato.prazo_meses"]');
    const dataFimInput = document.querySelector('input[name="contrato.data_fim"]');
    
    function calcularDataFim() {
        const dataInicio = dataInicioInput.value;
        const prazo = parseInt(prazoInput.value);
        
        if (dataInicio && prazo) {
            const [dia, mes, ano] = dataInicio.split('/');
            const data = new Date(ano, mes - 1, dia);
            data.setMonth(data.getMonth() + prazo);
            
            const novoAno = data.getFullYear();
            const novoMes = String(data.getMonth() + 1).padStart(2, '0');
            const novoDia = String(data.getDate()).padStart(2, '0');
            
            dataFimInput.value = `${novoDia}/${novoMes}/${novoAno}`;
        }
    }
    
    if (dataInicioInput && prazoInput && dataFimInput) {
        dataInicioInput.addEventListener('blur', calcularDataFim);
        prazoInput.addEventListener('blur', calcularDataFim);
    }
}

