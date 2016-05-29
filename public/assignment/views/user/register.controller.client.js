/**
 * Created by Abhay on 5/28/2016.
 */
/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);

    function RegisterController($location , $routeParams , UserService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.createUser = createUser;

        function createUser(username,password,vpassword) {
            if(password === vpassword)
            {
                var newUser = {
                    _id: (new Date()).getTime()+"",
                    username: username,
                    password: password
                };
                if(UserService.createUser(newUser))
                    $location.url("/user/"+newUser._id);
                else
                    vm.error = "Unable to register";
            }
            else
                vm.error = "Password doesn't match!!!"
        }
    }
})();