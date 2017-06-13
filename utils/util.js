
exports.getValueFromColumnName = function(data, arrayColumn, valueIndex){
	let obj = {};
	let index = valueIndex || 0;
	for (let i = 0; i < arrayColumn.length; i++) {
		obj[arrayColumn[i]] = data.values[index][data.columns.indexOf(arrayColumn[i])];
	};

	return obj;
}
