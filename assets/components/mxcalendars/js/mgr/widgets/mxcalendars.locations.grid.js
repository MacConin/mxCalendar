mxcCore.grid.locations = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'mxcalendars-grid-locations'
        ,url: mxcCore.config.connectorUrl
        ,baseParams: { action: 'mgr/location/getList' }
        ,fields: ['id','isdefault','name','zip','place','link','foregroundcss','backgroundcss','inlinecss','disable','active','menu']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/location/updatefromgrid' // Support the inline editing
	,autosave: true // Support the inline editing
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
        },{
            header: _('mxcalendars.location_isdefault_col_label')
            ,dataIndex: 'isdefault'
            ,sortable: true
            ,editor: { xtype: 'modx-combo-boolean', renderer: true}
        },{
            header: _('mxcalendars.location_name_col_label')
            ,dataIndex: 'name'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },{
            header: _('mxcalendars.location_zip_col_label')
            ,dataIndex: 'zip'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },{
            header: _('mxcalendars.location_place_col_label')
            ,dataIndex: 'place'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },{
            header: _('mxcalendars.location_link_col_label')
            ,dataIndex: 'link'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },/*{
            header: _('mxcalendars.location_foregroundcss_col_label')
            ,dataIndex: 'foregroundcss'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },{
            header: _('mxcalendars.location_backgroundcss_col_label')
            ,dataIndex: 'backgroundcss'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },{
            header: _('mxcalendars.location_inlinecss_col_label')
            ,dataIndex: 'inline'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        },*/{
            header: _('mxcalendars.location_disabled_col_label')
            ,dataIndex: 'disable'
            ,sortable: true
            ,editor: { xtype: 'modx-combo-boolean', renderer: true}
        },{
            header: _('mxcalendars.location_active_col_label')
            ,dataIndex: 'active'
            ,sortable: true
            ,editor: { xtype: 'modx-combo-boolean', renderer: true}
        }],tbar:[{
			xtype: 'textfield'
			,id: 'mxcalendars-search-locations-filter'
			,emptyText:_('mxcalendars.default_location_search')
			,listeners: {
				'change': {fn:this.search,scope:this}
				,'render': {fn: function(cmp) {
					new Ext.KeyMap(cmp.getEl(), {
						key: Ext.EventObject.ENTER
						,fn: function() {
							this.fireEvent('change',this);
							this.blur();
							return true;
						}
						,scope: cmp
					});
				},scope:this}
			}
		},'->',{
		   text:_('mxcalendars.btn_create_loc')
		   ,handler: { xtype: 'mxcalendars-window-location-create' ,blankValues: true }
		}]
    });
    mxcCore.grid.locations.superclass.constructor.call(this,config)
};
Ext.extend(mxcCore.grid.locations,MODx.grid.Grid,{
    search: function(tf,nv,ov) {textfield
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
		var m = [{
			text: _('mxcalendars.menu_update_location')
			,handler: this.updateLoc
		},'-',{
			text: _('mxcalendars.menu_remove_location')
			,handler: this.removeLoc
		}];
		this.addContextMenuItem(m);
		return true;
	},updateLoc: function(btn,e) {
		if (!this.updateLocWindow) {
			this.updateLocWindow = MODx.load({
				xtype: 'mxcalendars-window-location-update'
				,record: this.menu.record
				,listeners: {
					'success': {fn:this.refresh,scope:this}
				}
			});
		} else {
			this.updateLocWindow.setValues(this.menu.record);
		}
		this.updateLocWindow.show(e.target);
	},removeLoc: function() {
		MODx.msg.confirm({
		    title: _('mxcalendars.location_remove_title')
		    ,text: _('mxcalendars.location_remove_confirm')
		    ,url: this.config.url
		    ,params: {
		        action: 'mgr/location/remove'
		        ,id: this.menu.record.id
		    }
		    ,listeners: {
		        'success': {fn:this.refresh,scope:this}
		    }
		});
	}
});
Ext.reg('mxcalendars-grid-locations',mxcCore.grid.locations);


//---------------------------------------//
//-- Create the Update Location Window --//
//---------------------------------------//
mxcCore.window.UpdateLoc = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: ''+_('mxcalendars.label_window_create')
        ,url: mxcCore.config.connectorUrl
        ,width: 'auto'
        ,baseParams: {
            action: 'mgr/location/update'
        }
        ,fields: [{xtype:'hidden',name:'id'},{
            xtype: 'textfield'
            ,fieldLabel:_('mxcalendars.location_name_col_label')
            ,name: 'name'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_zip_col_label')
            ,name: 'zip'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_place_col_label')
            ,name: 'place'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_link_col_label')
            ,name: 'link'
        },{
            xtype: 'checkbox'
            ,fieldLabel: _('mxcalendars.location_isdefault_col_label')
            ,name: 'isdefault'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_foregroundcss_col_label')
            ,name: 'foregroundcss'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_backgroundcss_col_label')
            ,name: 'backgroundcss'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_inlinecss_col_label')
            ,name: 'inlinecss'
        },{
            xtype: 'checkbox'
            ,fieldLabel: _('mxcalendars.location_disabled_col_label')
            ,name: 'disable'
            ,checked: false
            ,value: 1
        },{
            xtype: 'checkbox'
            ,fieldLabel: _('mxcalendars.location_active_col_label')
            ,name: 'active'
            ,checked: true
            ,value: 1
        }]
    });
    mxcCore.window.UpdateLoc.superclass.constructor.call(this,config);
};
Ext.extend(mxcCore.window.UpdateLoc,MODx.Window);
Ext.reg('mxcalendars-window-location-update',mxcCore.window.UpdateLoc);


//-------------------------------------------//
//-- Create the object for th new location --//
//-------------------------------------------//
mxcCore.window.CreateLoc = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: ''+_('mxcalendars.label_window_create')
        ,url: mxcCore.config.connectorUrl
        ,width: 'auto'
        ,baseParams: {
            action: 'mgr/location/create'
        }
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel:_('mxcalendars.location_name_col_label')
            ,name: 'name'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_zip_col_label')
            ,name: 'zip'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_place_col_label')
            ,name: 'place'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_link_col_label')
            ,name: 'link'
        },{
            xtype: 'checkbox'
            ,fieldLabel: _('mxcalendars.location_isdefault_col_label')
            ,name: 'isdefault'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_foregroundcss_col_label')
            ,name: 'foregroundcss'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_backgroundcss_col_label')
            ,name: 'backgroundcss'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('mxcalendars.location_inlinecss_col_label')
            ,name: 'inlinecss'
        },{
            xtype: 'checkbox'
            ,fieldLabel: _('mxcalendars.location_disabled_col_label')
            ,name: 'disable'
            ,checked: false
            ,value: 1
        },{
            xtype: 'checkbox'
            ,fieldLabel: _('mxcalendars.location_active_col_label')
            ,name: 'active'
            ,checked: true
            ,value: 1
        }]
    });
    mxcCore.window.CreateLoc.superclass.constructor.call(this,config);
};
Ext.extend(mxcCore.window.CreateLoc,MODx.Window);
Ext.reg('mxcalendars-window-location-create',mxcCore.window.CreateLoc);
