/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_pick","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState","sap/ui/fl/apply/_internal/changes/Reverter"],function(e,n,r){"use strict";function t(r){var t=n.getControlChangesForVariant(Object.assign(e(r,["vmReference","variantsMap","reference"]),{vReference:r.currentVReference}));var a=n.getControlChangesForVariant(Object.assign(e(r,["vmReference","variantsMap","reference"]),{vReference:r.newVReference}));var i=Object.keys(r.changesMap).reduce(function(e,n){return e.concat(r.changesMap[n])},[]);var s=i.map(function(e){return e.getId()});var c=t.reduce(function(e,n){var r=s.indexOf(n.getId());if(r>-1){e=e.concat(i[r])}return e},[]);var o=[];if(a.length>0){o=c.slice();c.some(function(e){if(a[0]&&e.getId()===a[0].getId()){a.shift();o.shift()}else{return true}})}else{o=c}var l={changesToBeReverted:o.reverse(),changesToBeApplied:a};return l}var a={switchVariant:function(e){return Promise.resolve().then(function(){e.changesMap=e.flexController._oChangePersistence.getChangesMapForComponent().mChanges;e.variantsMap=n.getContent(e.reference);var a=t(e);return r.revertMultipleChanges(a.changesToBeReverted,e).then(e.flexController.applyVariantChanges.bind(e.flexController,a.changesToBeApplied,e.appComponent)).then(n.setCurrentVariant.bind(null,e))})}};return a});