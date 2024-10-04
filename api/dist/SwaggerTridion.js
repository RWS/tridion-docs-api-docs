(function () {
    const contains = function(srt, subStr) {
        return (typeof (srt) != "undefined" && srt != null && srt.toLowerCase().indexOf(subStr) > -1)
    }

    const opsFilterExtended = function(taggedOps, phrase) {
        phrase = phrase.toLowerCase()
        var normalTaggedOps = JSON.parse(JSON.stringify(taggedOps)); // here we do skip DOM attached to the taggedOps
        for (tagObj in normalTaggedOps) {
            var operations = normalTaggedOps[tagObj].operations;
            var i = operations.length;
            while (i--) {
                var operation = operations[i].operation;
                if (!contains(operations[i].path, phrase)
                    && !contains(operation.summary, phrase)
                    && !contains(operation.description, phrase)
                ) {
                    operations.splice(i, 1);
                }
            }
            if (operations.length == 0) {
                delete normalTaggedOps[tagObj];
            }
            else {
                normalTaggedOps[tagObj].operations = operations;
            }
        }

        return ui.Im.fromJS(normalTaggedOps);
    }

    ui.fn.opsFilter = opsFilterExtended
})()
