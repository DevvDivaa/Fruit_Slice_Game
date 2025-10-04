let playing=false;
let score;
let trialLeft;
let step;
let action;
let fruits=["apple","banana","berry","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"]
$(()=>
{
    //click on start/ reset button
    $("#startreset").click(()=>{
        //if we are playing
        if(playing)
        {
            //reload page
            location.reload();
            playing=false;
        }
        else{
            //if we are not playing
            //hide the gameover box
            $("#gameover").hide();
            // change the text to reset game
            $("#startreset").html("Reset Game");
            // start playing game
            playing=true;
            // score initialize to true
            score=0;
            $("#scorevalue").html(score);
            // show the trial or life left 
            $("#trialleft").show();
            // setting initial trial value
            trialLeft=3;
            // adding trial hearts
            addHearts();
            //start sending fruits
            startAction();     
        }
    });
    function addHearts()
    {
        //clear hearts
        $("#trialleft").empty();
        // fill with hearts
        for(let i=0;i<trialLeft;i++)
        {
            $("#trialleft").append('<img src="img/heart.png" class="heart">');
        }
    }
    //start sending fruits
    function startAction()
    {
        //generate fruits
        $("#fruit").show();
        //generate random fruits
        chooseFruit();
        //random position
        $("#fruit").css({"left":Math.round(650 * Math.random()),"top":-50});
        //generate steps
        step=1 + Math.round(5 * Math.random());
        //move fruits down by steps every 10ms
        action=setInterval(()=>{
            $("#fruit").css("top",$("#fruit").position().top + step);
            //to check that the fruit is too slow
            if($("#fruit").position().top > $("#fruitContainer").height())
            {
                //to check the life left
                if(trialLeft > 1)
                {
                    $("#fruit").show();
                    chooseFruit();
                    $("#fruit").css({"left":Math.round(650*Math.random()),"top":-50});
                    step=1 + Math.round(5*Math.random());  
                    //reduce the life
                    trialLeft--;
                    //populate hearts
                    addHearts();                  
                }
                else //gameover
                {
                    playing=false;
                    // we are not playing
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over !</p><p>Your Score is "+score +"</p>");
                    //hide life left
                    $("#trialleft").hide();
                    stopAction();
                }
            }  
        },10)

    }
    //generate random fruit
    function chooseFruit()
    {
        let rand=fruits[Math.round(9*Math.random())];
        // console.log(rand);
        $("#fruit").attr('src','img/'+ rand +'.png')
    }
    function stopAction()
    {
        clearInterval(action);
        //hide the fruits
        $("#fruit").hide();
    }
    //slice the fruits
    $("#fruit").mouseover(()=>
    {
        //increase the score by 1
        score++;
        //to update scorevalue
        $("#scorevalue").html(score);
        //play the sound
        $("#slicesound")[0].play();
        //stop fruit
        clearInterval(action);
        //hide fruit and animate
        $("#fruit").hide("explode",200);
        //send new fruit
        setTimeout(startAction,400);
    })
});