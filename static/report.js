let getUsers = () => {
    axios.get('/users')
    .then(function (response) {
        // handle success
        $('#table').bootstrapTable({
            data: response.data
        });
    })
    .catch(function (error) {
        console.log(error);
        $('#table').hide();
        $('#error-section').show();
    })
}

function dateFormat(value, row, index) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
}