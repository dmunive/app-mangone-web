export class JSONUtils {

    static isJSON(json: {}): boolean {
        if (json && json.constructor === {}.constructor) {
            return true;
        } else {
            return false;
        }
    }

    static cloneJSON(data: {}): {} {
        return JSONUtils.mergeJSON({}, data);
    }

    static mergeJSON(json1, json2) {
        var result = null;
        if (JSONUtils.isJSON(json2)) {
            result = {};
            if (JSONUtils.isJSON(json1)) {
                for (var key in json1) {
                    if (JSONUtils.isJSON(json1[key]) || Array.isArray(json1[key])) {
                        result[key] = JSONUtils.cloneJSON(json1[key]);
                    } else {
                        result[key] = json1[key];
                    }
                }
            }

            for (var key in json2) {
                if (JSONUtils.isJSON(json2[key]) || Array.isArray(json2[key])) {
                    result[key] = JSONUtils.mergeJSON(result[key], json2[key]);
                } else {
                    result[key] = json2[key];
                }
            }
        } else if (Array.isArray(json1) && Array.isArray(json2)) {
            result = json1;

            for (var i = 0; i < json2.length; i++) {
                if (result.indexOf(json2[i]) === -1) {
                    result[result.length] = json2[i];
                }
            }
        } else {
            result = json2;
        }
        return result;
    }

}