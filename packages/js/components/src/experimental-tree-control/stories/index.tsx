/**
 * External dependencies
 */
import interpolate from '@automattic/interpolate-components';
import { BaseControl, TextControl } from '@wordpress/components';
import React, { createElement, useCallback, useState } from 'react';

/**
 * Internal dependencies
 */
import { TreeControl } from '../tree-control';
import { Item, LinkedTree } from '../types';

const listItems: Item[] = [
	{ value: '1', label: 'Technology' },
	{ value: '1.1', label: 'Notebooks', parent: '1' },
	{ value: '1.2', label: 'Phones', parent: '1' },
	{ value: '1.2.1', label: 'iPhone', parent: '1.2' },
	{ value: '1.2.1.1', label: 'iPhone 14 Pro', parent: '1.2.1' },
	{ value: '1.2.1.2', label: 'iPhone 14 Pro Max', parent: '1.2.1' },
	{ value: '1.2.2', label: 'Samsung', parent: '1.2' },
	{ value: '1.2.2.1', label: 'Samsung Galaxy 22 Plus', parent: '1.2.2' },
	{ value: '1.2.2.2', label: 'Samsung Galaxy 22 Ultra', parent: '1.2.2' },
	{ value: '1.3', label: 'Wearables', parent: '1' },
	{ value: '2', label: 'Hardware' },
	{ value: '2.1', label: 'CPU', parent: '2' },
	{ value: '2.2', label: 'GPU', parent: '2' },
	{ value: '2.3', label: 'Memory RAM', parent: '2' },
	{ value: '3', label: 'Other' },
];

export const SimpleTree: React.FC = () => {
	return (
		<BaseControl label="Simple tree" id="simple-tree">
			<TreeControl id="simple-tree" items={ listItems } />
		</BaseControl>
	);
};

function isItemExpanded( item: LinkedTree, text: string ) {
	if ( ! text || ! item.children?.length ) return false;
	return item.children.some( ( child ) => {
		if ( new RegExp( text, 'ig' ).test( child.data.label ) ) {
			return true;
		}
		return isItemExpanded( child, text );
	} );
}

export const ExpandOnSearch: React.FC = () => {
	const [ text, setText ] = useState( '' );

	return (
		<>
			<TextControl value={ text } onChange={ setText } />
			<BaseControl label="Expand on search" id="expand-on-search">
				<TreeControl
					id="expand-on-search"
					items={ listItems }
					isItemExpanded={ useCallback(
						( item ) => isItemExpanded( item, text ),
						[ text ]
					) }
				/>
			</BaseControl>
		</>
	);
};

export const CustomItemLabel: React.FC = () => {
	function renderCustomItemLabel( item: LinkedTree ) {
		return (
			<div style={ { display: 'flex', gap: 8 } }>
				<div
					style={ {
						width: 36,
						height: 36,
						backgroundColor: '#ccc',
						borderRadius: 2,
					} }
				/>
				<div
					style={ {
						display: 'flex',
						flexDirection: 'column',
					} }
				>
					<strong>{ item.data.label }</strong>
					<small>Some item description</small>
				</div>
			</div>
		);
	}

	return (
		<BaseControl label="Custom item label" id="custom-item-label">
			<TreeControl
				id="custom-item-label"
				items={ listItems }
				getItemLabel={ renderCustomItemLabel }
			/>
		</BaseControl>
	);
};

function getItemLabel( item: LinkedTree, text: string ) {
	return (
		<span>
			{ text
				? interpolate( {
						mixedString: item.data.label.replace(
							new RegExp( text, 'ig' ),
							( group ) => `{{bold}}${ group }{{/bold}}`
						),
						components: {
							bold: <b />,
						},
				  } )
				: item.data.label }
		</span>
	);
}

export const CustomItemLabelOnSearch: React.FC = () => {
	const [ text, setText ] = useState( '' );

	return (
		<>
			<TextControl value={ text } onChange={ setText } />
			<BaseControl
				label="Custom item label on search"
				id="custom-item-label-on-search"
			>
				<TreeControl
					id="custom-item-label-on-search"
					items={ listItems }
					getItemLabel={ ( item ) => getItemLabel( item, text ) }
					isItemExpanded={ useCallback(
						( item ) => isItemExpanded( item, text ),
						[ text ]
					) }
				/>
			</BaseControl>
		</>
	);
};

export default {
	title: 'WooCommerce Admin/experimental/TreeControl',
	component: TreeControl,
};