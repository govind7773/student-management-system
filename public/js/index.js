

$("#create_user").submit(function (event) {
    alert("user added successfully!");
});


$("#update_user").submit(function (event) {

    event.preventDefault();
    // will store all data on submit the form
    var unindexed_array = $(this).serializeArray(); //this method will return serialize array of data
    var data = {} // create a empty object to store the data
    $.map(unindexed_array, function (n, l) {
        data[n['name']] = n['value']  // storing data in data array
    })
    console.log(data);
    var request = {
        "url": `http://localhost:8000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    } // creating request variable for ajx request

    $.ajax(request).done(function (response) {
        alert("data updated of student successfully !")
    })

})


if (window.location.pathname == "/") {
    $ondelete = $('.table tbody td a.delete');
    $ondelete.click(function () {
        var id = $(this).attr('btn-data');

        var request = {
            "url": `http://localhost:8000/api/users/${id}`,
            "method": "DELETE"
        }
        if (confirm("do you really want to delete the record?")) {
            $.ajax(request).done(function (response) {
                alert("data deleted successfully!");
                location.reload();
            })
        }
    })
}