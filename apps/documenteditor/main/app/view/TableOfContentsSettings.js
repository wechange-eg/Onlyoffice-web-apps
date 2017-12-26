/*
 *
 * (c) Copyright Ascensio System Limited 2010-2017
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia,
 * EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

/**
 *  TableOfContentsSettings.js.js
 *
 *  Created by Julia Radzhabova on 26.12.2017
 *  Copyright (c) 2017 Ascensio System SIA. All rights reserved.
 *
 */

define([
    'common/main/lib/util/utils',
    'common/main/lib/component/MetricSpinner',
    'common/main/lib/component/ComboBox',
    'common/main/lib/view/AdvancedSettingsWindow'
], function () { 'use strict';

    DE.Views.TableOfContentsSettings = Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            contentWidth: 500,
            height: 380
        },

        initialize : function(options) {
            var me = this;

            _.extend(this.options, {
                title: this.textTitle,
                template: [
                    '<div class="box" style="height:' + (me.options.height - 85) + 'px;">',
                        '<div class="content-panel" style="padding: 15px 10px;"><div class="inner-content">',
                            '<div class="settings-panel active">',
                                '<table cols="2" style="width: 100%;">',
                                    '<tr>',
                                        '<td class="padding-small">',
                                        '<div id="tableofcontents-chb-pages"></div>',
                                        '</td>',
                                        '<td rowspan="6" class="padding-small" style="vertical-align: top;">',
                                        '<div style="border: 1px solid #cbcbcb;width: 215px; height: 197px; float: right;">',
                                            '<div id="tableofcontents-img" style="width: 100%; height: 100%;"></div>',
                                        '</div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<div id="tableofcontents-chb-align"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-large">',
                                            '<label class="input-label">' + me.textLeader + '</label>',
                                            '<div id="tableofcontents-combo-leader" class="input-group-nr" style="display: inline-block; width:95px; margin-left: 10px;"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<div id="tableofcontents-chb-links"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-large">',
                                            '<div id="tableofcontents-chb-underline"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-large">',
                                            '<label class="input-label padding-small" style="display: block;">' + me.textBuildTable + '</label>',
                                            '<div id="tableofcontents-radio-styles" class="padding-small" style="display: block;"></div>',
                                            '<div id="tableofcontents-radio-levels" class="padding-small" style="display: block;"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<label class="input-label padding-small">' + me.textLevels + '</label>',
                                            '<div id="tableofcontents-spin-levels" style="display: inline-block; width:95px; margin-left: 10px;"></div>',
                                        '</td>',
                                        '<td class="padding-small">',
                                            '<label class="input-label padding-small">' + me.textStyles + '</label>',
                                            '<div id="tableofcontents-combo-styles" class="input-group-nr" style="display: inline-block; width:95px; margin-left: 10px;"></div>',
                                        '</td>',
                                    '</tr>',
                                '</table>',
                            '</div></div>',
                        '</div>',
                    '</div>',
                    '<div class="separator horizontal"/>',
                    '<div class="footer center">',
                    '<button class="btn normal dlg-btn primary" result="ok" style="margin-right: 10px;  width: 86px;">' + me.okButtonText + '</button>',
                    '<button class="btn normal dlg-btn" result="cancel" style="width: 86px;">' + me.cancelButtonText + '</button>',
                    '</div>'
                ].join('')
            }, options);

            this.api        = options.api;
            this.handler    = options.handler;
            this.props      = options.props;

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.chPages = new Common.UI.CheckBox({
                el: $('#tableofcontents-chb-pages'),
                labelText: this.strShowPages,
                value: 'checked'
            });
            this.chPages.on('change', _.bind(function(field, newValue, oldValue, eOpts){
                this.chAlign.setDisabled(field.getValue()!=='checked');
                this.cmbLeader.setDisabled(field.getValue()!=='checked');
                if (this._changedProps) {
                }
            }, this));

            this.chAlign = new Common.UI.CheckBox({
                el: $('#tableofcontents-chb-align'),
                labelText: this.strAlign,
                value: 'checked'
            });
            // this.chAlign.on('change', _.bind(this.onAlignChange, this));

            this.cmbLeader = new Common.UI.ComboBox({
                el          : $('#tableofcontents-combo-leader'),
                style       : 'width: 85px;',
                menuStyle   : 'min-width: 85px;',
                editable    : false,
                cls         : 'input-group-nr',
                data        : [
                    { value: Asc.c_oAscTabLeader.None,      displayValue: this.textNone },
                    { value: Asc.c_oAscTabLeader.Dot,       displayValue: '....................' },
                    { value: Asc.c_oAscTabLeader.Hyphen,    displayValue: '-----------------' },
                    { value: Asc.c_oAscTabLeader.Underscore,displayValue: '__________' }
                ]
            });
            this.cmbLeader.setValue(Asc.c_oAscTabLeader.None);

            this.chLinks = new Common.UI.CheckBox({
                el: $('#tableofcontents-chb-links'),
                labelText: this.strLinks
            });
            this.chLinks.on('change', _.bind(function(field, newValue, oldValue, eOpts){
                this.chUnderline.setDisabled(field.getValue()!=='checked');
                if (this._changedProps) {
                }
            }, this));

            this.chUnderline = new Common.UI.CheckBox({
                el: $('#tableofcontents-chb-underline'),
                labelText: this.strUnderline,
                disabled: true
            });

            this.radioLevels = new Common.UI.RadioBox({
                el: $('#tableofcontents-radio-levels'),
                labelText: this.textRadioLevels,
                name: 'asc-radio-content-build',
                checked: true
            });

            this.radioStyles = new Common.UI.RadioBox({
                el: $('#tableofcontents-radio-styles'),
                labelText: this.textRadioStyles,
                name: 'asc-radio-content-build'
            });

            this.cmbStyles = new Common.UI.ComboBox({
                el: $('#tableofcontents-combo-styles'),
                cls: 'input-group-nr',
                menuStyle: 'min-width: 150px;',
                editable: false,
                data: [
                    { displayValue: this.txtCurrent,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtSimple,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtStandard,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtModern,     value: Asc.c_oAscNumberingFormat.Decimal },
                    { displayValue: this.txtClassic,     value: Asc.c_oAscNumberingFormat.Decimal }
                ]
            });
            // this.cmbStyles.setValue();
            // this.cmbStyles.on('selected', _.bind(this.onStylesSelect, this));

            this.spnLevels = new Common.UI.CustomSpinner({
                el: $('#tableofcontents-spin-levels'),
                step: 1,
                width: 85,
                defaultUnit : "",
                value: 4,
                maxValue: 9,
                minValue: 1,
                allowDecimal: false,
                maskExp: /[1-9]/
            });
            this.spnLevels.on('change', _.bind(function(field, newValue, oldValue, eOpts){
                if (this._changedProps) {
                    // this._changedProps.get_Ind().put_FirstLine(Common.Utils.Metric.fnRecalcToMM(field.getNumberValue()));
                }
            }, this));


            this.afterRender();
        },

        afterRender: function() {
            this._setDefaults(this.props);
        },

        show: function() {
            Common.Views.AdvancedSettingsWindow.prototype.show.apply(this, arguments);
        },

        _setDefaults: function (props) {
            if (props) {
            }
            // this._changedProps = new Asc.asc_CParagraphProperty();
        },

        getSettings: function () {
            var props;
            return props;
        },

        textTitle:  'Table of Contents',
        textLeader: 'Leader',
        textBuildTable: 'Build table of contents from',
        textLevels: 'Levels',
        textStyles: 'Styles',
        strShowPages: 'Show page numbers',
        strAlign: 'Right align page numbers',
        strLinks: 'Use hyperlinks instead of page numbers',
        strUnderline: 'Underline hyperlinks',
        textNone: 'None',
        textRadioLevels: 'Outline levels',
        textRadioStyles: 'Selected styles',
        cancelButtonText: 'Cancel',
        okButtonText    : 'Ok'

    }, DE.Views.TableOfContentsSettings || {}))
});