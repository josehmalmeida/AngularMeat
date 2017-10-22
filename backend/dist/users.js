"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'burro@gmail.com': new User('burro@gmail.com', 'BurroChataoDoShrek', 'burro123'),
    'marmota@gmail.com': new User('marmota@gmail.com', 'MarmotaInvader', 'marmota456'),
    'taturana@gmail.com': new User('taturana@gmail.com', 'TaturanaTatu', 'taturana789')
};
