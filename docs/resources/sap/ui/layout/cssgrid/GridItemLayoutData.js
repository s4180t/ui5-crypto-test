/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/LayoutData","sap/ui/layout/library"],function(t){"use strict";var e={gridColumnStart:"grid-column-start",gridColumnEnd:"grid-column-end",gridRowStart:"grid-row-start",gridRowEnd:"grid-row-end",gridColumn:"grid-column",gridRow:"grid-row"};var r=t.extend("sap.ui.layout.cssgrid.GridItemLayoutData",{metadata:{library:"sap.ui.layout",interfaces:["sap.ui.layout.cssgrid.IGridItemLayoutData"],properties:{gridColumnStart:{type:"sap.ui.layout.cssgrid.CSSGridLine",defaultValue:""},gridColumnEnd:{type:"sap.ui.layout.cssgrid.CSSGridLine",defaultValue:""},gridRowStart:{type:"sap.ui.layout.cssgrid.CSSGridLine",defaultValue:""},gridRowEnd:{type:"sap.ui.layout.cssgrid.CSSGridLine",defaultValue:""},gridColumn:{type:"sap.ui.layout.cssgrid.CSSGridLine",defaultValue:""},gridRow:{type:"sap.ui.layout.cssgrid.CSSGridLine",defaultValue:""}}}});r.prototype.setItemStyles=function(t){if(!t){return}var i=this.getMetadata().getProperties();for(var a in e){if(i[a]){var u=this.getProperty(a);if(typeof u!=="undefined"){r._setItemStyle(t,e[a],u)}}}};r.removeItemStyles=function(t){for(var r in e){t.style.removeProperty(e[r])}};r._setItemStyle=function(t,e,r){if(r!=="0"&&!r){t.style.removeProperty(e)}else{t.style.setProperty(e,r)}};return r});