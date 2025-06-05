// Variáveis globais
let tipoContratoAtual = null;
let dadosContrato = {};

// Dados padrão para contratos de imóvel
const dadosPadraoImovel = {
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

// Dados padrão para contratos de veículo
const dadosPadraoVeiculo = {
    'locador': {
        'nome': 'FLAVIO DE ARAUJO MARQUES',
        'nacionalidade': 'brasileiro',
        'cnh': '123456789',
        'cpf': '123.456.789-00',
        'endereco': 'Rua Vereador Jone Kiss, 581, Cond. Vida Bela 1, Bl. 9, Apt. 101 Itinga',
        'cidade': 'Lauro de Freitas',
        'estado': 'BA',
        'cep': '42739-160'
    },
    'locatario': {
        'nome': 'RAFAEL SANTOS SILVA',
        'nacionalidade': 'brasileiro',
        'profissao': 'motorista',
        'cnh': '987654321',
        'cpf': '987.654.321-00',
        'endereco': 'Rua Ubaldino de Brito 3 Condominio Portal do Sol casa 3 Ipitanga',
        'cidade': 'Lauro de Freitas',
        'estado': 'BA',
        'cep': '42.706-240'
    },
    'veiculo': {
        'marca_modelo': 'RENAULT/KWID ZEN 10MT',
        'placa': 'QUW 7B93',
        'renavan': '96341421474',
        'chassi': '9xxxxxxxxxxxx2',
        'motor': 'Bxxxxxxxxxx5',
        'cor': 'BRANCA',
        'combustivel': 'ALCOOL/GASOLINA',
        'ano_fabricacao': '2020',
        'ano_modelo': '2019',
        'acessorios': 'ar condicionado, vidros elétricos nas 02 portas dianteiras, direção hidráulica, travas elétricas, CHAVE COMUM ORIGINAL COM TELECOMANDO, AUTO RÁDIO 2 DIN COM PENDRIVE, JOGO DE PNEUS PERFIL 185/65 ARO 14 COM CALOTAS, KIT DE SEGURANÇA COM MACACO, CHAVE DE RODAS E TRIÂNGULO'
    },
    'contrato': {
        'prazo_meses': '3',
        'valor_semanal': '600,00',
        'dia_pagamento': 'segundas-feiras',
        'banco': 'Banco do Brasil',
        'agencia': '3072',
        'conta': '495212-0',
        'chave_pix': '123.456.789-00',
        'valor_caucao': '1.600,00',
        'valor_antecipado': '600,00',
        'seguradora': 'MARTOLLI',
        'valor_franquia': '3.000,00',
        'multa_atraso_dia': '30,00',
        'multa_rescisao': '1.600,00',
        'aviso_previo_dias': '20',
        'local_assinatura': 'Lauro de Freitas',
        'data_assinatura': '15 de março de 2023',
        'forum': 'Lauro de Freitas/Bahia'
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para formulário
    document.getElementById('contratoForm').addEventListener('submit', salvarDados);
    document.getElementById('preview-tab').addEventListener('click', atualizarPreview);
});

// Função para selecionar tipo de contrato
function selecionarTipoContrato(tipo) {
    tipoContratoAtual = tipo;
    
    // Atualizar breadcrumb
    const breadcrumb = document.getElementById('breadcrumbTipo');
    breadcrumb.textContent = tipo === 'imovel' ? 'Contrato de Imóvel' : 'Contrato de Veículo';
    
    // Carregar dados padrão
    dadosContrato = tipo === 'imovel' ? JSON.parse(JSON.stringify(dadosPadraoImovel)) : JSON.parse(JSON.stringify(dadosPadraoVeiculo));
    
    // Gerar formulário
    gerarFormulario(tipo);
    
    // Mostrar interface principal
    document.getElementById('contractSelector').style.display = 'none';
    document.getElementById('mainInterface').style.display = 'block';
    
    // Aplicar máscaras
    setTimeout(() => {
        aplicarMascaras();
        configurarCalculoDataFim();
    }, 100);
}

// Função para voltar ao seletor
function voltarSeletor() {
    document.getElementById('contractSelector').style.display = 'block';
    document.getElementById('mainInterface').style.display = 'none';
    tipoContratoAtual = null;
}

// Função para gerar formulário baseado no tipo
function gerarFormulario(tipo) {
    const container = document.getElementById('formContainer');
    
    if (tipo === 'imovel') {
        container.innerHTML = gerarFormularioImovel();
    } else {
        container.innerHTML = gerarFormularioVeiculo();
    }
    
    // Preencher com dados padrão
    preencherFormulario(dadosContrato);
}

// Função para gerar formulário de imóvel
function gerarFormularioImovel() {
    return `
        <!-- Dados da Locadora -->
        <div class="form-section">
            <h4><i class="fas fa-user-tie"></i> Dados da Locadora</h4>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" name="locadora.nome" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Nacionalidade</label>
                    <input type="text" class="form-control" name="locadora.nacionalidade" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Estado Civil</label>
                    <select class="form-select" name="locadora.estado_civil" required>
                        <option value="">Selecione</option>
                        <option value="solteiro">Solteiro(a)</option>
                        <option value="casado">Casado(a)</option>
                        <option value="divorciado">Divorciado(a)</option>
                        <option value="viúvo">Viúvo(a)</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">RG</label>
                    <input type="text" class="form-control" name="locadora.rg" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Órgão Expedidor</label>
                    <input type="text" class="form-control" name="locadora.orgao_rg" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CPF</label>
                    <input type="text" class="form-control" name="locadora.cpf" required>
                </div>
                <div class="col-md-8 mb-3">
                    <label class="form-label">Endereço</label>
                    <input type="text" class="form-control" name="locadora.endereco" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="locadora.cep" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="locadora.cidade" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Estado</label>
                    <input type="text" class="form-control" name="locadora.estado" required>
                </div>
            </div>
        </div>
        
        <!-- Dados do Locatário -->
        <div class="form-section">
            <h4><i class="fas fa-user"></i> Dados do Locatário</h4>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" name="locatario.nome" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Nacionalidade</label>
                    <input type="text" class="form-control" name="locatario.nacionalidade" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Estado Civil</label>
                    <select class="form-select" name="locatario.estado_civil" required>
                        <option value="">Selecione</option>
                        <option value="solteiro">Solteiro(a)</option>
                        <option value="casado">Casado(a)</option>
                        <option value="divorciado">Divorciado(a)</option>
                        <option value="viúvo">Viúvo(a)</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Profissão</label>
                    <input type="text" class="form-control" name="locatario.profissao" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Telefone</label>
                    <input type="text" class="form-control" name="locatario.telefone" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Data de Nascimento</label>
                    <input type="text" class="form-control" name="locatario.data_nascimento" placeholder="DD-MM-AAAA" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">RG</label>
                    <input type="text" class="form-control" name="locatario.rg" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Órgão Expedidor</label>
                    <input type="text" class="form-control" name="locatario.orgao_rg" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CPF</label>
                    <input type="text" class="form-control" name="locatario.cpf" required>
                </div>
                <div class="col-md-8 mb-3">
                    <label class="form-label">Endereço</label>
                    <input type="text" class="form-control" name="locatario.endereco" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="locatario.cep" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="locatario.cidade" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Estado</label>
                    <input type="text" class="form-control" name="locatario.estado" required>
                </div>
            </div>
        </div>
        
        <!-- Dados do Imóvel -->
        <div class="form-section">
            <h4><i class="fas fa-home"></i> Dados do Imóvel</h4>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Tipo do Imóvel</label>
                    <select class="form-select" name="imovel.tipo" required>
                        <option value="">Selecione</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Kitnet">Kitnet</option>
                        <option value="Studio">Studio</option>
                        <option value="Loft">Loft</option>
                    </select>
                </div>
                <div class="col-md-8 mb-3">
                    <label class="form-label">Endereço do Imóvel</label>
                    <input type="text" class="form-control" name="imovel.endereco" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="imovel.cep" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="imovel.cidade" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Estado</label>
                    <input type="text" class="form-control" name="imovel.estado" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Quartos</label>
                    <input type="text" class="form-control" name="imovel.quartos" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Salas</label>
                    <input type="text" class="form-control" name="imovel.sala" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Cozinhas</label>
                    <input type="text" class="form-control" name="imovel.cozinha" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Banheiros</label>
                    <input type="text" class="form-control" name="imovel.banheiros" required>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Observações Adicionais</label>
                    <textarea class="form-control" name="imovel.observacoes" rows="3"></textarea>
                </div>
            </div>
        </div>
        
        <!-- Dados do Contrato -->
        <div class="form-section">
            <h4><i class="fas fa-file-contract"></i> Dados do Contrato</h4>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Tipo de Locação</label>
                    <select class="form-select" name="contrato.tipo_locacao" required>
                        <option value="">Selecione</option>
                        <option value="residencial">Residencial</option>
                        <option value="comercial">Comercial</option>
                        <option value="misto">Misto</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Finalidade</label>
                    <input type="text" class="form-control" name="contrato.finalidade" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Prazo (meses)</label>
                    <input type="number" class="form-control" name="contrato.prazo_meses" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Data de Início</label>
                    <input type="text" class="form-control" name="contrato.data_inicio" placeholder="DD/MM/AAAA" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Data de Fim</label>
                    <input type="text" class="form-control" name="contrato.data_fim" placeholder="DD/MM/AAAA" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Dia do Vencimento</label>
                    <input type="number" class="form-control" name="contrato.dia_vencimento" min="1" max="31" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Valor do Aluguel (R$)</label>
                    <input type="text" class="form-control" name="contrato.valor_aluguel" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Valor da Fiança (R$)</label>
                    <input type="text" class="form-control" name="contrato.valor_fianca" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Chave PIX</label>
                    <input type="text" class="form-control" name="contrato.chave_pix" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Banco PIX</label>
                    <input type="text" class="form-control" name="contrato.banco_pix" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Local de Assinatura</label>
                    <input type="text" class="form-control" name="contrato.local_assinatura" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Data de Assinatura</label>
                    <input type="text" class="form-control" name="contrato.data_assinatura" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Fórum Competente</label>
                    <input type="text" class="form-control" name="contrato.forum" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Índice de Reajuste</label>
                    <input type="text" class="form-control" name="contrato.indice_reajuste" required>
                </div>
            </div>
        </div>
    `;
}

// Função para gerar formulário de veículo
function gerarFormularioVeiculo() {
    return `
        <!-- Dados do Locador -->
        <div class="form-section">
            <h4><i class="fas fa-user-tie"></i> Dados do Locador</h4>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" name="locador.nome" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Nacionalidade</label>
                    <input type="text" class="form-control" name="locador.nacionalidade" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">CNH</label>
                    <input type="text" class="form-control" name="locador.cnh" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CPF</label>
                    <input type="text" class="form-control" name="locador.cpf" required>
                </div>
                <div class="col-md-8 mb-3">
                    <label class="form-label">Endereço</label>
                    <input type="text" class="form-control" name="locador.endereco" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="locador.cep" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="locador.cidade" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Estado</label>
                    <input type="text" class="form-control" name="locador.estado" required>
                </div>
            </div>
        </div>
        
        <!-- Dados do Locatário -->
        <div class="form-section">
            <h4><i class="fas fa-user"></i> Dados do Locatário</h4>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" name="locatario.nome" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Nacionalidade</label>
                    <input type="text" class="form-control" name="locatario.nacionalidade" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Profissão</label>
                    <input type="text" class="form-control" name="locatario.profissao" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CNH</label>
                    <input type="text" class="form-control" name="locatario.cnh" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CPF</label>
                    <input type="text" class="form-control" name="locatario.cpf" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="locatario.cep" required>
                </div>
                <div class="col-md-8 mb-3">
                    <label class="form-label">Endereço</label>
                    <input type="text" class="form-control" name="locatario.endereco" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="locatario.cidade" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Estado</label>
                    <input type="text" class="form-control" name="locatario.estado" required>
                </div>
            </div>
        </div>
        
        <!-- Dados do Veículo -->
        <div class="form-section">
            <h4><i class="fas fa-car"></i> Dados do Veículo</h4>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Marca/Modelo</label>
                    <input type="text" class="form-control" name="veiculo.marca_modelo" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Placa</label>
                    <input type="text" class="form-control" name="veiculo.placa" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Cor</label>
                    <input type="text" class="form-control" name="veiculo.cor" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Renavan</label>
                    <input type="text" class="form-control" name="veiculo.renavan" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Chassi</label>
                    <input type="text" class="form-control" name="veiculo.chassi" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Motor</label>
                    <input type="text" class="form-control" name="veiculo.motor" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Combustível</label>
                    <input type="text" class="form-control" name="veiculo.combustivel" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Ano Fabricação</label>
                    <input type="text" class="form-control" name="veiculo.ano_fabricacao" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Ano Modelo</label>
                    <input type="text" class="form-control" name="veiculo.ano_modelo" required>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Acessórios</label>
                    <textarea class="form-control" name="veiculo.acessorios" rows="3"></textarea>
                </div>
            </div>
        </div>
        
        <!-- Dados do Contrato -->
        <div class="form-section">
            <h4><i class="fas fa-file-contract"></i> Dados do Contrato</h4>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Prazo (meses)</label>
                    <input type="number" class="form-control" name="contrato.prazo_meses" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Valor Semanal (R$)</label>
                    <input type="text" class="form-control" name="contrato.valor_semanal" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Dia do Pagamento</label>
                    <input type="text" class="form-control" name="contrato.dia_pagamento" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Banco</label>
                    <input type="text" class="form-control" name="contrato.banco" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Agência</label>
                    <input type="text" class="form-control" name="contrato.agencia" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Conta</label>
                    <input type="text" class="form-control" name="contrato.conta" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Chave PIX</label>
                    <input type="text" class="form-control" name="contrato.chave_pix" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Valor da Caução (R$)</label>
                    <input type="text" class="form-control" name="contrato.valor_caucao" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Valor Antecipado (R$)</label>
                    <input type="text" class="form-control" name="contrato.valor_antecipado" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Seguradora</label>
                    <input type="text" class="form-control" name="contrato.seguradora" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Valor da Franquia (R$)</label>
                    <input type="text" class="form-control" name="contrato.valor_franquia" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Multa Atraso/Dia (R$)</label>
                    <input type="text" class="form-control" name="contrato.multa_atraso_dia" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Multa Rescisão (R$)</label>
                    <input type="text" class="form-control" name="contrato.multa_rescisao" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Aviso Prévio (dias)</label>
                    <input type="number" class="form-control" name="contrato.aviso_previo_dias" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Local de Assinatura</label>
                    <input type="text" class="form-control" name="contrato.local_assinatura" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Data de Assinatura</label>
                    <input type="text" class="form-control" name="contrato.data_assinatura" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Fórum Competente</label>
                    <input type="text" class="form-control" name="contrato.forum" required>
                </div>
            </div>
        </div>
    `;
}

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
    document.querySelectorAll('input[name*="valor_"], input[name*="multa_"]').forEach(input => {
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
        localStorage.setItem(`contratoData_${tipoContratoAtual}`, JSON.stringify(dados));
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
        const textoContrato = tipoContratoAtual === 'imovel' ? gerarTextoContratoImovel() : gerarTextoContratoVeiculo();
        const textoFormatado = formatarTextoContrato(textoContrato);
        preview.innerHTML = textoFormatado;
    } catch (error) {
        console.error('Erro ao gerar preview:', error);
        document.getElementById('contratoPreview').innerHTML = 
            '<div class="text-center text-danger"><i class="fas fa-exclamation-triangle fa-3x mb-3"></i><p>Erro ao carregar preview do contrato</p></div>';
    }
}

// Função para gerar o texto do contrato de imóvel
function gerarTextoContratoImovel() {
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

// Função para gerar o texto do contrato de veículo
function gerarTextoContratoVeiculo() {
    const data = dadosContrato;
    
    return `INSTRUMENTO PARTICULAR DE LOCAÇÃO DE VEÍCULO

CLÁUSULA PRIMEIRA – DAS PARTES

De um lado, ${data.locador.nome}, ${data.locador.nacionalidade}, portador da CNH nº ${data.locador.cnh} DETRAN-BA, inscrito regularmente no CPF/ sob o nº ${data.locador.cpf} residente e domiciliado na ${data.locador.endereco}, ${data.locador.cidade}-${data.locador.estado}, CEP ${data.locador.cep}, neste Instrumento como LOCADOR.

De outro lado, ${data.locatario.nome}, ${data.locatario.nacionalidade}, ${data.locatario.profissao}, portadora da CNH nº ${data.locatario.cnh} DETRAN-BA, inscrito regularmente no CPF/MF sob o Nº ${data.locatario.cpf}, residente e domiciliado na ${data.locatario.endereco} CEP ${data.locatario.cep} ${data.locatario.cidade} ${data.locatario.estado}, neste Instrumento como LOCATÁRIO.

Assim, o LOCADOR e o LOCATÁRIO RESOLVEM de comum acordo, celebrar o presente Instrumento Particular Locação de Veículo, que se regerá pelas cláusulas e condições do presente Instrumento.

CLÁUSULA SEGUNDA – DO OBJETO

${data.veiculo.marca_modelo}, PLACA ${data.veiculo.placa}/BA, RENAVAN ${data.veiculo.renavan}, CHASSI ${data.veiculo.chassi}, MOTOR: ${data.veiculo.motor} ${data.veiculo.cor} ${data.veiculo.combustivel}, ANO ${data.veiculo.ano_fabricacao} / MODELO ${data.veiculo.ano_modelo}, COMBUSTÍVEIS: ${data.veiculo.combustivel} veículo possui ${data.veiculo.acessorios}, e está dando em locação ao LOCATÁRIO, pelo prazo de ${data.contrato.prazo_meses} meses, tendo início a partir da assinatura deste instrumento.

CLÁUSULA TERCEIRA – DO PREÇO, FORMA DE PAGAMENTO E CAUÇÃO

O LOCATÁRIO efetuará o pagamento do aluguel, semanalmente (${data.contrato.dia_pagamento}), no valor de R$ ${data.contrato.valor_semanal} do objeto deste Instrumento ao LOCADOR, através de depósito bancário na conta corrente do ${data.contrato.banco}, AGÊNCIA ${data.contrato.agencia}, C/C ${data.contrato.conta}, PIX ${data.contrato.chave_pix} (CPF), em nome de ${data.locador.nome} ou em espécie mediante a entrega do recibo pelo locador.

No ato da assinatura deste instrumento particular de locação de veículo o LOCATÁRIO ira efetuar o pagamento da CAUÇÃO no valor de R$ ${data.contrato.valor_caucao} e de R$ ${data.contrato.valor_antecipado} da semana antecipada.

Sendo que o valor da CAUÇÃO (R$ ${data.contrato.valor_caucao}) será devolvido de acordo com a Cláusula Oitava item 9.5.

CLÁUSULA QUARTA – DAS DECLARAÇÕES DO LOCADOR

Declara neste ato o LOCADOR que é legítimo proprietário do veículo, objeto deste Instrumento Particular de Locação de Veículos e, que o citado veículo, se encontra livre e desembaraçado de quaisquer ônus reais, bem como de todas e quaisquer medidas legais ou convencionais, penhora, arresto, sequestro e quite com todos os impostos, não existindo assim quaisquer dívidas, ações judiciais em tramitação ou execuções judiciais que possam comprometer a validade e eficácia do presente instrumento, declaração que fazem sob pena das responsabilidades legais. Afirmando, ainda, o LOCADOR que a descrição do referido veículo condiz com a verdade no que se refere a documentação, bem como que o veículo, objeto deste instrumento, encontra-se em perfeito estado de conservação e funcionamento, ficando o locatário responsável pela devolução no mesmo estado e condições a partir da assinatura.

CLÁUSULA QUINTA – DA POSSE

O LOCATÁRIO utilizará o carro para transporte de passageiro de aplicativos ou uso pessoal, sendo responsável conjuntamente o LOCADOR, POR CONSERTO E MANUTENÇÃO, que advirem pelo seu uso (MANUTENÇÃO DIVIDIDA).

CLÁUSULA SEXTA – DAS DECLARAÇÕES DO LOCATÁRIO

O LOCATÁRIO não deverá ceder, emprestar ou sublocar o veículo em hipótese alguma, sob pena de cancelamento imediato do presente instrumento particular, com aplicação de multa no valor de R$ ${data.contrato.multa_rescisao} o mesmo se aplica caso o motorista seja pego fazendo uso de bebidas alcoólicas ou uso de drogas e entorpecentes.

CLÁUSULA SÉTIMA – DA VISTORIA

O LOCATÁRIO declara haver vistoriado o veículo objeto desta transação e conferido todas as suas características com as quais concordam expressamente, não tendo o que reclamar no presente ou no futuro, com referência ao citado veículo.

CLÁUSULA OITAVA – DO SEGURO

O veículo, objeto deste contrato, encontra-se segurado pela ${data.contrato.seguradora}, caso o LOCATÁRIO dê causa para utilização do mesmo arcará com a franquia no valor de R$ ${data.contrato.valor_franquia}.

CLÁUSULA NONA – DAS DISPOSIÇÕES FINAIS

9.1 – O LOCATÁRIO deverá devolver o automóvel ao LOCADOR nas mesmas condições de uso, respondendo por multas de qualquer órgão e pelos danos e prejuízos causados, inclusive danos ao motor por falta de troca de óleo, filtros de óleo, filtro de combustível e filtro de ar, enchentes, alagamentos que venha a danificar o mesmo, e danos que possa causar a terceiros.

9.2 – Não será permitido atraso no pagamento semanal, ficando sujeito a multa diária no valor de R$ ${data.contrato.multa_atraso_dia} OU PODENDO SE ENCERRAR O CONTRATO COM A DEVOLUÇÃO DO VEÍCULO EM PERFEITO ESTADO.

9.3 – Este presente instrumento isenta qualquer vínculo empregatício entre o LOCATÁRIO e o LOCADOR.

9.4 – É ASSEGURADO AS PARTES A RESCISÃO DO PRESENTE CONTRATO A QUALQUER MOMENTO, DESDE QUE HAJA UM AVISO PREVIO DE ${data.contrato.aviso_previo_dias} DIAS.

9.5 – APÓS O ENCERRAMENTO DO CONTRATO, O VEICULO SERÁ INSPECIONADO, NÃO HAVENDO DANOS AO VEÍCULO E NEM MULTA OU DANO A TERCEIROS A CAUÇÃO SERÁ DEVOLVIDA EM ATÉ 20 DIAS ÚTEIS. CASO OCORRA ALGUM EMPECILHO CITADO ANTERIORMENTE SERÁ DESCONTADO DA CAUÇÃO O VALOR PARA REPARO, SENDO ESTA INSUFICIENTE O LOCATÁRIO TEM DE COMPLEMENTAR O VALOR.

9.6 – O LOCATÁRIO ARCARÁ COM AS DESPESAS PROVENIENTES DE SUA UTILIZAÇÃO TAIS COMO: GASOLINA E QUAISQUER MULTAS OU INFRAÇÕES RECEBIDAS PELOS ÓRGÃOS DE TRÂNSITO NO PERÍODO DA LOCAÇÃO, SENDO ESTAS INFORMADAS DE IMEDIATAS AO LOCADOR PARA PROVIDENCIAR JUNTO AOS RESPECTIVOS ÓRGÃOS A APLICAÇÃO DE PERDA DOS PONTOS NA CARTEIRA NACIONAL DE TRÂNSITO – CNH DO LOCATÁRIO.

9.7 – O LOCATÁRIO fica obrigado a apresentar o carro ao LOCADOR a cada 30 (trinta) dias para vistoria. Como também, caso seja necessário realizar procedimentos de reparos no prazo máximo de 30 (trinta) dias.

9.8 – O LOCATÁRIO fica obrigado a pagar IMEDIATAMENTE as multas de trânsito, mesmo que venha realizar junto ao órgão responsável o questionamento da mesma.

9.9 – Fica o LOCATÁRIO obrigado a pagar normalmente a semana, caso ocorra problemas mecânicos ou necessidade de reparos (de acordo com a cláusula 9.7) em que der causa.

9.10 – Fica o LOCADOR obrigado a reduzir o valor da semana em R$ 87,00 (oitenta e sete reais) por dia, nos dias em que o automóvel objeto deste contrato estiver com problemas mecânicos que não foram ocasionados pelo mal uso do LOCATÁRIO.

9.11 – Acordam desde já as partes integrantes deste instrumento, que o descumprimento de quaisquer das cláusulas e disposições neste ato pactuadas que culminem em rescisão do mesmo, implicará na cobrança de multa em favor da parte inocente da seguinte forma:

9.11.1 – Se causada pele LOCADOR, esta pagará em até 15 (quinze) dias a quantia de R$ ${data.contrato.multa_rescisao}, em favor do LOCATÁRIO;

9.11.2 – Se causada pelo LOCATÁRIO, este pagará em até 15 (quinze) dias a quantia R$ ${data.contrato.multa_rescisao}, em favor do LOCADOR.

9.11.3 – Em qualquer circunstância a parte infratora arcará com os honorários advocatícios se houver necessidade de interpelação judicial.

9.12 – E assim por se acharem certos e ajustados, respondendo as partes, herdeiros e/ou sucessores ao seu fiel e exato cumprimento, observando todas as cláusulas e disposições na sua inteireza, as partes elegem o Foro da Cidade de ${data.contrato.forum}, como competente para esclarecimentos de dúvidas ou controvérsias, e, assinam o presente instrumento em 02 (duas) vias, com suas páginas numeradas e sem rasuras.

${data.contrato.local_assinatura}-BA, ${data.contrato.data_assinatura}.

LOCADOR:
__________________________________________
${data.locador.nome}
CPF/MF Nº ${data.locador.cpf}

LOCATÁRIO:
____________________________________________
${data.locatario.nome}
CPF/MF Nº ${data.locatario.cpf}

TESTEMUNHAS:
_______________________________   ______________________________
Testemunha:       Testemunha:
CPF/MF n°       CPF/MF n°`;
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
        if (linhaTrimmed.includes('CONTRATO DE LOCAÇÃO') || linhaTrimmed.includes('INSTRUMENTO PARTICULAR')) {
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
        else if (linhaTrimmed.includes('LOCADORA:') || linhaTrimmed.includes('LOCATÁRIA:') || linhaTrimmed.includes('LOCADOR:') || linhaTrimmed.includes('LOCATÁRIO:')) {
            html += `<p class="mb-3"><strong>${linhaTrimmed}</strong></p>`;
        }
        // Local e data
        else if (linhaTrimmed.match(/^[A-Za-z]+,\s+\d+/) || linhaTrimmed.match(/^[A-Za-z]+-[A-Z]{2},/)) {
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
        
        const textoContrato = tipoContratoAtual === 'imovel' ? gerarTextoContratoImovel() : gerarTextoContratoVeiculo();
        const linhas = doc.splitTextToSize(textoContrato, 180);
        
        let y = 20;
        const pageHeight = doc.internal.pageSize.height;
        
        // Adicionar título
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        const titulo = tipoContratoAtual === 'imovel' ? 'CONTRATO DE LOCAÇÃO DE IMÓVEL RESIDENCIAL' : 'INSTRUMENTO PARTICULAR DE LOCAÇÃO DE VEÍCULO';
        doc.text(titulo, 105, y, { align: 'center' });
        
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
        const nomeArquivo = tipoContratoAtual === 'imovel' ? 'contrato_locacao_imovel.pdf' : 'contrato_locacao_veiculo.pdf';
        doc.save(nomeArquivo);
        mostrarAlerta('PDF gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        mostrarAlerta('Erro ao gerar PDF. Verifique se todos os dados estão preenchidos.', 'danger');
    }
}

// Função para exportar Word (simulação com download de texto)
function exportarWord() {
    try {
        const textoContrato = tipoContratoAtual === 'imovel' ? gerarTextoContratoImovel() : gerarTextoContratoVeiculo();
        
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
        const nomeArquivo = tipoContratoAtual === 'imovel' ? 'contrato_locacao_imovel.doc' : 'contrato_locacao_veiculo.doc';
        a.download = nomeArquivo;
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
        const dataInicio = dataInicioInput?.value;
        const prazo = parseInt(prazoInput?.value);
        
        if (dataInicio && prazo && dataFimInput) {
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

