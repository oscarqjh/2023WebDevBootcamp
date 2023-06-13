function fibonacciGenerator (n) {
    //Do NOT change any of the code above 👆
        
        //Write your code here:
        if(n === 1) {
            return [0];
        }
        if(n === 2) {
            return [0,1];
        }
        var fibo = [0,1];
        
        for(var i=2; i<n; i++) {
            fibo[i] = fibo[i-1] + fibo[i-2];
        }
        return fibo;
        
        //Return an array of fibonacci numbers starting from 0.
    
//Do NOT change any of the code below 👇
}
