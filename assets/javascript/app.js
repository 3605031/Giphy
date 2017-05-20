
    $(document).on('click', '.button', function() {
      var person = $(this).attr("data-person");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
    $("#gifs-appear-here").empty();
      

    $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          console.log(response);
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("state", "animate");
            personImage.addClass("gif");


            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });

    var gifs = [];

 
      function renderButtons() {


        $("#buttons").empty();


        for(var i=0;i<gifs.length;i++){
          $("#buttons").append(gifs[i]);
        }

      }


    $("#add-gif").on("click", function(event) {

        event.preventDefault();

        if($("#gif-input").val()!=""){
        var button = $("<button/>");
        button.attr("data-person",$("#gif-input").val());
        button.addClass("button");
        button.text($("#gif-input").val());

        gifs.push(button);

        renderButtons();
        $("#gif-input").val("");
      }

      });



    $(document).on('click', '.gif', function() {

      var state = $(this).attr('data-state');
      if(state === "still"){
        state = 'animate';
        var source = $(this).attr('data-animate')
        $(this).attr('src',source);
      }
      else{
        state = 'still';
        var source = $(this).attr('data-still')
        $(this).attr('src',source);
      }

      $(this).attr('data-state',state);

    });

