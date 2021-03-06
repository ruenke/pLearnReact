import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import * as React from 'react';
export function flatArray() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let childrenName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

    let result = [];
    let loop = function loop(array) {
        array.forEach(function (item) {
            if (item[childrenName]) {
                let newItem = _extends({}, item);
                delete newItem[childrenName];
                result.push(newItem);
                if (item[childrenName].length > 0) {
                    loop(item[childrenName]);
                }
            } else {
                result.push(item);
            }
        });
    };
    loop(data);
    return result;
}
export function treeMap(tree, mapper) {
    let childrenName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

    return tree.map(function (node, index) {
        let extra = {};
        if (node[childrenName]) {
            extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
        }
        return _extends({}, mapper(node, index), extra);
    });
}
export function flatFilter(tree, callback) {
    return tree.reduce(function (acc, node) {
        if (callback(node)) {
            acc.push(node);
        }
        if (node.children) {
            let children = flatFilter(node.children, callback);
            acc.push.apply(acc, _toConsumableArray(children));
        }
        return acc;
    }, []);
}
export function normalizeColumns(elements) {
    let columns = [];
    React.Children.forEach(elements, function (element) {
        if (!React.isValidElement(element)) {
            return;
        }
        let column = _extends({}, element.props);
        if (element.key) {
            column.key = element.key;
        }
        if (element.type && element.type.__ANT_TABLE_COLUMN_GROUP) {
            column.children = normalizeColumns(column.children);
        }
        columns.push(column);
    });
    return columns;
}