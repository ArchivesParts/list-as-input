'use strict';

/**
 * @ngdoc function
 * @name listInputApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listInputApp
 */
angular.module('listInputApp')
        .controller('MainCtrl', function ($scope)
        {
            $scope.emails = "super@toto.fr,greg@yahoo.com,sdfg, dsf@lkjk.fr"
            $scope.counter = "azert;sdfgh;sdfg;gkjfdl";
        })
        .directive('listAsInput', function ()
        {
            function liController($scope)
            {
                var self = this;
                self.entry = "";
                self.pattern =
                        "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]{1,5})?)$"
                self.name = "li-" + Math.floor(Math.random() * 999999999);
                self.validList = [];

                //Validate input
                self.isValid = function (absolute)
                {
                    absolute = absolute || false;
                    var status = (!absolute && self.entry.length === 0) || self.pattern.test(self.entry);
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
                controller.input = element;
                controller.name = attrs.name || controller.name;
                controller.pattern = new RegExp(attrs.pattern || controller.pattern, 'i');
                controller.placeholder = attrs.placeholder;
                controller.label = attrs.label;

                controller.endKey = (attrs.endKey || ",");
                var endKeyCode = controller.endKey.charCodeAt(0)

                //Extract initial content from ngModel
                controller.entry = "";
                var tmpEntries = scope.ngModel.split(controller.endKey);
                tmpEntries.forEach(function (entry)
                {
                    console.log(entry);
                    entry = entry.trim();
                    if (controller.pattern.test(entry)) {
                        controller.validList.push(entry);
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
                },
                link: link,
                replace: true,
                controller: liController,
                controllerAs: "ctl"

            }
        });
