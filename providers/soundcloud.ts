import { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";

export interface SoundcloudProfile extends Record<string, any> {
  avatar_url: string;
  city: string;
  country: string;
  created_at: string;
  description: string;
  discogs_name: string;
  first_name: string;
  followers_count: number;
  followings_count: number;
  full_name: string;
  id: number;
  kind: string;
  last_modified: string;
  last_name: string;
  likes_count: number;
  locale: string;
  online: boolean;
  permalink: string;
  permalink_url: string;
  plan: string;
  playlist_count: number;
  primary_email_confirmed: boolean;
  private_playlists_count: number;
  private_tracks_count: number;
  public_favorites_count: number;
  quota: {
    unlimited_upload_quota: boolean
    upload_seconds_used: number
    upload_seconds_left: number
  };
  reposts_count: number;
  subscriptions: Array<{
    product: {
      id: string
      name: string
    }
    recurring: boolean
  }>;
  track_count: number;
  upload_seconds_left: number;
  uri: string;
  username: string;
  website: string;
  website_title: string;
}

export default function Soundcloud<P extends SoundcloudProfile>(
  options: OAuthUserConfig<P> & { scope?: string },
): OAuthConfig<P> {
  const scope = options.scope ?? "";
  const tokenEndpointUrl = "https://secure.soundcloud.com/oauth/token";
  const userInfoEndpointUrl = "https://api.soundcloud.com/me";

  return {
    id: "soundcloud",
    name: "SoundCloud",
    type: "oauth",
    authorization: {
      url: "https://secure.soundcloud.com/authorize",
      params: { scope },
    },
    token: {
      url: tokenEndpointUrl,
    },
    userinfo: {
      url: userInfoEndpointUrl,
    },
    profile(profile: P) {
      return {
        id: profile.id.toString(),
        name: profile.username,
        email: profile.username,
        image: profile.avatar_url,
      };
    },
    style: {
      brandColor: "#ff5500",
    },
    ...(options as any),
  };
}
