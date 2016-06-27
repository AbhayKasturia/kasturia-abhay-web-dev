/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("PublicProfileController",PublicProfileController);

    function PublicProfileController($location , $routeParams , UserService , $rootScope,QuestionService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.uid = $routeParams.uid;
        var userId = $rootScope.currentUser._id;
        vm.ownId = false;
        vm.following = false;
        vm.follows = false;
        vm.follow = follow;
        vm.admin = false;
        var currentuser;
        vm.follow=follow;
        vm.unfollow=unfollow;
        vm.deleteUser=deleteUser;
        vm.makeUserAdmin=makeUserAdmin;


        function init() {
            vm.follows = false;
            vm.following = false;

            UserService
                .findUserByID(vm.uid)
                .then(function (response) {
                    vm.user = response.data;

                    if(vm.uid === userId)
                        vm.ownId = true;
                    else
                        vm.ownId = false;

                    for (var i in vm.user.following) {
                        if (vm.user.following[i] === userId) {
                            vm.following = true;
                        }
                        else
                            vm.following = false;
                    }

                    UserService
                        .findUserByID(userId)
                        .then(function (response) {
                            currentuser = response.data;
                            var following = currentuser.following;
                            for (var i in following) {
                                if (following[i] === vm.uid) {
                                    vm.follows = true;
                                }
                                else
                                    vm.follows = false;
                            }
                            vm.admin = currentuser.is_admin;
                            QuestionService
                                .searchQuestionByUserID(vm.uid)
                                .then(
                                    function(questions){
                                        vm.user.questions = questions.data;
                                    }
                                )
                        });
                });
        }

        init();

        function follow(){
            vm.user.followed_by.push(userId);

            UserService
                .updateUser(vm.user._id,vm.user)
                .then(
                    function(newUser){
                        if(newUser){
                            currentuser.following.push(vm.uid);
                            UserService
                                .updateUser(currentuser._id,currentuser)
                                .then(
                                    function(stats){
                                        if(stats){
                                            init();
                                            vm.success="You are now following this user";
                                        }
                                        else
                                            vm. error = "Something went wrong please try again";
                                    }
                                );
                        }
                        else
                            vm. error = "Something went wrong please try again";
                    },function(err){
                        vm. error = "Something went wrong please try again";
                    }
                );
        }

        function unfollow(){

            for (var i in vm.user.followed_by) {
                if(vm.user.followed_by[i] === userId)
                    vm.user.followed_by.splice(i,1);
            }


            UserService
                .updateUser(vm.user._id,vm.user)
                .then(
                    function(newUser){
                        if(newUser){

                            for (var i in currentuser.following) {
                                if(currentuser.following[i] === vm.uid)
                                    currentuser.following.splice(i,1);
                            }

                            UserService
                                .updateUser(currentuser._id,currentuser)
                                .then(
                                    function(stats){
                                        if(stats){
                                            init();
                                            vm.success="You are now following this user";
                                        }
                                        else
                                            vm. error = "Something went wrong please try again";
                                    }
                                );
                        }
                        else
                            vm. error = "Something went wrong please try again";
                    },function(err){
                        vm. error = "Something went wrong please try again";
                    }
                );
        }

        function deleteUser(){
            UserService
                .deleteUser(vm.uid)
                .then(
                    function(response){
                        $location.url("/user/"+userId+"/admin/user");
                    },function(err){
                        vm. error = "Something went wrong please try again";
                    }
                );
        }

        function makeUserAdmin(){
            if(vm.user.is_admin){
                vm.error="User is already an Admin";
            }
            else{
                vm.user.is_admin=true;


                UserService
                    .updateUser(vm.uid,vm.user)
                    .then(
                        function(response){
                            $location.url("/user/"+userId+"/admin/user");
                        },function(err){
                            vm. error = "Something went wrong please try again";
                        }
                    );
            }
        }


    }})();