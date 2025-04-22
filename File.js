"use strict"

//Create an new file viewer object.
//(Note: a single instance of this object is used for all file data)
function File( path, layContent )
{
    var self = this;
    var name = "";
    var dfltImage = "Img/Icon.png";
    var dfltText = "";
    
    //Get page states.
    this.IsVisible = function() { return lay.IsVisible() }
    this.IsChanged = function() { return btnSave.IsEnabled() }
    
    //Show or hide this page.
    this.Show = function( show, title )
    {
        if( show ) 
        {
            name = title;
            self.Load();
            lay.Animate("FadeIn");
        }
        else lay.Animate( "FadeOut" );
    }
    
    //Load page settings from json file.
    this.Load = function()
    {
        //Read settings from json file.
        var file = path+"/"+name+"/"+name+".json";
        var json = app.ReadFile( file );
        
        if( json ) 
        {
            //Set controls.
            var data = JSON.parse(json);
            var dfltName = name ;
            img.SetImage( data.image ? data.image : dfltImage, img.GetWidth() );
            img.imageFile =  data.image ? data.image : dfltImage;
            
            txtNotes.SetText( data.text ? data.text : dfltText );
            txtTitle.SetText( data.title ? data.title : dfltText );
            txtContents.SetText( data.contents ? data.contents : dfltText );
        }
        else self.Clear();
        
        btnSave.SetEnabled( false );
    }
    
    //Save page settings to json file.
    this.Save = function()
    {
        //Create settings object.
        var settings = 
        { 
            image : img.imageFile,
            text : txtNotes.GetText(),
            title: txtTitle.GetText(),
            contents: txtContents.GetText()
        }
        
        //Write settings to file as json.
        var file = path+"/"+name+"/"+name+".json";
        app.WriteFile( file, JSON.stringify( settings ) );
        btnSave.SetEnabled( false );
    }
    
    this.Create = function()
    {
    	var template = app.ReadFile( "template.html" ).replace("[TITLE]", txtTitle.GetText()).replace("[CONTENTS]", txtContents.GetText()).replace("[IMAGE]", img.imageFile).replace("[CAPTION]", txtNotes.GetText());
    	var dialog = app.CreateDialog( "Preview" );
    	var layDlg = app.CreateLayout( "linear", "VCenter,FillXY" );
      //var layDlg.SetSize( 1, -1 );
      dialog.AddLayout( layDlg );
      var web = app.CreateWebView( 1, -1 );
      layDlg.AddChild( web );
      web.LoadHtml( template );
      dialog.Show();
    }
    
    //Clear page controls.
    this.Clear = function()
    {
        img.SetImage( dfltImage );
        img.imageFile =  dfltImage;
        
        txtNotes.SetText( dfltText );
        txtTitle.SetText( dfltText );
        txtContents.SetText( dfltText );
        
    }
    
    //Swap image.
    this.OnImageChoose = function( file )
    {
        app.MakeFolder( path+"/"+name+"/Img" );
        var imageFile = path+"/"+name+"/Img/"+name+".png";
        app.CopyFile( file, imageFile );
        //app.GetThumbnail( file, imageFile, 340, 340 );
        img.SetImage( imageFile, 0.42,-1 );
        img.imageFile = imageFile;
        btnSave.SetEnabled( true );
    }
    
    //Handle image button.
    this.btnImage_OnTouch = function()
    {
        app.ChooseFile( "Choose Image", "image/*", self.OnImageChoose );
    }
    
    //Create layout for app controls.
    var lay = app.CreateLayout( "Linear", "FillXY,VCenter" );
    lay.Hide();
    layContent.AddChild( lay );
    
    //Create 'Title' label.
    var lab = app.CreateText( "News article title: " ); 
    lab.SetMargins( 0, 0.04, 0, 0 );
    lab.SetTextColor( "#4285F4" );
    lay.AddChild( lab );
    
    //Create help button.
    var layHoriz = app.CreateLayout( "Linear", "Horizontal" );
    lay.AddChild( layHoriz );
    btnHelp = CreateHelpButton( layHoriz, "title" );
    btnHelp.SetMargins( 0, 0, 0.01, 0 );
    
    //Create notes edit control.
    var txtTitle = app.CreateTextEdit( "", 0.727 );
    txtTitle.SetOnChange( function(){btnSave.SetEnabled(true)} );
    layHoriz.AddChild( txtTitle);
    
    
    //Create 'Title' label.
    var lab = app.CreateText( "News article contents: " ); 
    lab.SetMargins( 0, 0.04, 0, 0 );
    lab.SetTextColor( "#4285F4" );
    lay.AddChild( lab );
    
    //Create help button.
    var layHoriz = app.CreateLayout( "Linear", "Horizontal" );
    lay.AddChild( layHoriz );
    btnHelp = CreateHelpButton( layHoriz, "contents" );
    btnHelp.SetMargins( 0, 0, 0.01, 0 );
    
    //Create notes edit control.
    var txtContents= app.CreateTextEdit( "", 0.727 );
    txtContents.SetOnChange( function(){btnSave.SetEnabled(true)} );
    layHoriz.AddChild( txtContents);
    
    
    //Create image label.
    var lab = app.CreateText( "Image for the news article: " ); 
    lab.SetTextColor( "#4285F4" );
    lay.AddChild( lab );
    
    //Create horizontal layout.
    var layHoriz = app.CreateLayout( "Linear", "Horizontal" );
    layHoriz.SetMargins( 0, 0.02, 0, 0 );
    lay.AddChild( layHoriz );
    
    //Create a help button.
    btnHelp = CreateHelpButton( layHoriz, "image" );
    btnHelp.SetMargins( 0, 0.01, 0.14, 0 );
    
    //Create image.
	var img = app.CreateImage( dfltImage, 380, 520,"px,wallpaper,fix,Button", DW(), DH());
	img.imageFile = dfltImage;
	layHoriz.AddChild( img );
	
	//Create a change image button.
    var btnImage = app.CreateButton( "[fa-refresh]", -1, 0.1, "FontAwesome" );
    btnImage.SetMargins( 0.08, 0.015, 0, 0 );
    btnImage.SetTextSize( 18 );
    btnImage.SetTextColor( "#55a755" );
    btnImage.SetOnTouch( self.btnImage_OnTouch );
    layHoriz.AddChild( btnImage );
    
    //Create 'Notes' label.
    var lab = app.CreateText( "Caption for the image: " ); 
    lab.SetMargins( 0, 0.04, 0, 0 );
    lab.SetTextColor( "#4285F4" );
    lay.AddChild( lab );
    
    //Create help button.
    var layHoriz = app.CreateLayout( "Linear", "Horizontal" );
    lay.AddChild( layHoriz );
    btnHelp = CreateHelpButton( layHoriz, "notes" );
    btnHelp.SetMargins( 0, 0, 0.01, 0 );
    
    //Create notes edit control.
    var txtNotes = app.CreateTextEdit( "", 0.727 );
    txtNotes.SetOnChange( function(){btnSave.SetEnabled(true)} );
    layHoriz.AddChild( txtNotes );

    var layHoriz = app.CreateLayout( "Linear", "Horizontal" );
    lay.AddChild( layHoriz );
    
    //Create a save button.
    var btnSave = app.CreateButton( "Save", 0.35, 0.1 );
    btnSave.SetMargins( 0,0.012,0,0 );
    btnSave.SetOnTouch( self.Save );
    layHoriz.AddChild( btnSave );
    
    //Create a generate button.
    var btnCreate = app.CreateButton( "Create", 0.35, 0.1 );
    btnCreate.SetMargins( 0,0.012,0,0 );
    btnCreate.SetOnTouch( self.Create );
    layHoriz.AddChild( btnCreate );
}

//Show context help.
function btn_OnHelp()
{
    var txt = ""
    switch( this.help )
    {
    		case "title": 
            txt = "This is the title of the news article.";
            app.ShowTip( txt, 0.18, 0.18); 
            break;
         case "contents": 
            txt = "This is news article contents.";
            app.ShowTip( txt, 0.18, 0.28); 
            break;
        case "image": 
            txt = "This is the selected image to the news article.";
            app.ShowTip( txt, 0.25, 0.42); 
            break;
        case "notes": 
            txt = "This is the caption or credit of the image.";
            app.ShowTip( txt, 0.15, 0.63 ); 
            break;
    }
}