import MainLayout from "../layouts/main.layout.vue";
import HomeComponent from "../components/home/home.component.vue";
import CreatePublishComponent from "../site/publish/create-publish.component.vue";
import DetailProductComponent from "../site/product/detail-product.component.vue";
import PlanComponent from "../site/plan/plan.component.vue";
import SearchPublishComponent from "../site/publish/search-publish.component.vue";

export default {
  path: "/site",
  name: "site",
  component: MainLayout,
  children: [
    {
      path: "home",
      name: "home",
      component: HomeComponent,
      meta: {
        isAuthorize: false,
      },
    },
    {
      path: "create-publish",
      name: "create-publish",
      component: CreatePublishComponent,
      meta: {
        isAuthorize: true,
      },
    },
    {
      path: "detail-product/:uuid",
      name: "detail-product",
      component: DetailProductComponent,
      params: true,
      meta: {
        isAuthorize: false,
      },
    },
    {
      path: "plan",
      name: "plan",
      component: PlanComponent,
      meta: {
        isAuthorize: true,
      },
    },
    {
      path: "publishes",
      name: "search-publish",
      component: SearchPublishComponent,
      query: true,
      meta: {
        isAuthorize: false,
      },
    }
  ],
};
