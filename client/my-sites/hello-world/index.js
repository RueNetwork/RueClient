/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { makeLayout, render as clientRender } from 'controller';
import { navigation, siteSelection } from 'my-sites/controller';
import { helloWorld } from './controller';

export default () => {
  page(
    '/hello-world/:domain?',
    siteSelection,
    navigation,
    helloWorld,
    makeLayout,
    clientRender
  );
};