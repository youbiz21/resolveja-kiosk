export type ServiceKey = 'limpeza' | 'impermeabilizacao' | 'antiAcaro'

export type ServiceHelpEntry = {
  nome: string
  descricao: string
  video?: string
}

export const ServicosHelp: Record<ServiceKey, ServiceHelpEntry> = {
  limpeza: {
    nome: 'Limpeza',
    descricao:
      'Serviço de limpeza profissional com extração a quente. Removemos sujidade, manchas, bactérias e ácaros em profundidade, devolvendo o aspeto original e a higiene ao seu estofado ou tapete.'
  },
  impermeabilizacao: {
    nome: 'Impermeabilização',
    descricao:
      'Aplicação de uma camada protetora que repele líquidos e dificulta a absorção de manchas. Prolonga a vida útil do tecido e facilita a limpeza no dia a dia. Recomendado após cada limpeza profissional.',
    video: 'impermeabilizacao-resolevja.mp4'
  },
  antiAcaro: {
    nome: 'Anti-Ácaro',
    descricao:
      'Tratamento especializado que elimina e previne a proliferação de ácaros. Ideal para quem sofre de alergias, asma ou rinite. Proporciona um ambiente mais saudável e livre de alergénios.'
  }
}
