import jwtDecode from "jwt-decode"

export default function login() {
  if (!localStorage.token) {
    return Promise.resolve()
  }

  if (new Date().getTime() / 1000 < jwtDecode(localStorage.token).exp) {
    return Promise.resolve()
  }

  return fetch("https://dnsfilter-dev.auth0.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: "LGM85Iy7oI2yP4Hs9Qtyd49jgFRA_2zl",
      audience: "https://dnsfilter-dev.auth0.com/mfa/",
      realm: "Username-Password-Authentication",
      grant_type: "http://auth0.com/oauth/grant-type/password-realm",
      username: "hnordt@hnordt.com",
      password: "Q8Zh4p8t9oEA5wegX3JX",
      scope: "enroll read:authenticators remove:authenticators offline_access",
    }),
  })
    .then((response) => response.json())
    .then((data) => localStorage.setItem("token", data.access_token))
    .catch(() => alert("Failed to login"))
}
