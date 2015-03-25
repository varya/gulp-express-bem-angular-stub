(function(app) {

    app.controller("MenuCtrl", function($scope, $location) {

        $scope.items = [
          {
            pageName: 'Main page',
            pageUrl: '/pages/main'
          },
          {
            pageName: 'Contacts',
            pageUrl: '/pages/contacts'
          }
        ];

        function setCurrent() {
            _.each($scope.items, function(item) {
                if (item.pageUrl === $location.path()) {
                    $scope.activeItem = item;
                }
            });
        }

        setCurrent();

        $scope.navigate = function(url) {
            $location.path(url);
        }
        $scope.isActive = function(id) {
            return (id === $scope.activeItem.pageId);
        }
    });

})(myApp);
