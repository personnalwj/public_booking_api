import { faker } from '@faker-js/faker';
import { Constructor, EntityData } from '@mikro-orm/core';
import { Factory } from '@mikro-orm/seeder';
import { User } from 'src/resources/users/entities/user.entity';

export class UserFactory extends Factory<User> {
  model: Constructor<User> = User;

  protected definition(): EntityData<User> {
    return {
      name: faker.person.fullName(),
      sub: faker.string.uuid(),
    };
  }
}
