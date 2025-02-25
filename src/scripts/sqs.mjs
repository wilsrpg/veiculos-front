import { Consumer } from "sqs-consumer";
import { SQSClient, ReceiveMessageCommand  } from "@aws-sdk/client-sqs";
import { config } from 'dotenv';

config();

//postMessage("iniciou");
const app = Consumer.create({
  queueUrl: 'https://sqs.sa-east-1.amazonaws.com/503561437321/cadastro-de-veiculo',
  handleMessage: async (novaMensagem) => {
  console.log(novaMensagem.Body);
  //postMessage(novaMensagem.Body);
  //const msgs = mensagens;
    //if (novaMensagem.Body)
    //  msgs.push(novaMensagem.Body);
    //setMensagens(msgs);
    //setNovaNotificacao(true);
  },
  sqs: new SQSClient({
    region: process.env.VITE_REGION,
    credentials: {
      accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
      accountId: process.env.VITE_ACCOUNT_ID,
    },
  }),
});

app.on("error", (err) => {
  console.error("error");
  console.error(err.message);
});

app.on("processing_error", (err) => {
  console.error("processing_error");
  console.error(err.message);
});

app.on("timeout_error", (err) => {
  console.error("timeout_error");
  console.error(err.message);
});

app.start();
console.log('Aguardando novas mensagens...');