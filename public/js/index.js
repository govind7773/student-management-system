

$("#create_user").submit(function (event) {
    alert("user added successfully!");
});

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