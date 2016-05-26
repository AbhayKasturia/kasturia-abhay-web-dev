/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);   /*service and factory method for singleton - same thing but syntax different*/


    var users =
        [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

    function UserService() {
        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserByID: findUserbyID,
            updateUser: updateUser,
            createUser: createUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(newUser) {
            users.push(newUser);
        }

        function deleteUser(id) {
            for (var i in users) {
                if (users[i]._id === id)
                {
                    return 1;
                }
            }
        }

        function updateUser(id,newUser) {
            for (var i in users) {
                if (users[i]._id === id)
                {
                    users[i]=newUser;
                    return 1;
                }
                //$location.url("/profile/"+users[i]._id);
                /*else
                 vm.error = "User not found";*/
            }
            return 0;
        }

        function findUserbyID(id) {
            for (var i in users) {
                if (users[i]._id === id)
                    return users[i];
                //$location.url("/profile/"+users[i]._id);
                /*else
                 vm.error = "User not found";*/
            }
            return null;
        }

        function findUserByUsernameAndPassword(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password)
                    return users[i];
                //$location.url("/profile/"+users[i]._id);
                /*else
                 vm.error = "User not found";*/
            }
            return null;
        }
    }
})();