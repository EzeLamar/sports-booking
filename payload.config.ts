import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig } from 'payload';

export default buildConfig({
	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),

	// Define and configure your collections in this array
	collections: [
		{
			slug: 'posts', // Identificador único de la colección
			labels: {
				singular: 'Post',
				plural: 'Posts',
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'content',
					type: 'richText',
					required: true,
				},
				{
					name: 'author',
					type: 'relationship',
					relationTo: 'users', // Relación con la colección 'users'
					required: true,
				},
				{
					name: 'publishedDate',
					type: 'date',
				},
				{
					name: 'status',
					type: 'select',
					options: [
						{
							label: 'Draft',
							value: 'draft',
						},
						{
							label: 'Published',
							value: 'published',
						},
					],
					defaultValue: 'draft',
					required: true,
				},
			],
		},
	],

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: process.env.PAYLOAD_SECRET || '',
	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || '',
	}),
	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!
	sharp,
});
