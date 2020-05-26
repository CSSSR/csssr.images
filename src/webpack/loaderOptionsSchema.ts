import { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    breakpoints: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              minWidth: { type: 'number' },
            },
            required: ['name', 'minWidth'],
          },
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              minWidth: { type: 'number' },
              maxWidth: { type: 'number' },
            },
            required: ['name', 'minWidth', 'maxWidth'],
          },
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              maxWidth: { type: 'number' },
            },
            required: ['name', 'maxWidth'],
          },
        ],
      },
    },
    imgproxy: {
      oneOf: [
        {
          type: 'object',
          properties: {
            disable: { type: 'boolean' },
            imagesHost: { type: 'string' },
            host: { type: 'string' },
          },
          required: ['imagesHost', 'host'],
        },
      ],
    },
  },
  required: ['breakpoints', 'imgproxy'],
  additionalProperties: false,
};
