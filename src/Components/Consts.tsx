export const snackbarConsts = {
  success: {
    title: "Requisição feita com sucesso!",
    description: "Requisição feita com sucesso!",
    color: "#9fc54d",
  },

  error: {
    title: "Erro ao efetuar a requisição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  loginError: {
    title: "Erro ao tentar entrar na sessão!",
    description: "Usuário e/ou senha podem estar errados.",
    color: "#ff6464",
  },

  resetError: {
    title: "Erro ao redefinir senha!",
    description: "Confira se o email está correto e tente novamente.",
    color: "#ff6464",
  },
  resetSuccess: {
    title: "Requisição feita com sucesso!",
    description: "Acesse o email para finalizar a troca de senha.",
    color: "#9fc54d",
  },

  transcriptError: {
    title: "Erro ao carregar transcrição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  copyError: {
    title: "Erro ao copiar transcrição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
  copySuccess: {
    title: "Transcrição copiada!",
    description: "",
    color: "#9fc54d",
  },

  transcribeError: {
    title: "Erro ao iniciar transcrição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
  transcribeExceededError: {
    title: "Limites de agendamentos diário excedido!",
    description: "Tente novamente outro dia.",
    color: "#ff6464",
  },
  transcribeSuccess: {
    title: "Transcrição agendada com sucesso!",
    description: "",
    color: "#9fc54d",
  },
  invalidFileError: {
    title: "Erro ao selecionar o arquivo!",
    description:
      "Formatos de arquivo suportados: MP3, MP4, WAV, FLAC, AMR, OGG.",
    color: "#ff6464",
  },
  sketchError: {
    title: "Erro ao salvar o rascunho!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
  sketchSuccess: {
    title: "Rascunho salvo com sucesso!",
    description: "",
    color: "#9fc54d",
  },
};

export const fakeData = {
  jobName: "4",
  accountId: "818812123842",
  status: "COMPLETED",
  results: {
  transcripts: [
      {
      transcript:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
  ],
  items: [
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.98", content: "Lorem" }],
      start_time: "0.209",
      end_time: "0.54",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.992", content: "ipsum" }],
      start_time: "0.55",
      end_time: "0.56",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.983", content: "dolor" }],
      start_time: "0.569",
      end_time: "0.649",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.134", content: "sit" }],
      start_time: "0.66",
      end_time: "1.289",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.997", content: "amet" }],
      start_time: "1.299",
      end_time: "1.37",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.939", content: "consectetur" }],
      start_time: "1.379",
      end_time: "2.0",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.345", content: "adipiscing" }],
      start_time: "2.009",
      end_time: "2.46",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.992", content: "elit" }],
      start_time: "2.47",
      end_time: "2.539",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.991", content: "Sed" }],
      start_time: "2.549",
      end_time: "2.94",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.787", content: "do" }],
      start_time: "2.95",
      end_time: "3.42",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.995", content: "eiusmod" }],
      start_time: "3.43",
      end_time: "3.74",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.67", content: "tempor" }],
      start_time: "3.75",
      end_time: "4.23",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.995", content: "incididunt" }],
      start_time: "4.239",
      end_time: "4.42",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.998", content: "ut" }],
      start_time: "4.429",
      end_time: "4.619",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.999", content: "labore" }],
      start_time: "4.63",
      end_time: "4.699",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.996", content: "et" }],
      start_time: "4.71",
      end_time: "4.739",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.998", content: "dolore" }],
      start_time: "4.75",
      end_time: "4.98",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.938", content: "magna" }],
      start_time: "4.989",
      end_time: "5.019",
      },
      {
      type: "pronunciation",
      alternatives: [{ confidence: "0.999", content: "aliqua" }],
      start_time: "5.03",
      end_time: "5.42",
      },
      {
      type: "punctuation",
      alternatives: [{ confidence: "0.0", content: "." }],
      },
  ],
  },
};
