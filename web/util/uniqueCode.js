const max = 10;

export const uniqueCode = () =>{
    let ans = "";
    const subset = "123456789abcdefghijklmnopqrstuvwxyz";
    for(let i = 0;i<max;i++){
        ans += subset[Math.floor(Math.random()*subset.length)];
    }
    return ans;
}