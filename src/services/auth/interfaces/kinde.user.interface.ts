export interface KindeUser {
  id: string;
  provided_id: string;
  preferred_email: string;
  username: string;
  family_name: string;
  first_name: string;
  is_suspended: true;
  picture: string;
  total_sign_ins: 0;
  failed_sign_ins: 0;
  last_signed_in: string;
  created_on: string;
  organizations: [string];
  identities: [
    {
      type: string;
      identity: string;
    },
  ];
}

export interface KindeUserCreate {
  given_name: string;
  family_name: string;
  email: string;
}

export interface KindeUserSubscription {
  first_name: string;
  family_name: string;
  email: string;
}

export interface KindeUserSubscriptionResponse {
  subscriber: {
    subscriber_id: string;
  };
}
export interface CreateKindeUserResponse {
  id: string;
  created: true;
  identities: [
    {
      type: string;
      result: {
        created: true;
      };
    },
  ];
}
