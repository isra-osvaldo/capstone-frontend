import ExchangeLayout from "../layouts/exchange.layout.vue";
import ExchangeList from "../site/exchange/list-exchange.component.vue";
import ExchangeRequestComponent from "../site/exchange/exchange-request.component.vue";
import MyPublishComponent from "../site/publish/my-publish.component.vue";
import FavoriteComponent from "../site/publish/publish-favorite.component.vue";
import MatchesComponent from "../site/exchange/matches.component.vue";

export default {
  path: "/site/perfil",
  name: "exchange",
  component: ExchangeLayout,
  children: [
    {
      path: "exchange-list",
      name: "exchange-list",
      component: ExchangeList,
      meta: {
        isAuthorize: true,
      },
    },
    {
      path: "my-publications",
      name: "my-publications",
      component: MyPublishComponent,
      meta: {
        isAuthorize: true,
      },
    },
    {
      path: "exchange-request",
      name: "exchange-request",
      component: ExchangeRequestComponent,
      meta: {
        isAuthorize: true,
      },
    },
    {
      path: "favorites",
      name: "favorites",
      component: FavoriteComponent,
      meta: {
        isAuthorize: true,
      },
    },
    {
      path: "matches",
      name: "matches",
      component: MatchesComponent,
      meta: {
        isAuthorize: true,
      },
    }
  ],
};
