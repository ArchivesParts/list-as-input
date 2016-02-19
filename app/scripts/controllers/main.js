'use strict';

/**
 * @ngdoc function
 * @name listInputApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listInputApp
 */
angular.module('eggListInputApp')
        .directive('eggListAsInput', function ()
        {
            function liController($scope)
            {
                var self = this;
                self.entry = "";
                self.pattern = "^.*$"

                self.name = "li-" + Math.floor(Math.random() * 999999999);
                self.validList = [];
                self.model = undefined;

                //Validate input
                self.isValid = function (absolute)
                {
                    absolute = absolute || false;
                    var status = false;
                    if (self.values) {
                        if (!absolute && self.entry.length === 0) {
                            status = true;
                        } else {
                            angular.forEach(self.values, function (value)
                            {
                                status = status || (self.entry === value);
                            })
                        }
                    } else {
                        status = (!absolute && self.entry.length === 0) || self.pattern.test(self.entry);

                    }
                    return status;
                }

                //Reload valid entry in input field
                self.restoreEntry = function (index)
                {
                    self.entry = self.validList[index];
                    self.refreshModel();
                }

                //Remove entry from valid list by index
                self.removeEntry = function (index)
                {
                    self.validList.splice(index, 1);
                    self.refreshModel();
                }

                //Refresh model
                self.refreshModel = function ()
                {
                    $scope.ngModel = self.validList.join(self.endKey);
                }

            }

            function link(scope, element, attrs, controller)
            {

                var expression = attrs.eggListAsInput;

                var patternMatch = expression.match(/match='([^']*)'|match="([^"]*)"/i);
                var endWithMatch = expression.match(/end-with='([^']*)'|end-with="([^"]*)"/i);
                var pattern = (patternMatch && (patternMatch[1] || patternMatch[2])) || attrs.eggPattern;
                var endWith = endWithMatch && (endWithMatch[1] || endWithMatch[2]) || attrs.eggEndWith;

                controller.pattern = new RegExp(pattern || controller.pattern, 'i');
                controller.endKey = (endWith || ";");
                controller.input = element;
                controller.values = scope.eggValues;
                controller.name = attrs.name || controller.name;
                controller.placeholder = attrs.placeholder;
                controller.label = attrs.label;

                var endKeyCode = controller.endKey.charCodeAt(0)

                //Extract initial content from ngModel
                controller.entry = "";
                var tmpEntries = scope.ngModel.split(controller.endKey);
                tmpEntries.forEach(function (entry)
                {
                    controller.entry = entry.trim();
                    if (controller.isValid(true)) {
                        controller.validList.push(entry);
                        controller.entry = '';
                    } else {
                        controller.entry = entry;
                    }
                });

                controller.refreshModel();

                // Bind keypress on ENTER and custom key
                element.bind("keypress", function (event)
                {
                    if ((event.which === 13 || event.which === endKeyCode) && controller.isValid(true)) {
                        scope.$apply(function ()
                        {
                            controller.validList.push(controller.entry);
                            controller.entry = '';
                            controller.refreshModel();
                        });
                        event.preventDefault();
                        return
                    }
                });

            }

            return {
                templateUrl: 'views/directive.html',
                restrict: 'AE',
                scope: {
                    ngModel: "=",
                    eggValues: "=?",
                },
                link: link,
                replace: true,
                controller: liController,
                controllerAs: "ctl"

            }
        });
