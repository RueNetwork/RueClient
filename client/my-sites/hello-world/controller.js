/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import HelloWorld from 'my-sites/hello-world/main';

export const helloWorld = ( context, next ) => {
  context.primary = <HelloWorld />;
  next();
};