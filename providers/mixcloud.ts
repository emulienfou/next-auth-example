import { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";

export interface MixcloudProfile extends Record<string, any> {
  key: string;
  url: string;
  name: string;
  username: string;
  pictures: {
    small: string
    thumbnail: string
    medium_mobile: string
    medium: string
    large: string
    "320wx320h": string
    extra_large: string
    "640wx640h": string
  };
  is_current_user: boolean;
  following: boolean;
  follower: boolean;
  biog: string;
  created_time: string;
  updated_time: string;
  follower_count: number;
  following_count: number;
  cloudcast_count: number;
  favorite_count: number;
  listen_count: number;
  is_pro: boolean;
  is_premium: boolean;
  city: string;
  country: string;
  cover_pictures: {
    "835wx120h": string
    "1113wx160h": string
    "1670wx240h": string
  };
  picture_primary_color: string;
}

export default function Mixcloud<P extends MixcloudProfile>(
  options: OAuthUserConfig<P> & { scope?: string }
): OAuthConfig<P> {
  return {
    id: "mixcloud",
    name: "Mixcloud",
    type: "oauth",
    authorization: "https://www.mixcloud.com/oauth/authorize",
    token: "https://www.mixcloud.com/oauth/access_token",
    userinfo: "https://api.mixcloud.com/me/",
    profile(profile: P) {
      return {
        id: profile.key,
        name: profile.name,
        email: `@${ profile.key }`,
        image: profile.pictures.large,
      };
    },
    style: {
      brandColor: "#5000ff",
    },
    ...(options as any),
  };
}
