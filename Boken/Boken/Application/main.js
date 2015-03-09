$(function () {
    $(document).on("click", "header #loginButton", function () {
       
        showModal($(this));
    });
});

//function to display a bootstrap modal
function showModal(clickedBtn) {
    $("body > .modal").modal("show");
}
