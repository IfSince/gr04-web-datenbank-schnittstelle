app.controller( 'homeController',
                ['$scope', '$rootScope', '$cookies', '$http', function($scope, $rootScope, $cookies, $http) {

    //define route and default variables
    const route = 'http://localhost:5000/api/item/list';
    var limit = { limit: 10 };

    $scope.spinner = true;

    //Backend Request
    $http.post(route, {headers: {'Content-Type': 'application/json;charset=UTF-8'},
                       data: limit})
        .then(function successCallback(response) {
            $scope.items = response.data;
            $scope.spinner = false; //when content is loaded set spinner to false
        }, function errorCallback(response) {
            console.log(response.data);
            alert('In der API ist ein Fehler aufgetreten.');
        });

    //function to add an item to the cart
    $scope.addItem = function(item_id, item_name, count, price) {
        $rootScope.cart.push({id: item_id, name: item_name, count: count, price});
        console.log($rootScope.cart);

        if ($cookies.getObject('user') ) {
            $cookies.putObject('cart', $rootScope.cart);
        }
    }

}])