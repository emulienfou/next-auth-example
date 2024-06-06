import { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";

export interface UniverseProfile extends Record<string, any> {
  tags: [],
  organizations: [],
  current_user: {
    id: string
    slug: string
    first_name: string
    last_name: string
    gender: any
    created_at: string
    updated_at: string
    description: any
    short_description: string
    locale: string
    verified_at: any
    manual_ref: any
    messageable: boolean
    has_avatar: boolean
    confirmed: boolean
    starter_plan: boolean
    image_url: any
    image_url_500: any
    image_url_160: any
    image_url_50: any
    cover_photo_url: any
    needs_completion: boolean
    email: string
    unconfirmed_email: any
    role: string
    kraken_token: string
    is_business: boolean
    memberships_count: number
    location: Array<any>
    phone: any
    profile_visibility: string
    pseudonym: any
    facebook_name: any
    facebook_uid: any
    has_facebook_authentication: boolean
    twitter_name: any
    has_twitter_authentication: boolean
    google_name: any
    has_google_authentication: boolean
    signup_client: any
    unread_conversations_count: number
    hide_my_tickets_notice: boolean
    currencies: Array<any>
    listing_currencies: Array<any>
    has_listings: boolean
    receives_marketing_emails: boolean
    google_analytics_id: any
    google_analytics_ecommerce: boolean
    business_email: any
    business_phone_number: any
    business_address: any
    is_business_seller: boolean
    website: any
    facebook_url: any
    twitter_url: any
    instagram_url: any
    terms_of_service_url: any
    privacy_policy_url: any
    is_super_admin: boolean
    is_admin: boolean
    is_host: boolean
    su_session: boolean
    waitlist_fan_opt_in: any
    has_stripe_connect_usd: boolean
    has_stripe_connect_cad: boolean
    has_stripe_connect_gbp: boolean
    has_stripe_connect_eur: boolean
    has_stripe_connect_aud: boolean;
    has_stripe_connect_brl: boolean
    has_stripe_connect_chf: boolean
    has_stripe_connect_dkk: boolean
    has_stripe_connect_nok: boolean
    has_stripe_connect_nzd: boolean
    has_stripe_connect_sek: boolean
    has_stripe_connect_mxn: boolean
    has_stripe_connect_jpy: boolean
    has_stripe_connect_hkd: boolean
    has_stripe_connect_usd_terminal: boolean
    billing_info: Array<any>
    tag_ids: Array<any>
    organization_id: string
    memberships: Array<any>
    authentications: Array<any>
    stripe_connect_permissions: Array<any>
    ticket_type_groups_for_passes: Array<any>
  }
}

export default function Universe<P extends UniverseProfile>(
  options: OAuthUserConfig<P> & { scope?: string }
): OAuthConfig<P> {
  return {
    id: "universe",
    name: "Universe",
    type: "oauth",
    authorization: {
      url: "https://www.universe.com/oauth/authorize",
      params: { scope: "public" },
    },
    token: "https://www.universe.com/oauth/token",
    userinfo: "https://www.universe.com/api/v2/current_user",
    profile(profile: P) {
      return {
        id: profile.current_user.id,
        name: profile.current_user.first_name + profile.current_user.last_name,
        email: profile.current_user.email,
        image: profile.current_user.image_url,
      };
    },
    style: {
      brandColor: "#ff9900",
    },
    ...(options as any),
  };
}
