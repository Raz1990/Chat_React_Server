"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(id) {
    return new Promise(function (resolve) {
        var result = getGroupById(id);
        resolve(result);
    });
}
exports.default = default_1;
function getGroupById(id) {
    return id;
}
//# sourceMappingURL=GroupsService.js.map