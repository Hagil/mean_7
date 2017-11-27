console.log('loaded frontend_app');

var frontend_app = angular.module('employees', []);
frontend_app.controller('all_employees', do_all_employees);

function do_all_employees($scope, $http) {
    $scope.read = function () {
        console.log('reading all records');
        $http.get('/api/v7/read').then(function (results) {
            console.log(results);
            $scope.employees = results.data;
        });
    }
    $scope.read();
}