const queryFilter = function(queries) {

    let docCount = queries.length;
    let groupSize = 12;
    let groupCount = docCount / groupSize;

    console.log("docCount = " + docCount);
    let qArr = [];
    let queryArr = [];
    let k = 0;

    for (let i = 0; i < groupCount; i++ ) {
        qArr = [];
        for (let j = 0; j < groupSize; j++) {
            k = (i * groupSize) + j;
            qArr.push(queries[k])
        }
        queryArr.push(qArr) // display title and map qArr into a graph
    }
        console.log(queryArr)
        return(queryArr);
}

module.exports = queryFilter;
