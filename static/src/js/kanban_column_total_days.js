odoo.define('kanban_column_total_days.KanbanColumnTotalDays', function (require) {
'use strict';

var utils = require('web.utils');
var KanbanColumnProgressBar = require('web.KanbanColumnProgressBar');

KanbanColumnProgressBar.include({

    init: function (parent, options, columnState) {
        this._super.apply(this, arguments);
        var daysFieldSum = 0;

        for (var i = 0; i < columnState.data.length; i++) {
            daysFieldSum += columnState.data[i].data.est_days;
        }
        this.daysField = daysFieldSum;
        var state = options.progressBarStates[this.columnID];

        if (state) {
            this.totalDaysValue = state.totalDaysValue;
        }
    },
    /**
     * @override
     */
    start: function () {
        var self = this;

        this.$counterd = this.$('.o_kanban_count_days');
        this.$numberd = this.$counterd.find('b');

        return this._super.apply(this, arguments).then(function () {
            self.prevTotalDaysValue = self.totalDaysValue || 0;
            self.totalDaysValue = self.daysField || 0;

            self._notifyState();
            self._render();
        });
        this._super.apply(this, arguments);

    },

    _render: function () {
        this._super.apply(this, arguments);
        var self = this;
        var start1 = this.prevTotalDaysValue;
        var end1 = this.totalDaysValue;
        var animationClass = start1 > 50 ? 'o_kanban_grow' : 'o_kanban_grow_huge';



        if (start1 !== undefined && end1 > start1 && this.ANIMATE) {
            $({currentValue: start1}).animate({currentValue: end1}, {
                duration: 1000,
                start: function () {
                    self.$counterd.addClass(animationClass);
                },
                step: function () {
                    self.$numberd.html(_getCounterHTML(this.currentValue));

                },
                complete: function () {
                    self.$numberd.html(_getCounterHTML(this.currentValue));
                    self.$counterd.addClass(animationClass);
                },
            });
        } else {
            this.$numberd.html(_getCounterHTML(end1));
        }



        function _getCounterHTML(value) {
            return utils.human_number(value, 0, 3);
        }
    },

    _notifyState: function () {

        this.trigger_up('set_progress_bar_state', {
            columnID: this.columnID,
            values: {
                groupCount: this.groupCount,
                subgroupCounts: this.subgroupCounts,
                totalCounterValue: this.totalCounterValue,
                totalDaysValue: this.totalDaysValue,
                activeFilter: this.activeFilter
            }
        });
    }

});

});
