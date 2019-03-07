var elementSelectat = null;
$(function ()
{

	var x1 = 0, y1 = 0;
  var CLICK_STANGA = 1, KEY_DEL = 46;

	var fig = document.getElementById("figuri");
	var figD;

	$("#editor")
		.mousedown(function (e)
		{
			if (e.which == CLICK_STANGA)
			{
				x1 = e.pageX - this.getBoundingClientRect().left;
				y1 = e.pageY - this.getBoundingClientRect().top;
				figD = fig.options[fig.selectedIndex].text;

				if(figD == "Rectangle")
        {
          $("#rectangle")
					.setareCoordonateRectangle(x1, y1, x1, y1) //pozitia tagului svg in feresatra
					.show();
        }

        if(figD == "Ellipse")
        {
          $("#ellipse")
	         .setareCoordonateElipsa(x1, y1, x1, y1)
           .show();
        }

        if(figD == "Line")
        {
          $("#line")
           .setareCoordonateLine(x1, y1, x1, y1)
           .show();
        }

        if(figD == "Text")
        {
          $("#text")
            .setareCoordonateText(x1, y1, x1, y1)
            .show();
        }
			}
		})

		.mousemove(function (e)
		{
			x2 = e.pageX - this.getBoundingClientRect().left;
			y2 = e.pageY - this.getBoundingClientRect().top;

      //pentru actualizarea coordonatelor in functie de miscarea mouse-ului
			if (figD == "Rectangle")
			{
				$("#rectangle")
					.setareCoordonateRectangle(x1, y1, x2, y2); //se modifica in functie de miscarea mouse-ului si se seteaza din nou coordonatele dreptunghiului
			}
			else if (figD == "Ellipse")
			{
				$("#ellipse")
					.setareCoordonateElipsa(x1, y1, x2, y2);
			}
      else if(figD == "Line")
      {
        $("#line")
          .setareCoordonateLine(x1, y1, x2, y2);
      }
		})

		.contextmenu(function ()
		{
			return false; //pentru nu aparea meniul contextual
		});

	$(document).keydown(function (e)
	{
    //stergere element
		if (elementSelectat && e.keyCode == KEY_DEL)
		{
			elementSelectat.remove();
      var sndS = new Audio("media/removeElement.mp3"); //redare sunet
      sndS.play();
		}

    //mutari
    else if (elementSelectat && e.keyCode == 38)
    {
        var se = document.querySelector(".selectat");
        var cyn = se.getAttribute("cy");
        var y1n = se.getAttribute("y1");

        //daca are centru, atunci este elipsa
        if(cyn!=null)
        {
          se.setAttribute("cy", +cyn - +30);
        }
        //daca are y1, atunci este patrat
        else if(y1n!=null)
        {
          var y2n = se.getAttribute("y2");
          se.setAttribute("y1", +y1n - +30);
          se.setAttribute("y2", +y2n - +30);
        }
        //altfel este linie
        else
        {
          var yn = se.getAttribute("y");
          se.setAttribute("y", +yn - +30);
        }
    }

    else if(elementSelectat && e.keyCode == 39)
    {
      var se = document.querySelector(".selectat");

      var cxn = se.getAttribute("cx");
      var xn = se.getAttribute("x");
      var x1n = se.getAttribute("x1");

      if(cxn!=null)
      {
        se.setAttribute("cx", +cxn + +30);
      }
      else if(x1n != null)
      {
        var x2n = se.getAttribute("x2");
        se.setAttribute("x1", +x1n + +30);
        se.setAttribute("x2", +x2n + +30);
      }
      else {
        se.setAttribute("x", +xn + +30);
      }

    }

    else if(elementSelectat && e.keyCode == 40)
    {
      var se = document.querySelector(".selectat");

      var cyn = se.getAttribute("cy");
      var y1n = se.getAttribute("y1");

      if(cyn != null)
      {
        se.setAttribute("cy", +cyn + +30)
      }
      else if(y1n != null)
      {
        var y2n = se.getAttribute("y2");
        se.setAttribute("y1", +y1n + +30);
        se.setAttribute("y2", +y2n + +30);

      }
      else
      {
        var yn = se.getAttribute("y");
        se.setAttribute("y", +yn + +30);
      }

    }

    else if(elementSelectat && e.keyCode == 37)
    {
      var se = document.querySelector(".selectat");
      var cxn = se.getAttribute("cx");
      var x1n = se.getAttribute("x1");

      if(cxn!=null)
      {
        se.setAttribute("cx", +cxn - +30);
      }
      else if(x1n != null)
      {
        var x2n = se.getAttribute("x2");
        se.setAttribute("x1", +x1n - +30);
        se.setAttribute("x2", +x2n - +30);
      }
      else
      {
        var xn = se.getAttribute("x");
        se.setAttribute("x", +xn - +30);
      }

    }
	});
});

var sndF = new Audio("media/optionSound.mp3");
var sndH = new Audio("media/headerButtons.mp3");


$(document).ready(function(){
    $('#BlurButton').click(function(){
      var se = document.querySelector(".selectat");
      se.setAttribute("filter", "url(#blurMe)");
    });

    $('#removeFilter').click(function(){
      var se = document.querySelector(".selectat");
      se.setAttribute("filter", "");
    });

    $('#Dropshadow').click(function(){
      var se = document.querySelector(".selectat");
      se.setAttribute("filter", "url(#dropshadow)");
    });
});

$(document).ready(function(){
  $('#bigger').click(function(){
    var se = document.querySelector(".selectat");
    var rx = se.getAttribute("rx");
    var rW = se.getAttribute("width");

    if(rx != null)
    {
      se.setAttribute("rx", +rx + +10);
      var ry = se.getAttribute("ry");
      se.setAttribute("ry", +ry + +10);
    }
    else if(rW != null)
    {
      se.setAttribute("width", +rW + +10);
      var rH = se.getAttribute("height");
      se.setAttribute("height", +rH + +10);
      var x = se.getAttribute("x");
      se.setAttribute("x", +x - +4);
      var y = se.getAttribute("y");
      se.setAttribute("y", +y - +4);
    }
    else
    {
      se.setAttribute("style", "stroke-width: 6");
    }
  });


  $('#smaller').click(function(){
    var se = document.querySelector(".selectat");
    var rx = se.getAttribute("rx");
    var rW = se.getAttribute("width");

    if(rx != null)
    {
      var ry = se.getAttribute("ry");
      if(rx > 10 && ry > 10)
      {
        se.setAttribute("rx", +rx - +10);
        se.setAttribute("ry", +ry - +10);
      }
    }
    else if(rW != null)
    {
      var rH = se.getAttribute("height");
      if(rW > 10 && rH > 10)
      {
        se.setAttribute("width", +rW - +10);
        se.setAttribute("height", +rH - +10);
        var x = se.getAttribute("x");
        se.setAttribute("x", +x + +4);
        var y = se.getAttribute("y");
        se.setAttribute("y", +y + +4);
      }
    }
    else
    {
      se.setAttribute("style", "stroke-width: 1");
    }
  });

  $("#colors").change(function(){
    color = document.getElementById("colors").options[(document.getElementById("colors")).selectedIndex].value;
    $(elementSelectat).css("fill", "#" + color);
    var sndC = new Audio("media/changeColor.mp3");
    sndC.play();
  });
})
