/**
 * CRUDPanel
 *
 * Part of BlueSpice for MediaWiki
 *
 * @author     Robert Vogel <vogel@hallowelt.com>
 * @author     Stephan Muggli <muggli@hallowelt.com>
 * @package    Bluespice_Extensions
 * @subpackage Foundation
 * @copyright  Copyright (C) 2016 Hallo Welt! GmbH, All rights reserved.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU Public License v2 or later
 * @filesource
 */
/*jshint -W024 */

Ext.define( 'BS.CRUDPanel', {
	extend: 'Ext.Panel',
	requires: [ 'Ext.Toolbar', 'Ext.Button' ],
	border: false,
	hideBorder: true,

	operationPermissions : {
        "create": true, //should be connected to mw.config.get('bsTaskAPIPermissions').extension_xyz.task1 = boolean in derived class
        "update": true, //...
        "delete": true  //...
    },

	tbarHeight: 44,

	constructor: function() {
		//Custom Settings
		this.currentData = {};
		this.callParent(arguments);
	},

	initComponent: function() {
		this.tbar = this.makeTbar();
		this.items = this.makeItems();

		$(document).trigger('BSCRUDPanelInitComponent', [this] );

		this.afterInitComponent( arguments );

		this.callParent(arguments);
	},

	makeItems: function() {
		return [];
	},

	makeTbar: function() {
		return new Ext.Toolbar({
			style: {
				backgroundColor: '#FFFFFF',
				backgroundImage: 'none'
			},
			items: this.makeTbarItems()
		});
	},

	makeTbarItems: function() {
		var arrItems = [];
		if( this.opPermitted( 'create' ) ) {
			this.btnAdd = new Ext.Button({
				id: this.getId()+'-btn-add',
				icon: mw.config.get( 'wgScriptPath') + '/extensions/BlueSpiceFoundation/resources/bluespice/images/bs-m_add.png',
				iconCls: 'btn'+this.tbarHeight,
				tooltip: mw.message('bs-extjs-add').plain(),
				height: 50,
				width: 52
			});
			this.btnAdd.on( 'click', this.onBtnAddClick, this );
			this.addEvents( 'button-add','button-edit','button-delete' );
			arrItems.push( this.btnAdd );
		}

		if( this.opPermitted( 'update' )) {
			this.btnEdit = new Ext.Button({
				id: this.getId()+'-btn-edit',
				icon: mw.config.get( 'wgScriptPath') + '/extensions/BlueSpiceFoundation/resources/bluespice/images/bs-um_config.png',
				iconCls: 'btn'+this.tbarHeight,
				tooltip: mw.message('bs-extjs-edit').plain(),
				height: 50,
				width: 52,
				disabled: true
			});
			this.btnEdit.on( 'click', this.onBtnEditClick, this );
			this.addEvents( 'button-add','button-edit','button-delete' );
			arrItems.push( this.btnEdit );
		}

		if( this.opPermitted( 'delete' ) ) {
			this.btnRemove = new Ext.Button({
				id: this.getId()+'-btn-remove',
				icon: mw.config.get( 'wgScriptPath') + '/extensions/BlueSpiceFoundation/resources/bluespice/images/bs-m_delete.png',
				iconCls: 'btn'+this.tbarHeight,
				tooltip: mw.message('bs-extjs-remove').plain(),
				height: 50,
				width: 52,
				disabled: true
			});
			this.btnRemove.on( 'click', this.onBtnRemoveClick, this );
			this.addEvents( 'button-add','button-edit','button-delete' );
			arrItems.push(this.btnRemove);
		}

		return arrItems;
	},

	afterInitComponent: function( arguments ) {
		//This get's overridden by subclasses to add subcomponents
	},

	onBtnAddClick: function( oButton, oEvent ) {
		this.fireEvent( 'button-add', this, this.getData() );
	},

	onBtnEditClick: function(  oButton, oEvent  ) {
		this.fireEvent( 'button-edit', this, this.getData() );
	},

	onBtnRemoveClick: function( oButton, oEvent ) {
		this.fireEvent( 'button-delete', this, this.getData() );
	},

	getData: function() {
		return this.currentData;
	},

	setData: function( obj ) {
		this.currentData = obj;
	},
	//return boolean if param exists, otherwise null
	opPermitted: function ( operation ) {
		switch( operation ) {
			case 'create':
				return this.operationPermissions.create;
			case 'update':
				return this.operationPermissions.update;
			case 'delete':
				return this.operationPermissions.delete;
			default:
				return null;
		}

	}
});