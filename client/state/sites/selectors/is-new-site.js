/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import getSiteOption from './get-site-option';

/**
 * Returns true if the site is created less than 30 mins ago.
 * False otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Number}  siteId Site ID
 * @return {Boolean}        Whether site is newly created.
 */
export default function isNewSite( state, siteId ) {
	const createdAt = getSiteOption( state, siteId, 'created_at' );

	if ( ! createdAt ) {
		return false;
	}

	// less than 30 minutes
	return moment().diff( createdAt, 'minutes' ) < 30;
}
