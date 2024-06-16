import { faker } from '@faker-js/faker';
import { Constructor, EntityData } from '@mikro-orm/core';
import { Factory } from '@mikro-orm/seeder';
import { Congregation } from 'src/resources/congregations/entities/congregation.entity';

export class CongregationFactory extends Factory<Congregation> {
  model: Constructor<Congregation> = Congregation;

  protected definition(): EntityData<Congregation> {
    return {
      name: faker.location.city(),
      address: faker.location.streetAddress(),
    };
  }
}
