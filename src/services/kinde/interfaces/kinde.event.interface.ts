export interface KindeWebhookAccessRequestEvent {
  data: {
    access_request: {
      email: string;
      first_name: string;
      last_name: string;
      user_id: string;
    };
  };
  event_id: string;
  source: 'user';
  type: 'access_request.created' | 'subscription.created';
}
