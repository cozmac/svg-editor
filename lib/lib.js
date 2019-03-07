$.fn.setareCoordonateRectangle = function (x1, y1, x2, y2)
{
	return this.attr(
	{
		x: Math.min(x1, x2),
		y: Math.min(y1, y2),
		width: Math.max(x1, x2) - Math.min(x1, x2),
		height: Math.max(y1, y2) - Math.min(y1, y2)
	});
}

$.fn.setareCoordonateElipsa = function (x1, y1, x2, y2)
{
  var width = Math.max(x1, x2) - Math.min(x1, x2);
  var height = Math.max(y1, y2) - Math.min(y1, y2);
  return this.attr({
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    cx: (x1+x2)/2,
    cy: (y1+y2)/2,
    rx: width/2,
    ry: height/2
	});
}


$.fn.setareCoordonateLine = function(x1, y1, x2, y2)
{
  return this.attr({
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  });
}

$.fn.setareCoordonateText = function(x1, y1, x2, y2)
{
  return this.attr({
    x: x1,
    y: y1
  })
}


$(function ()
{
  var MOUSE_LEFT = 1, MOUSE_RIGHT = 3, KEY_DEL = 46;
  var x1 = 0, y1 = 0;

  var fig = document.getElementById("figuri");
  var figD;

$("#editor")
.mousedown(function (e)
{
  x1 = e.pageX - this.getBoundingClientRect().left;
  y1 = e.pageY - this.getBoundingClientRect().top;
	//restul in proiect principal
})

.mouseup(function (e)
{ //se termina operatia de desen
  if (e.which == MOUSE_LEFT)
  {
    x2 = e.pageX - this.getBoundingClientRect().left;
    y2 = e.pageY - this.getBoundingClientRect().top;
    figD = fig.options[fig.selectedIndex].text

    if (figD == "Rectangle")
    {
      $("#rectangle").hide(); //stergere linii punctate

      $(document.createElementNS("http://www.w3.org/2000/svg", "rect")) //creare element svg
      .setareCoordonateRectangle(x1, y1, x2, y2)
      .mousedown(function (e)
      {
        if (e.which == MOUSE_RIGHT)
        {
          $("#elemente *").attr("class", "");
          $(this).attr("class", "selectat");
          elementSelectat = this;
        }
      })
      .appendTo($("#elemente"));
    }

    else if (figD == "Ellipse")
    {
      $("#ellipse").hide();

      $(document.createElementNS("http://www.w3.org/2000/svg", "ellipse"))
      .setareCoordonateElipsa(x1, y1, x2, y2)
      .mousedown(function (e)
      {
        if (e.which == MOUSE_RIGHT)
        {
          $("#elemente *").attr("class", "");
          $(this).attr("class", "selectat");
          elementSelectat = this;
        }
      })
      .appendTo($("#elemente"));
    }

    else if(figD == "Line")
    {
      $("#line").hide();

      $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
      .setareCoordonateLine(x1, y1, x2, y2)
      .mousedown(function (e)
      {
        if(e.which == MOUSE_RIGHT)
        {
          $("#elemente *").attr("class", "");
          $(this).attr("class", "selectat");
          elementSelectat = this;
        }
      })
      .appendTo($("#elemente"));
    }

    else if(figD  == "Text")
    {
      $(document.createElementNS("http://www.w3.org/2000/svg", "text"))
      .setareCoordonateText(x1, y1, x2, y2)
      .mousedown(function(e)
      {
        if(e.which == MOUSE_RIGHT)
        {
          $("#elemente *").attr("class", "");
          $(this).attr("class", "selectat");
          elementSelectat = this;
        }
      })
      .appendTo($("#elemente"));
    }
  }
})
});
