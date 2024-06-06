import { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";

export interface DeezerProfile extends Record<string, any> {
  id: string;
  name: string;
  email: string;
  image: any;
}

export default function Deezer<P extends DeezerProfile>(
  options: OAuthUserConfig<P> & { scope?: string }
): OAuthConfig<P> {
  const scope = options.scope ?? "basic_access,email"
  const tokenEndpointUrl = "https://connect.deezer.com/oauth/access_token.php"
  const userInfoEndpointUrl = "https://api.deezer.com/user/me"

  return {
    id: "deezer",
    name: "Deezer",
    type: "oauth",
    authorization: {
      url: "https://connect.deezer.com/oauth/auth.php",
      params: { scope },
    },
    token: {
      url: tokenEndpointUrl,
      async request({ provider, params }: any) {
        // const url = new URL(tokenEndpointUrl);
        // url.searchParams.set("app_id", provider.clientId as string);
        // url.searchParams.set("secret", provider.clientSecret as string);
        // url.searchParams.set("code", params.code as string);
        // url.searchParams.set("output", "json");

        // const res = await fetch(url, { method: "POST" });
        // const data = await res.text();
        // console.log(data);

        return {
          // tokens: {
          //   access_token: data.access_token as string,
          //   expires_at: Math.ceil(Date.now() / 1000 + +Number(data.expires)),
          // },
        };
      }
    },
    userinfo: {
      url: userInfoEndpointUrl,
    //   async request(context: any) {
      //   const accessToken = context.tokens.access_token as string
      //   const response = await fetch(userInfoEndpointUrl, {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   })
      //   return response.json()
      // },
    },
    profile(profile: P) {
      return {
        // id: profile.id,
        // name: profile.name,
        // email: profile.email,
        // image: profile.picture,
      };
    },
    style: {
      brandColor: "#ff0000",
    },
    ...(options as any),
  }
}
