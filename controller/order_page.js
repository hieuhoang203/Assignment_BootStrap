window.order_page = function ($scope, $http, $location) {
    var email_regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;;
    var name_regex = /^[a-zA-Z ]+$/;
    var id_people_regex = /\d/;
    var phone_regex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    $scope.title = 'Register'
    $scope.people = {
        male_female: 'Male',
        courses: 'Java',
        pay: 'Offline'
    }
    var apiURL = "http://localhost:3000/peoples"
    $scope.getData = function () {
        $http.get(apiURL).then(function (response) {
            $scope.list = response.data
        })
    }
    $scope.getData()

    $scope.checkData = {
        name: true,
        id_people: true,
        email: true,
        phone_number: true,
        birth_day: true
    }

    $scope.clear = function () {
        $scope.people = {
            name: '',
            id_people: '',
            email: '',
            phone_number: '',
            male_female: 'Male',
            birth_day: null,
            courses: 'Java',
            pay: 'Offline'
        }
        $scope.editId = 0
    }

    $scope.onSubmit = function () {
        var flag = true
        if (!$scope.people || !$scope.people.name || !$scope.people.name.match(name_regex)) {
            $scope.checkData.name = false
            flag = false
        } else {
            $scope.checkData.name = true
        }
        if (!$scope.people || !$scope.people.email || !$scope.people.email.match(email_regex)) {
            $scope.checkData.email = false
            flag = false
        } else {
            $scope.checkData.email = true
        }
        if (!$scope.people || !$scope.people.phone_number || !$scope.people.phone_number.match(phone_regex)) {
            $scope.checkData.phone_number = false
            flag = false
        } else {
            $scope.checkData.phone_number = true
        }
        if (!$scope.people || $scope.people.birth_day == null) {
            $scope.checkData.birth_day = false
            flag = false
        } else {
            $scope.checkData.birth_day = true
        }
        if (!$scope.people || !$scope.people.id_people || $scope.people.id_people.toString().length != 12 || !$scope.people.id_people.match(id_people_regex)) {
            $scope.checkData.id_people = false
            flag = false
        } else {
            $scope.checkData.id_people = true
        }
        if (flag) {
            var editID = $scope.editId
            if (editID) {
                var update_item = {
                    name: $scope.people.name,
                    id_people: $scope.people.id_people,
                    email: $scope.people.email,
                    male_female: $scope.people.male_female,
                    phone_number: $scope.people.phone_number,
                    birth_day: $scope.people.birth_day,
                    courses: $scope.people.courses,
                    pay: $scope.people.pay
                }
                $http.put(`${apiURL}/${editID}`, update_item).then(
                    function (response) {
                        if (response.status == 200){
                            $location.path('order_page')
                            $scope.getData()
                        }
                    }
                )
                $scope.clear()
                return
            }
            let name = $scope.people.name
            let id_people = $scope.people.id_people
            let email = $scope.people.email
            let male_female = $scope.people.male_female
            let phone_number = $scope.people.phone_number
            let birth_day = $scope.people.birth_day
            let courses = $scope.people.courses
            let pay = $scope.people.pay
            var new_item = {
                name: name,
                id_people: id_people,
                email: email,
                male_female: male_female,
                phone_number: phone_number,
                birth_day: new Date(birth_day.toString()),
                courses: courses,
                pay: pay
            }
            $http.post(apiURL, new_item).then(
                function (response) {
                    $location.path('order_page')
                    $scope.getData()
                }
            )
            $scope.clear()
        }
    }

    $scope.onEdit = function (editID) {
        $location.path('home_page')
        $scope.editId = editID
        $http.get(`${apiURL}/${editID}`).then(
            function (response) {
                if (response.status == 200) {
                    $scope.people = {
                        name: response.data.name,
                        id_people: response.data.id_people,
                        email: response.data.email,
                        male_female: response.data.male_female,
                        phone_number: response.data.phone_number,
                        birth_day: new Date(response.data.birth_day),
                        courses: response.data.courses,
                        pay: response.data.pay
                    }
                }
            }
        )
    }

    $scope.deleting = function (editId, deleteItem) {
        $http.delete(`${apiURL}/${editId}`,deleteItem).then(
            function (response) {
                if (response.status == 200){
                    $location.path('order_page')
                    $scope.getData()
                }
            }
        )
        $scope.clear()
    }

    $scope.onDelete = function (deleteId, deleteItem) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009933',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                $scope.deleting(deleteId, deleteItem)
            }
        })
    }
}