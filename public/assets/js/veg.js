$(function(){
    console.log("Start Eat Your Veggies")
    $(".change-state").on("click", function(event){
        event.preventDefault();
        // Change the state from to eaten
        const id = $(this).data("id")
        const veg_state = $(this).data("veg_state")

        if (veg_state === 0){
            $.ajax("/api/veg/eat/" + id, {
                type: "PUT",
            }).then(
                function(){
                    // Reload the page to get the updated list
                    location.reload()
                }
            )
        }

    })

    $(".create-form").on("submit", function(event){
        event.preventDefault();
        const new_veg = {
            veg_name: $("#ca").val().trim(),
            veg_state: $("[name=devoured]:checked").val().trim()
        }
        console.log('Create new')
        console.log(new_veg)

        $.ajax("/api/veg", {
            type: "POST",
            data: new_veg
        }).then(function(){
            location.reload();
        }

        )
    })
})