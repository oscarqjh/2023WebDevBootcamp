
const date = {
    getDate() {
        const today = new Date();
        
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }
    
        return today.toLocaleDateString('en-US', options);
    },

    getDay() {
        const today = new Date();
        
        const options = {
            weekday: 'long'
        }
    
        return today.toLocaleDateString('en-US', options);
    }
}

export default date;