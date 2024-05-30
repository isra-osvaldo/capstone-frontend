export default {
  Product: {
    getOne: "api/product",
    create: "api/product",
  },
  Publish: {
    create: "api/publish",
    getAll: "api/publish",
    getTop: "api/publish/top",
    getOne: "api/publish",
    getOneByUserRandom: "api/publish/commerce/random",
    getOneByUser: "api/publish/commerce",
  },
  Image: {
    create: "api/image/upload",
    createMany: "api/images/upload",
  },
  Reputation: {
    getOne: "api/reputation",
  },
  Exchange: {
    create: "api/exchange",
    getExchangeWant: "api/exchange/want",
    getExchangeRequest: "api/exchange/request",
    getMatches: "api/exchange/matches",
    patchStatus: "api/exchange/status",
  },
  Favorite: {
    create: "api/favorite",
    getOne: "api/favorite",
    getAll: "api/favorite",
    delete: "api/favorite",
  },
  Transbank: {
    create: "api/transbank",
  },
  Plan: {
    getPlan: "api/plan",
  },
  Calification: {
    create: "api/calification",
    getCalificationByExchangeUuid: "api/calification/exchange",
    updateCalification: "api/calification",
  },
};
