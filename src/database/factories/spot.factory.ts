import { faker } from '@faker-js/faker';
import { Constructor, EntityData } from '@mikro-orm/core';
import { Factory } from '@mikro-orm/seeder';
import { Spot } from 'src/resources/spots/entities/spot.entity';

export class SpotFactory extends Factory<Spot> {
  model: Constructor<Spot> = Spot;

  protected definition(): EntityData<Spot> {
    return {
      title: faker.location.street(),
      address: faker.location.streetAddress(),
      description: faker.lorem.paragraph(),
    };
  }
}
