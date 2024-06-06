import { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";

export interface MusicBrainProfile extends Record<string, any> {
  email: string;
  profile: string;
  gender: string;
  zoneinfo: string;
  website: string;
  email_verified: boolean;
  metabrainz_user_id: number;
  sub: string;
}

export default function MusicBrainz<P extends MusicBrainProfile>(
  options: OAuthUserConfig<P> & { scope?: string }
): OAuthConfig<P> {
  const scope = options.scope ?? "profile email"

  return {
    id: "musicbrainz",
    name: "MusicBrainz",
    type: "oauth",
    authorization: {
      url: "https://musicbrainz.org/oauth2/authorize",
      params: { response_type: "code", scope },
    },
    token: "https://musicbrainz.org/oauth2/token",
    userinfo: "https://musicbrainz.org/oauth2/userinfo",
    profile(profile: P) {
      return {
        id: profile.metabrainz_user_id.toString(),
        name: profile.sub,
        email: profile.email,
        image: "",
      };
    },
    style: {
      brandColor: "#eb743b",
    },
    ...(options as any),
  };
}
