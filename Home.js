"use strict"

//Create a Home object.
function Home( path, layContent )
{
    //Get page states.
    this.IsVisible = function() { return lay.IsVisible() }
    this.IsChanged = function() { return false }
    
    //Show or hide this page.
    this.Show = function( show )
    {
        if( show ) lay.Animate("FadeIn");
        else lay.Animate( "FadeOut" );
    }
    
    //Create layout for app controls.
    var lay = app.CreateLayout( "Linear", "FillXY,VCenter" );
    lay.Hide();
    layContent.AddChild( lay );
    
    //Add a logo.
	var img = app.CreateImage( "Img/Taladrandole bien duro su sabroso culote a la colora.png", 0.55 );
	lay.AddChild( img );
	img.SetMargins( 0.01, 0.005, 0.01, 0.01 )
	
	//Create a text with formatting.
    var text = "<p><font color=#4285F4><big>VOY A ROMPERTE ESE CULOTE</big></font></p>" + 
    "Baby, hablando claro tambien quiero comerme tu cricota" + //Todo: Put your home page controls here! </p>" + 
    "<p>Te lo voy a jartar de <a href=https://play.google.com/store><b><i>Mucha Leche</i></b></a></p>" +
    "<p><font color=#4285F4><big><big><b>&larr;</b></big></big> Para ver a esta zorrita siendo taladrada " + 
    "arrastra desde la izquierda para que salga el menu y presiona el enlase que dice<b> 'Le exploto ese culote'</b> </font></p>";
    var txt = app.CreateText( text, 1, -1, "Html,Link" );
    txt.SetFontFile( "Misc/SpicyRice-Regular.ttf" )
    txt.SetPadding( 0.03, 0.03, 0.03, 0.03 );
    txt.SetTextShadow( 5, 0, 0, "#3a3a3a" )
    txt.SetTextSize( 18 );
    txt.SetTextColor( "#444444" );
    lay.AddChild( txt );
}