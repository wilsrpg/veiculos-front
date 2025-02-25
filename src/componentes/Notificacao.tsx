import { useEffect, useState } from 'react'
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand  } from "@aws-sdk/client-sqs";

export default function Notificacao() {
  const [novaNotificacao, setNovaNotificacao] = useState<boolean>();
  const [mensagens, setMensagens] = useState<{texto: string, id: string}[]>([]);
  const [exibindoPainelDeNotificacoes, setExibindoPainelDeNotificacoes] = useState(false);

  async function verificar() {
    const client = new SQSClient({
      region: import.meta.env.VITE_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        accountId: import.meta.env.VITE_ACCOUNT_ID,
      }
    });
    const queueUrl = import.meta.env.VITE_QUEUE_URL;
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      WaitTimeSeconds: 10
    });
    const response = await client.send(command);
    if (response.Messages){
      console.log(response.Messages);
      const msgs = mensagens;
      for (const msg of response.Messages) {
        if (typeof msg.Body == 'string' && typeof msg.MessageId == 'string'
            && !msgs.some(m => m.id == msg.MessageId)) {
          msgs.push({texto: msg.Body, id: msg.MessageId});
        }
        const deleteCommand = new DeleteMessageCommand(
          {QueueUrl: queueUrl, ReceiptHandle: msg.ReceiptHandle}
        );
        client.send(deleteCommand);
      }
      setMensagens(msgs);
      setNovaNotificacao(true);
    }
  }
  verificar();

  useEffect(() => {
    if (exibindoPainelDeNotificacoes)
      setNovaNotificacao(false);
  }, [exibindoPainelDeNotificacoes])

  return (
    <>
    {exibindoPainelDeNotificacoes &&
      <div className='atras-do-painel' onClick={() => {
        if (exibindoPainelDeNotificacoes) {
          setExibindoPainelDeNotificacoes(false);
        }
      }}>
      <div className='painel-de-notificacoes' onClick={event => event.stopPropagation()}>
        {mensagens.length
        ? mensagens.map((msg, i) => (
          <p key={i}>{msg.texto}</p>
        ))
        : <p>Nenhuma mensagem.</p>
        }
      </div>
      </div>
    }
    <div className={'notificacao' + (novaNotificacao ? ' nova-notificacao' : '')
        + (exibindoPainelDeNotificacoes ? ' sem-borda' : '')}
      onClick={() => setExibindoPainelDeNotificacoes(!exibindoPainelDeNotificacoes)}
      title={exibindoPainelDeNotificacoes ? undefined : 'Notificações'}
    >
      {exibindoPainelDeNotificacoes ? 'x' : '!'}
    </div>
    </>
  )
}