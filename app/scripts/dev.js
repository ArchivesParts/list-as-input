'use strict';

/**
 * @ngdoc overview
 * @name listInputApp
 * @description
 * # listInputApp
 *
 * Main module of the application.
 */
angular
        .module('dev.eggListInputApp', [
            'eggListInputApp'
        ])
        .controller('MainCtrl', function ($scope)
        {
            $scope.sample1 = "super@toto.fr,greg@yahoo.com,sdfg, dsf@lkjk.fr"
            $scope.sample2 = "azert;sdfgh;sdfg;gkjfdl";
            $scope.sample3 = "greg35,truello22";
            $scope.sample4 = "35000;61100;35760"
            $scope.sample5 = "Deadpool,IronMan,SpiderCochon";

            $scope.values6 = ["Rennes", "Vitré", "Fougères", "Gévezé"];
            $scope.sample6 = "Rennes;Vitré;Fougères";
        });
