import { ExchangeStatusEnum } from "../common/enum/exchange.enum";

export const ExchangeStatus = [
  {
    text: "Pendiente",
    value: ExchangeStatusEnum.PENDING,
  },
  {
    text: "Aceptado",
    value: ExchangeStatusEnum.ACCEPTED,
  },
  {
    text: "Rechazado",
    value: ExchangeStatusEnum.REJECTED,
  },
  {
    text: "Cancelado",
    value: ExchangeStatusEnum.CANCELED,
  },
  {
    text: "Finalizado",
    value: ExchangeStatusEnum.FINISHED,
  },
];

export const ExchangeStatusRequest = [
  {
    text: "Pendiente",
    value: ExchangeStatusEnum.PENDING,
  },
  {
    text: "Rechazado",
    value: ExchangeStatusEnum.REJECTED,
  },
  {
    text: "Cancelado",
    value: ExchangeStatusEnum.CANCELED,
  },
];
