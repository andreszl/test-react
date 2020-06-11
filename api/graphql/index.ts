import { GraphQLModule } from '@graphql-modules/core';
import userModule from './user';

export const modules = new GraphQLModule({
	imports: [
		userModule,
	],
});
