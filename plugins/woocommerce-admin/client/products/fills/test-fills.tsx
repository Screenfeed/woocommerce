/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import {
	__experimentalWooProductTabItem as WooProductTabItem,
	__experimentalWooProductSectionItem as WooProductSectionItem,
	__experimentalProductSectionLayout as ProductSectionLayout,
	__experimentalWooProductFieldItem as WooProductFieldItem,
} from '@woocommerce/components';
import { Card, CardBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { TAB_GENERAL_ID, PLUGIN_ID } from './constants';

const TestFills = () => {
	return (
		<>
			<WooProductTabItem
				id="tab/test"
				templates={ [ { name: 'tab/variation', order: 232 } ] }
				pluginId={ PLUGIN_ID }
				tabProps={ { name: 'test_tab', title: 'Test Tab' } }
			>
				<WooProductSectionItem.Slot tab="tab/test" />
			</WooProductTabItem>
			<WooProductSectionItem
				id="tab/test"
				tabs={ [ { name: 'tab/test', order: 1 } ] }
				pluginId={ PLUGIN_ID }
			>
				<ProductSectionLayout
					title={ __( 'Test section', 'woocommerce' ) }
					description={ __(
						'This info will be displayed on the product page, category pages, social media, and search results.',
						'woocommerce'
					) }
				>
					<Card>
						<CardBody>
							<WooProductFieldItem.Slot
								section={ 'section/test' }
							/>
						</CardBody>
					</Card>
				</ProductSectionLayout>
			</WooProductSectionItem>
			<WooProductFieldItem
				id="field/test"
				sections={ [ { name: 'section/test', order: 1 } ] }
				pluginId={ PLUGIN_ID }
			>
				<div>Test field</div>
			</WooProductFieldItem>
			<WooProductFieldItem
				id="field/test"
				sections={ [ { name: 'shipping/dimensions', order: 20 } ] }
				pluginId={ PLUGIN_ID }
			>
				<div>Test field</div>
			</WooProductFieldItem>
		</>
	);
};

registerPlugin( 'wc-admin-product-editor-form-tab-testfills', {
	// @ts-expect-error 'scope' does exist. @types/wordpress__plugins is outdated.
	scope: 'woocommerce-product-editor',
	render: () => {
		return <TestFills />;
	},
} );
