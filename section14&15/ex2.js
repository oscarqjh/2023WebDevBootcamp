function lifeInWeeks(age) {
    
    /************Don't change the code above************/    
        
        //Write your code here.
        const death = 90;
        var yearsLeft = death - age;
        var daysLeft = yearsLeft * 365;
        var weeksLeft = yearsLeft * 52;
        var monthsLeft = yearsLeft * 12;
        
        console.log("You have " + daysLeft + " days, " + weeksLeft + " weeks, and " + monthsLeft + " months left.")
    /*************Don't change the code below**********/
    }
    