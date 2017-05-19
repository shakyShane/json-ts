"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimist = require("minimist");
var stdin = require("get-stdin");
var _1 = require("./");
var immutable_1 = require("immutable");
var argv = minimist(process.argv.slice(2));
// unique input
var inputs = immutable_1.OrderedSet(argv._);
// defaults
var defaults = {
    stdin: false,
};
// merged options with defaults
var options = immutable_1.fromJS(defaults).merge(argv);
if (options.get('stdin')) {
    stdin().then(function (str) {
        if (str === '') {
            console.error('no input provided');
        }
        else {
            console.log(_1.json2ts(str));
        }
    })
        .catch(function (err) {
        console.error(err);
    });
}
else {
    // todo support filenames/urls for input
    console.log('Sorry the only input type supported right now is stdin');
    console.log('pipe some data and then provide ');
}
// console.log('options:', options);
// console.log('inputs:', inputs);
// console.log('args', argv); 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXNDO0FBQ3RDLGlDQUFvQztBQUNwQyx1QkFBMkI7QUFDM0IsdUNBQTZDO0FBQzdDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTdDLGVBQWU7QUFDZixJQUFNLE1BQU0sR0FBRyxzQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVsQyxXQUFXO0FBQ1gsSUFBTSxRQUFRLEdBQUc7SUFDYixLQUFLLEVBQUUsS0FBSztDQUNmLENBQUM7QUFFRiwrQkFBK0I7QUFDL0IsSUFBTSxPQUFPLEdBQUcsa0JBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBVztRQUNyQixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsVUFBQSxHQUFHO1FBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLHdDQUF3QztJQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7SUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCxvQ0FBb0M7QUFDcEMsa0NBQWtDO0FBQ2xDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaW5pbWlzdCA9IHJlcXVpcmUoJ21pbmltaXN0Jyk7XG5pbXBvcnQgc3RkaW4gPSByZXF1aXJlKCdnZXQtc3RkaW4nKTtcbmltcG9ydCB7anNvbjJ0c30gZnJvbSAnLi8nO1xuaW1wb3J0IHtmcm9tSlMsIE9yZGVyZWRTZXR9IGZyb20gJ2ltbXV0YWJsZSc7XG5jb25zdCBhcmd2ID0gbWluaW1pc3QocHJvY2Vzcy5hcmd2LnNsaWNlKDIpKTtcblxuLy8gdW5pcXVlIGlucHV0XG5jb25zdCBpbnB1dHMgPSBPcmRlcmVkU2V0KGFyZ3YuXyk7XG5cbi8vIGRlZmF1bHRzXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICBzdGRpbjogZmFsc2UsXG59O1xuXG4vLyBtZXJnZWQgb3B0aW9ucyB3aXRoIGRlZmF1bHRzXG5jb25zdCBvcHRpb25zID0gZnJvbUpTKGRlZmF1bHRzKS5tZXJnZShhcmd2KTtcblxuaWYgKG9wdGlvbnMuZ2V0KCdzdGRpbicpKSB7XG4gICAgc3RkaW4oKS50aGVuKChzdHI6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoc3RyID09PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignbm8gaW5wdXQgcHJvdmlkZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24ydHMoc3RyKSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSlcbn0gZWxzZSB7XG4gICAgLy8gdG9kbyBzdXBwb3J0IGZpbGVuYW1lcy91cmxzIGZvciBpbnB1dFxuICAgIGNvbnNvbGUubG9nKCdTb3JyeSB0aGUgb25seSBpbnB1dCB0eXBlIHN1cHBvcnRlZCByaWdodCBub3cgaXMgc3RkaW4nKTtcbiAgICBjb25zb2xlLmxvZygncGlwZSBzb21lIGRhdGEgYW5kIHRoZW4gcHJvdmlkZSAnKTtcbn1cblxuLy8gY29uc29sZS5sb2coJ29wdGlvbnM6Jywgb3B0aW9ucyk7XG4vLyBjb25zb2xlLmxvZygnaW5wdXRzOicsIGlucHV0cyk7XG4vLyBjb25zb2xlLmxvZygnYXJncycsIGFyZ3YpOyJdfQ==