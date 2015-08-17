# Challenge Trust pilot

Taking a closer look at the outputed content I realized imediatly that it was in base64 format.
I went to JSFiddle and ran the code through the image tag
```
<img src="data:image/png;base64, "code here" />
```
The image included a whiteRabbit() function that I ran through the Console in developer tools.
Afterwards the holes appeard, in which case I looked at the DOM and found a div that had an extra class compared to the others "deep"
After clicking the glitch appeard and I was forwarded to the second challenge, to build a widget.
The widget will be attached to the aplication form. It makes use of Angular with ui-router, Gulp and Jade.