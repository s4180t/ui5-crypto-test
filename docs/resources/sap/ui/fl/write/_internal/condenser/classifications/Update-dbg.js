/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
], function(

) {
	"use strict";

	return {
		/**
		 * Adds a Update change to the map with reduced changes.
		 * The last Update change always wins, so all others can be deleted.
		 *
		 * @param {Map} mProperties - Map with all reduced changes
		 * @param {string} oCondenserInfo - Condenser information
		 * @param {sap.ui.fl.apply._internal.flexObjects.FlexObject} oChange - Change instance
		 */
		addToChangesMap: function(mProperties, oCondenserInfo, oChange) {
			if (!mProperties[oCondenserInfo.uniqueKey]) {
				oCondenserInfo.change = oChange;
				mProperties[oCondenserInfo.uniqueKey] = oCondenserInfo;
				oChange.condenserState = "select";
			} else {
				oChange.condenserState = "delete";
			}
		}
	};
});