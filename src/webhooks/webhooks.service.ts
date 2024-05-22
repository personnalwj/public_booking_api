import { Injectable } from '@nestjs/common';
import { JwksClient } from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import KindeService from 'src/services/kinde/kinde.service';

@Injectable()
export class WebhooksService {
  private readonly clientJwks: JwksClient;
  constructor(private readonly kindeService: KindeService) {
    this.clientJwks = new JwksClient({
      jwksUri: `${process.env.KINDE_DOMAIN}/.well-known/jwks`,
    });
  }

  async handleKindeAccessRequest(token: string): Promise<any> {
    const {
      header: { kid },
    } = jwt.decode(token, { complete: true });
    const key = await this.clientJwks.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey);
    return event;
  }
}
