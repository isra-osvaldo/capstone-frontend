import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
})

export default keycloak
